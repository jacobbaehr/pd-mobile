"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
/** */
class SelectableTextButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnPress = () => {
            this.setState({ isSelected: !this.state.isSelected });
            this.props.onPress(this.props.buttonText);
        };
        this.state = { isSelected: !!props.isSelected };
    }
    componentWillReceiveProps(props) {
        this.setState({ isSelected: !!props.isSelected });
    }
    render() {
        const buttonStyles = this.state.isSelected ? styles.selectedContainer : styles.unselectedContainer;
        const textStyles = this.state.isSelected ? styles.selectedText : styles.unselectedText;
        return (React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: this.handleOnPress },
            React.createElement(react_native_1.View, { style: [styles.baseContainer, buttonStyles] },
                React.createElement(react_native_1.Text, { style: [styles.text, textStyles] }, this.props.buttonText))));
    }
}
exports.SelectableTextButton = SelectableTextButton;
const styles = react_native_1.StyleSheet.create({
    baseContainer: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 8,
        borderWidth: 1
    },
    selectedContainer: {
        borderColor: '#1E6BFF'
    },
    unselectedContainer: {
        borderColor: 'transparent'
    },
    text: {
        fontWeight: '700',
        fontSize: 18
    },
    selectedText: {
        color: '#1E6BFF'
    },
    unselectedText: {
        color: 'black'
    }
});
//# sourceMappingURL=SelectableTextButton.js.map