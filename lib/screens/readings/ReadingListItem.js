"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const PDText_1 = require("../../components/PDText");
// @ts-ignore
const react_native_touchable_scale_1 = require("react-native-touchable-scale");
class ReadingListItem extends React.Component {
    constructor() {
        super(...arguments);
        this.handleCellPressed = () => {
            this.props.onReadingSelected(this.props.reading, this.props.readingEntry);
        };
        this.handleInputButtonPressed = () => {
            this.props.onInputReadingSelected(this.props.reading, this.props.readingEntry);
        };
    }
    render() {
        const entry = this.props.readingEntry;
        const readingTaken = (entry !== null) && (entry !== undefined);
        const leftImageSource = readingTaken
            ? require('../../assets/check.png')
            : require('../../assets/incomplete.png');
        const input = this.props.reading;
        const readingName = (input.name === undefined) ? 'Reading' : input.name;
        // const readingMessage = readingTaken ? `${entry!.value}` : `Input ${readingName}`;
        const buttonOrNothing = this.props.isActive
            ? React.createElement(react_native_touchable_scale_1.default, { style: styles.inputButton, onPress: this.handleInputButtonPressed, activeScale: 0.99 },
                React.createElement(PDText_1.PDText, { style: styles.inputButtonTitle },
                    "Input ",
                    readingName))
            : null;
        const caretOrNothing = this.props.isActive
            ? null
            : React.createElement(react_native_1.Image, { style: styles.downCaret, source: require('../../assets/down_caret.png'), width: 18, height: 10 });
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.TouchableHighlight, { style: styles.content, underlayColor: '#FFFFFF', onPress: this.handleCellPressed },
                React.createElement(react_native_1.View, { style: { flex: 1 } },
                    React.createElement(react_native_1.View, { style: { flex: 1, flexDirection: 'row' } },
                        React.createElement(react_native_1.Image, { style: styles.circleImage, source: leftImageSource, width: 28, height: 28 }),
                        React.createElement(PDText_1.PDText, { style: styles.readingName }, readingName),
                        caretOrNothing),
                    buttonOrNothing))));
    }
}
exports.ReadingListItem = ReadingListItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        // height: 50,
        alignContent: 'stretch',
        borderRadius: 10
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.11,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 12,
        marginHorizontal: 16
    },
    circleImage: {
        margin: 10
    },
    downCaret: {
        marginTop: 21,
        marginRight: 19
    },
    readingName: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 48,
        flex: 1
    },
    readingValue: {
        color: 'white',
        justifyContent: 'center',
    },
    infoReadingValue: {
        color: 'grey'
    },
    inputButton: {
        backgroundColor: 'black',
        margin: 16,
        marginTop: 10,
        borderRadius: 10
    },
    inputButtonTitle: {
        color: 'white',
        lineHeight: 50,
        paddingVertical: 0,
        fontWeight: '700',
        fontSize: 24,
        alignContent: 'center',
        alignSelf: 'center'
    }
});
//# sourceMappingURL=ReadingListItem.js.map