"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
/** */
exports.SeparatorLine = (props) => {
    return (React.createElement(react_native_1.View, { style: [styles.line, props.lineStyles] }));
};
const styles = react_native_1.StyleSheet.create({
    line: {
        paddingVertical: 2,
        backgroundColor: '#9b9b9b',
        borderRadius: 8,
        flex: 1
    }
});
//# sourceMappingURL=SeparatorLine.js.map