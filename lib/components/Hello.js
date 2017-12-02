"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/Hello.tsx
const React = require("react");
const react_native_1 = require("react-native");
function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }) {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }
    return (React.createElement(react_native_1.View, { style: styles.root },
        React.createElement(react_native_1.Text, { style: styles.greeting },
            "Hello ",
            name + getExclamationMarks(enthusiasmLevel)),
        React.createElement(react_native_1.View, { style: styles.buttons },
            React.createElement(react_native_1.View, { style: styles.button },
                React.createElement(react_native_1.Button, { title: "-", onPress: onDecrement || (() => { }), color: 'red' })),
            React.createElement(react_native_1.View, { style: styles.button },
                React.createElement(react_native_1.Button, { title: "+", onPress: onIncrement || (() => { }), color: 'blue' })))));
}
exports.default = Hello;
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
// helpers
function getExclamationMarks(numChars) {
    return Array(numChars + 1).join('!');
}
//# sourceMappingURL=Hello.js.map