"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = require("react-native-linear-gradient");
class PDProgressBar extends React.Component {
    render() {
        const foregroundFlex = this.props.progress;
        const backgroundFlex = 1 - foregroundFlex;
        const containerStyle = react_native_1.StyleSheet.flatten([
            styles.container,
            this.props.style
        ]);
        const backgroundStyle = {
            backgroundColor: 'transparent',
            flex: backgroundFlex
        };
        return (React.createElement(react_native_1.View, { style: containerStyle },
            React.createElement(react_native_linear_gradient_1.default, { colors: this.props.foregroundColors, start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: { flex: foregroundFlex } }),
            React.createElement(react_native_1.View, { style: backgroundStyle })));
    }
}
exports.PDProgressBar = PDProgressBar;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});
//# sourceMappingURL=PDProgressBar.js.map