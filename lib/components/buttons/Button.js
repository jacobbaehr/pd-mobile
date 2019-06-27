"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const PDText_1 = require("components/PDText");
class Button extends React.Component {
    constructor() {
        super(...arguments);
        this.handleButtonPress = () => {
            this.props.onPress();
        };
    }
    render() {
        return (React.createElement(react_native_1.TouchableHighlight, { style: [styles.container, this.props.styles], onPress: this.handleButtonPress, disabled: this.props.disabled },
            React.createElement(PDText_1.PDText, { style: this.props.textStyles ? this.props.textStyles : styles.text }, this.props.title)));
    }
}
exports.Button = Button;
const styles = react_native_1.StyleSheet.create({
    container: {},
    text: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        margin: '.5%',
    }
});
//# sourceMappingURL=Button.js.map