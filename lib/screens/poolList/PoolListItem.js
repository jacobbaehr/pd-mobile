"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_navigation_fluid_transitions_1 = require("react-navigation-fluid-transitions");
// @ts-ignore
const react_native_touchable_scale_1 = require("react-native-touchable-scale");
const PDText_1 = require("components/PDText");
const images_1 = require("assets/images");
const PoolBackgroundView_1 = require("../pool/PoolBackgroundView");
class PoolListItem extends React.Component {
    constructor() {
        super(...arguments);
        this.handleButtonPressed = () => {
            this.props.onPoolSelected(this.props.pool);
        };
    }
    render() {
        const pool = this.props.pool;
        return (React.createElement(react_native_touchable_scale_1.default, { style: styles.container, onPress: this.handleButtonPressed, underlayColor: 'transparent', activeScale: 0.99 },
            React.createElement(react_native_1.View, { style: styles.content },
                React.createElement(PoolBackgroundView_1.PoolBackgroundView, { style: styles.background, pool: pool }),
                React.createElement(PDText_1.PDText, { style: styles.poolNameText, shared: `pool_name_${pool.objectId}` }, pool.name),
                React.createElement(PDText_1.PDText, { style: styles.poolVolumeText, shared: `pool_volume_${pool.objectId}` },
                    pool.volume,
                    " gallons"),
                React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'right' },
                    React.createElement(react_native_1.Image, { style: styles.star, source: images_1.images.star, width: 17, height: 16 })))));
    }
}
exports.PoolListItem = PoolListItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        height: 190,
        marginHorizontal: 12,
        backgroundColor: 'transparent',
        marginBottom: 10
    },
    content: {
        flex: 1,
        borderRadius: 12,
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 2
    },
    background: {
        flex: 1,
        borderRadius: 12
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
    star: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});
//# sourceMappingURL=PoolListItem.js.map