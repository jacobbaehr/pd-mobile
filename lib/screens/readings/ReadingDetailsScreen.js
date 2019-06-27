"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Actions_1 = require("redux/readingEntries/Actions");
const AppState_1 = require("redux/AppState");
class ReadingDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonPress = () => {
            const value = this.state.value;
            if (value !== undefined) {
                AppState_1.dispatch(Actions_1.recordInput(this.reading, value));
            }
            this.props.navigation.goBack();
        };
        this.handleTextChanged = (text) => {
            this.setState({ value: Number(text) });
        };
        this.entry = this.props.navigation.state.params.readingEntry;
        this.reading = this.props.navigation.state.params.reading;
        if ((this.entry !== null) && (this.entry !== undefined)) {
            this.state = {
                value: this.entry.value
            };
        }
        else {
            this.state = {};
        }
    }
    render() {
        const defaultValueString = (this.state.value === undefined) ? '' : `${this.state.value}`;
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.Text, { style: styles.readingNameLabel }, this.reading.name),
            React.createElement(react_native_1.TextInput, { style: styles.textInput, onChangeText: this.handleTextChanged, keyboardType: 'numeric', autoFocus: true, defaultValue: defaultValueString }),
            React.createElement(react_native_1.Button, { title: 'Set Reading', onPress: this.handleButtonPress })));
    }
}
exports.ReadingDetailsScreen = ReadingDetailsScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    readingNameLabel: {
        margin: 15,
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 15,
        textAlign: 'center'
    }
});
//# sourceMappingURL=ReadingDetailsScreen.js.map