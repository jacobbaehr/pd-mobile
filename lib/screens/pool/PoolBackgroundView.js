"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_navigation_fluid_transitions_1 = require("react-navigation-fluid-transitions");
// TODO: put image or gradient here
class PoolBackgroundView extends React.Component {
    render() {
        return (React.createElement(react_navigation_fluid_transitions_1.Transition, { shared: `pool_bg_${this.props.pool.objectId}` },
            React.createElement(react_native_1.View, { style: [styles.container, this.props.style] })));
    }
}
exports.PoolBackgroundView = PoolBackgroundView;
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#2091F9',
        flex: 1
    }
});
//# sourceMappingURL=PoolBackgroundView.js.map