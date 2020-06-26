import { Color } from 'csstype';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import SafeAreaView, { useSafeArea } from 'react-native-safe-area-view';

import { Database } from '~/repository/Database';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { BackButton } from '~/components/buttons/BackButton';
import { ChartCard } from '~/components/charts/ChartCard';
import { DateRangeSelector, DateRange } from '~/components/DateRangeSelector';
import { PDGradientText } from '~/components/PDGradientText';
import { Pool } from '~/models/Pool';
import { AppState } from '~/redux/AppState';
import { ChartCardViewModel } from '~/components/charts/ChartCardViewModel';
import { Reading } from '~/models/recipe/Reading';
import { Treatment } from '~/models/recipe/Treatment';
import { DeviceSettings } from '~/models/DeviceSettings';
import { stat } from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import { DS } from '~/services/DSUtil';

interface PoolHistoryProps {
    /**  */
    selectedPool: Pool;
    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState, ownProps: PoolHistoryProps): PoolHistoryProps => {
    return {
        deviceSettings: state.deviceSettings,
        selectedPool: state.selectedPool!,
    };
};

const PoolHistoryComponent: React.FunctionComponent<PoolHistoryProps> = (props) => {
    const [dateRange, setDateRange] = React.useState<DateRange>('1M');
    const [chartData, setChartData] = React.useState<ChartCardViewModel[]>([]);
    const { goBack } = useNavigation<StackNavigationProp<PDNavStackParamList, 'PoolHistory'>>();
    const insets = useSafeArea();

    const { selectedPool, deviceSettings } = props;
    const isUnlocked = DS.isSubscriptionValid(deviceSettings, Date.now());

    React.useEffect(() => {
        setChartData(loadChartData());
    }, [selectedPool.objectId, dateRange]);

    const handleBackPress = () => {
        goBack();
    }

    const onRangeChanged = (selectedRange: DateRange) => {
        setDateRange(selectedRange);
    }

    const loadChartData = (): ChartCardViewModel[] => {
        const msInRange = msInDateRange(dateRange);
        const since_ts = msInRange ? Date.now() - msInRange : null;
        const data = Database.loadLogEntriesForPool(selectedPool.objectId, since_ts, false);
        const entries = (data === undefined) ? [] : data.map(le => le);

        interface Graphable {
            title: string;
            id: string;
            idealMin: number | null;
            idealMax: number | null;
        }
        // get all different readings & treatments
        let idsToGraph: Graphable[] = [];
        entries.forEach(entry => {
            entry.readingEntries
                .forEach(reading => {
                    const graphable: Graphable = { title: reading.readingName, id: reading.var, idealMin: reading.idealMin || null, idealMax: reading.idealMax || null };
                    if (idsToGraph.filter(g => { return g.title == graphable.title && g.id == graphable.id }).length == 0) {
                        idsToGraph.push(graphable);
                    } else {
                        // update the ideal range:
                        const i = idsToGraph.findIndex(g => { return g.title == graphable.title && g.id == graphable.id });
                        idsToGraph[i].idealMin = reading.idealMin || null;
                        idsToGraph[i].idealMax = reading.idealMax || null;
                    }
                });
            entry.treatmentEntries
                .forEach(treatment => {
                    const graphable: Graphable = { title: treatment.treatmentName, id: treatment.var, idealMin: null, idealMax: null };
                    if (idsToGraph.filter(g => { return g.title == graphable.title && g.id == graphable.id }).length == 0) {
                        idsToGraph.push(graphable);
                    }
                });
        });

        // get a chartcardviewmodel for each
        return idsToGraph.map(graphable => {
            let dates: number[] = [];
            let values: number[] = [];
            entries.forEach(entry => {
                entry.readingEntries.forEach(reading => {
                    if (reading.var === graphable.id) {
                        dates.push(entry.ts);
                        values.push(reading.value);
                    }
                });
                entry.treatmentEntries.forEach(treatment => {
                    if (treatment.var === graphable.id) {
                        dates.push(entry.ts);
                        values.push(treatment.ounces);
                    }
                });
            });
            return {
                title: graphable.title,
                masterId: graphable.id,
                values: values,
                timestamps: dates,
                interactive: true,
                isUnlocked,
                idealMin: graphable.idealMin,
                idealMax: graphable.idealMax
            };
        });
    }
    const dateRanges: DateRange[] = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
    const poolTitle = selectedPool ? selectedPool.name : '';

    const charts = chartData.map(vm => {
        return <ChartCard key={ vm.masterId + dateRange } viewModel={ vm } containerStyles={ styles.chartCard } />
    });

    return (
        <SafeAreaView style={ { backgroundColor: 'white', flex: 1 } } forceInset={ { bottom: 'never' } }>
            <View style={ styles.header }>
                <BackButton
                    title={ poolTitle }
                    onPress={ handleBackPress } />
                <PDGradientText style={ styles.gradientText } colors={ titleGradientColors }>
                    History
                    </PDGradientText>
                <DateRangeSelector onRangeUpdated={ onRangeChanged } dateRange={ dateRanges } currentDateRange={ dateRange } />
            </View>
            <ScrollView style={ styles.scrollView } contentInset={ { bottom: insets.bottom } }>
                <View style={ styles.chartContainer }>
                    { charts }
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export const PoolHistoryScreen = connect(mapStateToProps)(PoolHistoryComponent);

const titleGradientColors: Color[] = ['#00C6FF', '#0072FF'];

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    header: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
        paddingBottom: 12,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
        marginTop: 6
    },
    chartContainer: {
        marginTop: 20,
        flex: 1
    },
    chartCard: {
        marginBottom: 20
    }
});

const msInDateRange = (dr: DateRange): number | null => {
    switch (dr) {
        case '24H':
            return 24 * 60 * 60 * 1000;
        case '7D':
            return 7 * 24 * 60 * 60 * 1000;
        case '1M':
            return 31 * 24 * 60 * 60 * 1000;
        case '3M':
            return 92 * 24 * 60 * 60 * 1000;
        case '1Y':
            return 365 * 24 * 60 * 60 * 1000;
        case 'ALL':
            return null;
    }
}