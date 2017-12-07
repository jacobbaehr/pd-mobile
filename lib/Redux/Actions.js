"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_READING = 'SET_READING';
exports.setReading = (readingID, value) => {
    return {
        type: exports.SET_READING,
        value: value,
        identifier: readingID
    };
};
const setReadingAction = exports.setReading('chlorine', 4.3);
//# sourceMappingURL=Actions.js.map