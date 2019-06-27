"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_navigation_fluid_transitions_1 = require("react-navigation-fluid-transitions");
class PDText extends React.Component {
    constructor() {
        super(...arguments);
        this.getText = () => {
            let adjustsFontSizeToFit = false;
            let numberOfLines = undefined;
            if (this.props.scale !== undefined) {
                adjustsFontSizeToFit = this.props.scale.scale;
                numberOfLines = this.props.scale.scaleLines;
            }
            return React.createElement(react_native_1.Text, { adjustsFontSizeToFit: adjustsFontSizeToFit, numberOfLines: numberOfLines, style: [styles.default, this.props.style] }, this.props.children);
        };
    }
    render() {
        if (this.props.shared === undefined) {
            return this.getText();
        }
        return (React.createElement(react_navigation_fluid_transitions_1.Transition, { shared: this.props.shared }, this.getText()));
    }
}
exports.PDText = PDText;
const styles = react_native_1.StyleSheet.create({
    default: {
        fontFamily: 'Avenir Next'
    }
});
//# sourceMappingURL=PDText.js.map