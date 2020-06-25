import { Color } from 'csstype';
import * as React from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { Database } from '~/repository/Database';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { BackButton } from '~/components/buttons/BackButton';
import { ChartCard } from '~/components/charts/ChartCard';
import { DateRangeSelector } from '~/components/DateRangeSelector';
import { PDGradientText } from '~/components/PDGradientText';
import { Pool } from '~/models/Pool';
import { AppState } from '~/redux/AppState';
import { ChartCardViewModel } from '~/components/charts/ChartCardViewModel';
import { Reading } from '~/models/recipe/Reading';
import { Treatment } from '~/models/recipe/Treatment';

interface PoolHistoryProps {
    /**  */
    navigation: StackNavigationProp<PDNavStackParamList, 'PoolHistory'>;
    /**  */
    selectedPool: Pool;
}

interface PoolHistoryState {
    currentDateRange: string;
}

const mapStateToProps = (state: AppState, ownProps: PoolHistoryProps): PoolHistoryProps => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool!,
    };
};

class PoolHistoryComponent extends React.PureComponent<PoolHistoryProps, PoolHistoryState> {

    private chartData: ChartCardViewModel[];

    constructor(ownProps: PoolHistoryProps) {
        super(ownProps);

        this.state = {
            currentDateRange: ''
        };

        this.chartData = this.loadChartData();
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
    }

    onRangeChanged = (selectedRange: string) => {
        this.setState({ currentDateRange: selectedRange });
    }

    private loadChartData = (): ChartCardViewModel[] => {
        const data = Database.loadLogEntriesForPool(this.props.selectedPool.objectId);
        const entries = (data === undefined) ? [] : data.map(le => le);

        interface Graphable {
            title: string;
            id: string;
        }
        // get all different readings & treatments
        let idsToGraph: Graphable[] = [];
        entries.forEach(entry => {
            entry.readingEntries
                .forEach(reading => {
                    const graphable: Graphable = { title: reading.readingName, id: reading.var };
                    if (idsToGraph.filter(g => { return g.title == graphable.title && g.id == graphable.id }).length == 0) {
                        idsToGraph.push(graphable);
                    }
                });
            entry.treatmentEntries
                .forEach(treatment => {
                    const graphable: Graphable = { title: treatment.treatmentName, id: treatment.var };
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
                interactive: true
            };
        });
    }

    render() {
        const dateRanges = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
        const labels = ['Jan', 'Feb', 'March'];
        const values = [1000, 4000, 5000];

        const { selectedPool } = this.props;
        const poolTitle = selectedPool ? selectedPool.name : '';

        const charts = this.chartData.map(vm => {
            return <ChartCard key={ vm.masterId } viewModel={ vm } containerStyles={ styles.chartCard } />
        })

        return (
            <SafeAreaView style={ { backgroundColor: '#F8F8F8', flex: 1 } }>
                <ScrollView style={ styles.container }>
                    <BackButton
                        title={ poolTitle }
                        onPress={ this.handleBackPress } />
                    <PDGradientText style={ styles.gradientText } colors={ titleGradientColors }>
                        History
                    </PDGradientText>
                    <DateRangeSelector onRangeUpdated={ this.onRangeChanged } dateRange={ dateRanges } />
                    <View style={ styles.chartContainer }>
                        { charts }
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}

export const PoolHistoryScreen = connect(mapStateToProps)(PoolHistoryComponent);

const titleGradientColors: Color[] = ['#00C6FF', '#0072FF'];

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        height: '100%',
        flex: 1
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20
    },
    chartContainer: {
        marginTop: 20,
        flex: 1
    },
    chartCard: {
        marginBottom: 20
    }
});
