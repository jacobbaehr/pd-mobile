"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/Hello.tsx
const React = require("react");
const react_native_1 = require("react-native");
class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.handleIncrement = () => {
            this.setState({
                enthusiasmOffset: this.state.enthusiasmOffset + 1
            });
        };
        this.handleDecrement = () => {
            this.setState({
                enthusiasmOffset: this.state.enthusiasmOffset - 1
            });
        };
        this.getExclamationMarks = (numChars) => {
            return Array(numChars + 1).join('!');
        };
        this.state = {
            enthusiasmOffset: 0
        };
    }
    render() {
        const enthusiasmLevel = this.props.enthusiasmLevel + this.state.enthusiasmOffset;
        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }
        return (React.createElement(react_native_1.View, { style: styles.root },
            React.createElement(react_native_1.Text, { style: styles.greeting },
                "Hello ",
                this.props.personName + this.getExclamationMarks(enthusiasmLevel)),
            React.createElement(react_native_1.View, { style: styles.buttons },
                React.createElement(react_native_1.View, { style: styles.button },
                    React.createElement(react_native_1.Button, { title: "-", onPress: this.handleDecrement, color: 'red' })),
                React.createElement(react_native_1.View, { style: styles.button },
                    React.createElement(react_native_1.Button, { title: "+", onPress: this.handleIncrement, color: 'blue' })))));
    }
    ;
}
exports.Hello = Hello;
// styles
const styles = react_native_1.StyleSheet.create({
    root: {
        alignItems: "center",
        alignSelf: "center"
    },
    buttons: {
        flexDirection: "row",
        minHeight: 70,
        alignItems: "stretch",
        alignSelf: "center",
        borderWidth: 5,
    },
    button: {
        flex: 1,
        paddingVertical: 0,
    },
    greeting: {
        color: "#999",
        fontWeight: "bold"
    }
});
//# sourceMappingURL=Hello.js.map