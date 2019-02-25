import { Color } from 'csstype';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';

import { BackButton } from 'components/buttons/BackButton';
import { ChartCard } from 'components/charts/ChartCard';
import { DateRangeSelector } from 'components/DateRangeSelector';
import { PDGradientText } from 'components/PDGradientText';
import { Pool } from 'models/Pool';
import { connect } from 'react-redux';
import { AppState } from 'redux/AppState';

interface PoolHistoryProps {
    /**  */
    navigation: NavigationScreenProp<{}, {}>;
    /**  */
    selectedPool?: Pool;
}

interface PoolHistoryState {
    currentDateRange: string;
}

const mapStateToProps = (state: AppState, ownProps: PoolHistoryProps): PoolHistoryProps => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool
    };
};

class PoolHistoryComponent extends React.PureComponent<PoolHistoryProps, PoolHistoryState> {
    constructor(ownProps: PoolHistoryProps) {
        super(ownProps);

        this.state = {
            currentDateRange: ''
        };
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
    }

    onRangeChanged = (selectedRange: string) => {
        this.setState({ currentDateRange: selectedRange });
    }

    render () {
        const dateRanges = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
        const labels = ['Jan', 'Feb', 'March'];
        const values = [1000, 4000, 5000];

        const { selectedPool } = this.props;
        const poolTitle = selectedPool ? selectedPool.name : '';

        return (
            <SafeAreaView style={{ backgroundColor: '#F8F8F8', flex: 1 }}>
                <ScrollView style={styles.container}>
                    <BackButton
                        title={poolTitle}
                        handleBackPressed={this.handleBackPress} />
                    <PDGradientText style={styles.gradientText} colors={titleGradientColors}>
                        History
                    </PDGradientText>
                    <DateRangeSelector onRangeUpdated={this.onRangeChanged} dateRange={dateRanges} />
                    <View style={styles.chartContainer}>
                        <ChartCard key={1} titleText={'Chlorine'} values={values} dateRangeLabels={labels} containerStyles={styles.chartCard} />
                        <ChartCard key={2} titleText={'Other Chem'} values={values} dateRangeLabels={labels} containerStyles={styles.chartCard} />
                        <ChartCard key={3} titleText={'Chem 2'} values={values} dateRangeLabels={labels} containerStyles={styles.chartCard} />
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
