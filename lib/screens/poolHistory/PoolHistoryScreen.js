"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const Database_1 = require("repository/Database");
const BackButton_1 = require("components/buttons/BackButton");
const ChartCard_1 = require("components/charts/ChartCard");
const DateRangeSelector_1 = require("components/DateRangeSelector");
const PDGradientText_1 = require("components/PDGradientText");
const react_redux_1 = require("react-redux");
const LogEntryApiManager_1 = require("api/logEntry/LogEntryApiManager");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool,
        user: state.user
    };
};
class PoolHistoryComponent extends React.PureComponent {
    constructor(ownProps) {
        super(ownProps);
        this.handleBackPress = () => {
            this.props.navigation.goBack();
        };
        this.onRangeChanged = (selectedRange) => {
            this.setState({ currentDateRange: selectedRange });
            // const manager = new LogEntryApiManager('/v1', () => { return })
            const manager = new LogEntryApiManager_1.LogEntryApiManager('/eid', () => { return ''; }, this.props.user.auth.cognitoUser);
            manager.getLogEntriesForPool(this.props.selectedPool.objectId);
        };
        this.loadChartData = () => {
            const data = Database_1.Database.loadLogEntriesForPool(this.props.selectedPool.objectId);
            const entries = (data === undefined) ? [] : data.map(le => le);
            // get all different readings & treatments
            let idsToGraph = [];
            entries.forEach(entry => {
                entry.readingEntries.forEach(reading => {
                    const graphable = { title: reading.readingName, id: reading.readingId };
                    if (idsToGraph.filter(g => { return g.title == graphable.title && g.id == graphable.id; }).length == 0) {
                        idsToGraph.push(graphable);
                    }
                });
                entry.treatmentEntries.forEach(treatment => {
                    const graphable = { title: treatment.treatmentName, id: treatment.treatmentId };
                    if (idsToGraph.filter(g => { return g.title == graphable.title && g.id == graphable.id; }).length == 0) {
                        idsToGraph.push(graphable);
                    }
                });
            });
            // get a chartcardviewmodel for each
            return idsToGraph.map(graphable => {
                let dates = [];
                let values = [];
                entries.forEach(entry => {
                    entry.readingEntries.forEach(reading => {
                        if (reading.readingId === graphable.id) {
                            dates.push(entry.ts);
                            values.push(reading.value);
                        }
                    });
                    entry.treatmentEntries.forEach(treatment => {
                        if (treatment.treatmentId === graphable.id) {
                            dates.push(entry.ts);
                            values.push(treatment.amount);
                        }
                    });
                });
                return {
                    title: graphable.title,
                    masterId: graphable.id,
                    values: values,
                    timestamps: dates
                };
            });
        };
        this.state = {
            currentDateRange: ''
        };
        this.chartData = this.loadChartData();
    }
    render() {
        const dateRanges = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
        const labels = ['Jan', 'Feb', 'March'];
        const values = [1000, 4000, 5000];
        const { selectedPool } = this.props;
        const poolTitle = selectedPool ? selectedPool.name : '';
        const charts = this.chartData.map(vm => {
            return React.createElement(ChartCard_1.ChartCard, { key: vm.masterId, viewModel: vm, containerStyles: styles.chartCard });
        });
        return (React.createElement(react_navigation_1.SafeAreaView, { style: { backgroundColor: '#F8F8F8', flex: 1 } },
            React.createElement(react_native_1.ScrollView, { style: styles.container },
                React.createElement(BackButton_1.BackButton, { title: poolTitle, onPress: this.handleBackPress }),
                React.createElement(PDGradientText_1.PDGradientText, { style: styles.gradientText, colors: titleGradientColors }, "History"),
                React.createElement(DateRangeSelector_1.DateRangeSelector, { onRangeUpdated: this.onRangeChanged, dateRange: dateRanges }),
                React.createElement(react_native_1.View, { style: styles.chartContainer }, charts))));
    }
}
exports.PoolHistoryScreen = react_redux_1.connect(mapStateToProps)(PoolHistoryComponent);
const titleGradientColors = ['#00C6FF', '#0072FF'];
const styles = react_native_1.StyleSheet.create({
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
//# sourceMappingURL=PoolHistoryScreen.js.map