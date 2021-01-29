import { Color } from 'csstype';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import SafeAreaView, { useSafeArea } from 'react-native-safe-area-view';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { BackButton } from '~/components/buttons/BackButton';
import { ChartCard } from '~/components/charts/ChartCard';
import { DateRangeSelector, DateRange } from '~/components/DateRangeSelector';
import { PDGradientText } from '~/components/PDGradientText';
import { Pool } from '~/models/Pool';
import { AppState } from '~/redux/AppState';
import { ChartCardViewModel } from '~/components/charts/ChartCardViewModel';
import { DeviceSettings } from '~/models/DeviceSettings';
import { useNavigation } from '@react-navigation/native';
import { DS } from '~/services/DSUtil';
import { ChartService } from '~/services/ChartService';

interface PoolHistoryProps {
    /**  */
    selectedPool: Pool;
    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState): PoolHistoryProps => {
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
        setChartData(ChartService.loadChartData(dateRange, selectedPool, isUnlocked));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPool.objectId, dateRange]);

    const handleBackPress = () => {
        goBack();
    };

    const onRangeChanged = (selectedRange: DateRange) => {
        setDateRange(selectedRange);
    };
    const dateRanges: DateRange[] = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
    const poolTitle = selectedPool ? selectedPool.name : '';

    const charts = chartData.map((vm) => {
        return <ChartCard key={vm.masterId + dateRange} viewModel={vm} containerStyles={styles.chartCard} />;
    });

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }} forceInset={{ bottom: 'never' }}>
            <View style={styles.header}>
                <BackButton title={poolTitle} onPress={handleBackPress} />
                <PDGradientText style={styles.gradientText} colors={titleGradientColors}>
                    History
                </PDGradientText>
                <DateRangeSelector
                    onRangeUpdated={onRangeChanged}
                    dateRange={dateRanges}
                    currentDateRange={dateRange}
                />
            </View>
            <ScrollView style={styles.scrollView} contentInset={{ bottom: insets.bottom }}>
                <View style={styles.chartContainer}>{charts}</View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const PoolHistoryScreen = connect(mapStateToProps)(PoolHistoryComponent);

const titleGradientColors: Color[] = ['#00C6FF', '#0072FF'];

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
        paddingBottom: 12,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
        marginTop: 6,
    },
    chartContainer: {
        marginTop: 20,
        flex: 1,
    },
    chartCard: {
        marginBottom: 20,
    },
});
