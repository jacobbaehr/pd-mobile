"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
// @ts-ignore
const react_native_touchable_scale_1 = require("react-native-touchable-scale");
const images_1 = require("assets/images");
const PDText_1 = require("components/PDText");
class BackButton extends React.Component {
    constructor() {
        super(...arguments);
        this.getText = () => {
            return this.props.title ? (React.createElement(PDText_1.PDText, { style: styles.backButtonText, scale: this.props.scale }, this.props.title)) : null;
        };
    }
    render() {
        const imageSource = this.props.imageSource ? this.props.imageSource : images_1.images.back;
        return (React.createElement(react_native_1.View, { style: styles.backButtonOuterContainer },
            React.createElement(react_native_touchable_scale_1.default, { style: styles.backButtonInnerContainer, underlayColor: '#F8F8F8', activeScale: 0.97, onPress: this.props.onPress },
                React.createElement(react_native_1.Image, { style: styles.backButtonImage, source: imageSource, width: 21, height: 21 }),
                this.getText())));
    }
}
exports.BackButton = BackButton;
const styles = react_native_1.StyleSheet.create({
    backButtonOuterContainer: {
        flexDirection: 'row'
    },
    backButtonInnerContainer: {
        flexDirection: 'row'
    },
    backButtonImage: {
        marginTop: 8,
        marginRight: 10
    },
    backButtonText: {
        fontWeight: '700',
        fontSize: 28,
        color: 'black'
    }
});
//# sourceMappingURL=BackButton.js.map