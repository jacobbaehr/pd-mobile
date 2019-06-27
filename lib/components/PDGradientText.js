"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_navigation_fluid_transitions_1 = require("react-navigation-fluid-transitions");
const react_native_linear_gradient_1 = require("react-native-linear-gradient");
class PDGradientText extends React.Component {
    getText() {
        const textStyle = react_native_1.StyleSheet.flatten([styles.default, this.props.style]);
        return (React.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
            React.createElement(react_native_1.MaskedViewIOS, { maskElement: React.createElement(react_native_1.Text, { style: textStyle }, this.props.children) },
                React.createElement(react_native_linear_gradient_1.default, { colors: this.props.colors, start: { x: -0.2, y: -0.3 }, end: { x: 1.05, y: 1.2 } },
                    React.createElement(react_native_1.Text, { style: [textStyle, { opacity: 0 }] }, this.props.children))),
            React.createElement(react_native_1.View, { style: { flex: 1 } })));
    }
    render() {
        if (this.props.shared === undefined) {
            return this.getText();
        }
        return (React.createElement(react_navigation_fluid_transitions_1.Transition, { shared: this.props.shared }, this.getText()));
    }
}
exports.PDGradientText = PDGradientText;
const styles = react_native_1.StyleSheet.create({
    default: {
        fontFamily: 'Avenir Next',
        fontWeight: '700',
        fontSize: 28
    }
});
//# sourceMappingURL=PDGradientText.js.map