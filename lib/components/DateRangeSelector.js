"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const SelectableTextButton_1 = require("components/buttons/SelectableTextButton");
class DateRangeSelector extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleDateRangeChanged = (selectedDateRange) => {
            this.setState({ currentDateRange: selectedDateRange });
            this.props.onRangeUpdated(selectedDateRange);
        };
        this.getButtons = () => {
            let count = 0;
            return this.props.dateRange.map((range) => React.createElement(SelectableTextButton_1.SelectableTextButton, { key: count++, buttonText: range, onPress: this.handleDateRangeChanged, isSelected: range === this.state.currentDateRange }));
        };
        this.state = {
            currentDateRange: ''
        };
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container }, this.getButtons()));
    }
}
exports.DateRangeSelector = DateRangeSelector;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    }
});
//# sourceMappingURL=DateRangeSelector.js.map