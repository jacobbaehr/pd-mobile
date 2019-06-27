"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// tslint:disable-next-line:ordered-imports
const react_native_1 = require("react-native");
// @ts-ignore
const react_native_touchable_scale_1 = require("react-native-touchable-scale");
const PDText_1 = require("components/PDText");
exports.TextButton = (props) => {
    return (React.createElement(react_native_touchable_scale_1.default, { style: props.containerStyles, onPress: props.onPress, disabled: props.disabled, activeScale: 0.96 },
        React.createElement(PDText_1.PDText, { style: [styles.text, props.textStyles] }, props.text)));
};
const styles = react_native_1.StyleSheet.create({
    text: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700'
    }
});
//# sourceMappingURL=TextButton.js.map