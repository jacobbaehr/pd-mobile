"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enthusiasmLevel: 1
        };
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.Text, null, "This is the details screen")));
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