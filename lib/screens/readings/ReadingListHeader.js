"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const PDText_1 = require("../../components/PDText");
const BackButton_1 = require("components/buttons/BackButton");
const PDGradientText_1 = require("../../components/PDGradientText");
const PDProgressBar_1 = require("../../components/PDProgressBar");
class ReadingListHeader extends React.Component {
    render() {
        const percentText = `${(this.props.percentComplete * 100).toFixed(0)}% Complete`;
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(BackButton_1.BackButton, { title: this.props.pool.name, onPress: this.props.handleBackPress }),
            React.createElement(PDGradientText_1.PDGradientText, { style: styles.gradientText, colors: gradientColors }, "Readings"),
            React.createElement(PDProgressBar_1.PDProgressBar, { progress: this.props.percentComplete, foregroundColors: gradientColors, style: styles.progressBar }),
            React.createElement(PDText_1.PDText, { style: styles.percentText }, percentText)));
    }
}
exports.ReadingListHeader = ReadingListHeader;
const gradientColors = ['#07A5FF', '#FF0073'];
const styles = react_native_1.StyleSheet.create({
    container: {
        marginHorizontal: 16
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3
    },
    progressBar: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 6
    },
    percentText: {
        color: '#323232',
        fontWeight: '600',
        fontSize: 18,
        marginVertical: 7
    }
});
//# sourceMappingURL=ReadingListHeader.js.map