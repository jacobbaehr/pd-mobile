"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
/** */
exports.TextInputWithTitle = (props) => {
    return (React.createElement(react_native_1.View, { style: styles.container },
        React.createElement(react_native_1.Text, { style: [styles.titleText, props.titleTextStyles] }, props.titleText),
        React.createElement(react_native_1.TextInput, { keyboardType: props.keyboardType, autoCorrect: props.autoCorrect, autoCapitalize: props.autoCapitalize, secureTextEntry: props.secureTextEntry, placeholder: props.placeholderText, onChangeText: props.onTextChanged, style: [styles.input, props.inputStyles] })));
};
const styles = react_native_1.StyleSheet.create({
    container: {},
    titleText: {
        fontFamily: 'Avenir Next',
        fontSize: 18,
        paddingBottom: 5
    },
    input: {
        borderBottomWidth: 2,
        borderColor: '#4a4a4a',
        marginBottom: 15,
        fontFamily: 'Avenir Next',
        fontSize: 22,
        paddingHorizontal: 5,
        color: '#00c89f',
        fontWeight: '500'
    }
});
//# sourceMappingURL=TextInputWithTitle.js.map