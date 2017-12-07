"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const AppState_1 = require("../Redux/AppState");
const Actions_1 = require("../Redux/Actions");
class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonPress = () => {
            AppState_1.dispatch(Actions_1.setReading(this.props.navigation.state.params.reading.identifier, 4));
        };
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.Text, null, this.props.navigation.state.params.reading.name),
            React.createElement(react_native_1.Button, { title: 'Set Reading', onPress: this.handleButtonPress })));
    }
}
exports.DetailsScreen = DetailsScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
//# sourceMappingURL=DetailsScreen.js.map