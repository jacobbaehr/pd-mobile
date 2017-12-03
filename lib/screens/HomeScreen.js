"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Hello_1 = require("../components/Hello");
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonPress = () => {
            this.props.navigation.navigate('Details');
        };
        this.state = {
            enthusiasmLevel: 1
        };
    }
    render() {
        console.log('AAAAAAAA&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(Hello_1.Hello, { personName: 'wade', enthusiasmLevel: this.state.enthusiasmLevel }),
            React.createElement(react_native_1.Button, { title: 'Show Me More', onPress: this.handleButtonPress })));
    }
}
exports.HomeScreen = HomeScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
//# sourceMappingURL=HomeScreen.js.map