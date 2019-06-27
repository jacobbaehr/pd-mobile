"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const PDText_1 = require("../../components/PDText");
// @ts-ignore
const react_native_touchable_scale_1 = require("react-native-touchable-scale");
const images_1 = require("assets/images");
class PoolListFooter extends React.Component {
    constructor() {
        super(...arguments);
        this.handlePress = () => {
            this.props.handlePress();
        };
        this.getButton = () => {
            const buttonStyles = this.props.isEmpty
                ? [styles.button, styles.buttonEmpty]
                : [styles.button, styles.buttonNonEmpty];
            return (React.createElement(react_native_touchable_scale_1.default, { style: buttonStyles, underlayColor: '#DDD', activeOpacity: 0.6, activeScale: 0.985, onPress: this.handlePress },
                React.createElement(PDText_1.PDText, { style: styles.plusText }, "+")));
        };
    }
    render() {
        if (!this.props.isEmpty) {
            return this.getButton();
        }
        const imageWidth = react_native_1.Dimensions.get('window').width;
        const imageHeight = imageWidth * 0.792;
        const imageStyles = this.props.isEmpty ? [styles.image] : [styles.image, styles.invisible];
        return (React.createElement(react_native_1.View, null,
            this.getButton(),
            React.createElement(PDText_1.PDText, { style: styles.topText }, "Looks like you haven\u2019t added any pools yet."),
            React.createElement(PDText_1.PDText, { style: styles.bottomText }, "Tap the + icon above to get started."),
            React.createElement(react_native_1.Image, { style: imageStyles, source: images_1.images.poolListEmpty, width: imageWidth, height: imageHeight })));
    }
}
exports.PoolListFooter = PoolListFooter;
const styles = react_native_1.StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 15,
        height: 100,
        marginHorizontal: 14,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonEmpty: {
        marginTop: 0
    },
    buttonNonEmpty: {
        opacity: 0.25
    },
    plusText: {
        color: 'black',
        fontSize: 80
        // marginTop: -10
    },
    topText: {
        color: '#3A3A3A',
        fontSize: 22,
        fontWeight: '600',
        marginHorizontal: 20,
        textAlign: 'center',
        marginTop: 28
    },
    bottomText: {
        color: '#3A3A3A',
        fontSize: 22,
        fontWeight: '500',
        marginHorizontal: 20,
        textAlign: 'center',
        marginTop: 22
    },
    image: {
        opacity: 0.6
    },
    invisible: {
        opacity: 0
    }
});
//# sourceMappingURL=PoolListFooter.js.map