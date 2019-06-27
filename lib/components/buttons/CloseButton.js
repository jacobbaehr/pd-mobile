"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_native_touchable_scale_1 = require("react-native-touchable-scale");
const images_1 = require("assets/images");
class CloseButton extends React.Component {
    render() {
        return (React.createElement(react_native_1.View, { style: styles.outerContainer },
            React.createElement(react_native_touchable_scale_1.default, { style: styles.innerContainer, underlayColor: 'transparent', activeScale: 0.97, onPress: this.props.onPress },
                React.createElement(react_native_1.Image, { style: styles.image, source: images_1.images.closeDark, width: 30, height: 30 }))));
    }
}
exports.CloseButton = CloseButton;
const styles = react_native_1.StyleSheet.create({
    outerContainer: {
        flexDirection: 'row'
    },
    innerContainer: {
        flexDirection: 'row'
    },
    image: {
        marginHorizontal: 8,
        marginBottom: 8
    }
});
//# sourceMappingURL=CloseButton.js.map