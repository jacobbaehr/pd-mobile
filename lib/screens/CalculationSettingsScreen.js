"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const Button_1 = require("../components/buttons/Button");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation
    };
};
/// Allows users to customize caluclation settings.
// TODO: pull these from a webserver & make them more dynamic (we're hard-coding initial values for now)
class CalculationSettingsScreenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = () => {
            // dispatch(setFormula(this.state.text));
        };
        this.state = {
            text: props.chlorineFormula
        };
    }
    render() {
        return (React.createElement(react_native_1.View, null,
            React.createElement(react_native_1.Text, null, "Calcium Hypochlorite"),
            React.createElement(react_native_1.TextInput, { onChangeText: (text) => this.setState({ text }), value: this.state.text }),
            React.createElement(Button_1.Button, { title: 'Save', onPress: this.handleSave, styles: styles.button })));
    }
}
exports.CalculationSettingsScreen = react_redux_1.connect(mapStateToProps)(CalculationSettingsScreenComponent);
const styles = react_native_1.StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        backgroundColor: 'blue',
        height: 45,
        margin: 15
    }
});
//# sourceMappingURL=CalculationSettingsScreen.js.map