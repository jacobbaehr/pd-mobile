"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const BackButton_1 = require("components/buttons/BackButton");
const Button_1 = require("components/buttons/Button");
const PDGradientText_1 = require("components/PDGradientText");
class EditListHeader extends React.Component {
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.View, { style: styles.options },
                React.createElement(react_native_1.View, { style: { width: '50%' } },
                    React.createElement(BackButton_1.BackButton, { title: this.props.buttonText ? this.props.buttonText : 'Back', onPress: this.props.handleBackPress, scale: { scale: true, scaleLines: 2 } })),
                React.createElement(Button_1.Button, { title: 'Save', onPress: () => this.props.actions(), styles: styles.button, textStyles: styles.buttonText })),
            React.createElement(PDGradientText_1.PDGradientText, { style: styles.gradientText, colors: gradientColors }, this.props.header)));
    }
}
exports.EditListHeader = EditListHeader;
const gradientColors = ['#FCCB90', '#D57EEB'];
const styles = react_native_1.StyleSheet.create({
    container: {
        marginHorizontal: 15
    },
    options: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3
    },
    button: {
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 10.4,
        alignSelf: 'flex-end',
        top: -10,
        height: 21,
        width: 52
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'Avenir Next',
        fontSize: 13.2,
        fontWeight: '600',
    }
});
//# sourceMappingURL=PoolDetailsHeader.js.map