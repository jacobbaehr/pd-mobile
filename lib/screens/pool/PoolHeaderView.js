"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_navigation_fluid_transitions_1 = require("react-navigation-fluid-transitions");
const Button_1 = require("../../components/buttons/Button");
const PDText_1 = require("components/PDText");
const PoolBackgroundView_1 = require("./PoolBackgroundView");
const CloseButton_1 = require("components/buttons/CloseButton");
class PoolHeaderView extends React.Component {
    render() {
        if (!this.props.pool) {
            return React.createElement(react_native_1.View, null);
        }
        const detailsText = `${this.props.pool.volume} gallons, ${this.props.pool.waterType}`;
        return (React.createElement(react_native_1.View, { style: this.props.style },
            React.createElement(PoolBackgroundView_1.PoolBackgroundView, { pool: this.props.pool, style: styles.background }),
            React.createElement(react_native_1.View, { style: styles.buttonContainerRight },
                React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'right' },
                    React.createElement(Button_1.Button, { title: 'Edit', onPress: this.props.handlePressedEdit, styles: styles.button, textStyles: styles.buttonText }))),
            React.createElement(react_native_1.View, { style: styles.buttonContainerLeft },
                React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'top' },
                    React.createElement(CloseButton_1.CloseButton, { onPress: this.props.handlePressedBack }))),
            React.createElement(PDText_1.PDText, { style: styles.poolNameText, shared: `pool_name_${this.props.pool.objectId}` }, this.props.pool.name),
            React.createElement(PDText_1.PDText, { style: styles.poolVolumeText, shared: `pool_volume_${this.props.pool.objectId}` }, detailsText)));
    }
}
exports.PoolHeaderView = PoolHeaderView;
const styles = react_native_1.StyleSheet.create({
    container: {},
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 190
    },
    poolNameText: {
        color: 'white',
        fontSize: 28,
        position: 'absolute',
        bottom: 32,
        left: 12,
        right: 12,
        fontWeight: '600'
    },
    poolVolumeText: {
        color: 'white',
        fontSize: 16,
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
        fontWeight: '500'
    },
    fakeStarView: {
        position: 'absolute',
        top: -10,
        right: 15,
        width: 17,
        height: 16
    },
    buttonContainerRight: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    buttonContainerLeft: {
        position: 'absolute',
        top: 15,
        left: 15
    },
    button: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 15
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 17,
        fontWeight: '600',
        paddingHorizontal: 15
        // paddingVertical: 2
    }
});
//# sourceMappingURL=PoolHeaderView.js.map