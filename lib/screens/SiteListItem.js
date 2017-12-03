"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class SiteListItem extends React.Component {
    constructor() {
        super(...arguments);
        this.handleButtonPressed = () => {
            this.props.onSiteSelected(this.props.name);
        };
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.Button, { title: this.props.name, onPress: this.handleButtonPressed })));
    }
}
exports.SiteListItem = SiteListItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        height: 50
    }
});
//# sourceMappingURL=SiteListItem.js.map