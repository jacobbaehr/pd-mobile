"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const PDText_1 = require("../../components/PDText");
class ReadingListSectionHeader extends React.Component {
    render() {
        return React.createElement(PDText_1.PDText, { style: styles.remainingText }, this.props.title);
    }
}
exports.ReadingListSectionHeader = ReadingListSectionHeader;
const styles = react_native_1.StyleSheet.create({
    remainingText: {
        marginTop: 7,
        marginBottom: 10,
        marginHorizontal: 16,
        fontWeight: '700',
        fontSize: 28
    }
});
//# sourceMappingURL=ReadingListSectionHeader.js.map