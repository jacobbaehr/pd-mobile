"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_native_touchable_scale_1 = require("react-native-touchable-scale");
const images_1 = require("assets/images");
exports.DismissStackButton = (props) => {
    return (React.createElement(react_native_1.View, { style: styles.container },
        React.createElement(react_native_touchable_scale_1.default, { underlayColor: 'transparent', activeScale: 0.97, onPress: props.handleBackPressed },
            React.createElement(react_native_1.Image, { style: styles.backButtonImage, source: images_1.images.closeIcon, width: 21, height: 21 }))));
};
const styles = react_native_1.StyleSheet.create({
    container: {
    // backgroundColor: 'pink',
    },
    backButtonImage: {}
});
//# sourceMappingURL=DismissStackButton.js.map