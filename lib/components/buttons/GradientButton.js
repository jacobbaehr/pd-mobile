"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = require("react-native-linear-gradient");
// @ts-ignore
const react_native_touchable_scale_1 = require("react-native-touchable-scale");
const PDText_1 = require("components/PDText");
class GradientButton extends React.Component {
    constructor() {
        super(...arguments);
        this.handleButtonPress = () => {
            this.props.onPress();
        };
    }
    render() {
        const gradientStart = this.props.gradientStart ? this.props.gradientStart : '#07A5FF';
        const gradientEnd = this.props.gradientEnd ? this.props.gradientEnd : '#FF0073';
        return (React.createElement(react_native_touchable_scale_1.default, { style: [styles.container, this.props.containerStyles], onPress: this.handleButtonPress, disabled: this.props.disabled, activeScale: 0.96 },
            React.createElement(react_native_linear_gradient_1.default, { colors: [gradientStart, gradientEnd], start: { x: -0.1, y: -0.1 }, end: { x: 1.15, y: 1.1 }, style: styles.linearGradient },
                React.createElement(PDText_1.PDText, { style: styles.text }, this.props.title))));
    }
}
exports.GradientButton = GradientButton;
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 9.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
        width: '100%'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        paddingVertical: 15
    },
    linearGradient: {
        borderRadius: 9.5,
        marginVertical: 8
    }
});
//# sourceMappingURL=GradientButton.js.map