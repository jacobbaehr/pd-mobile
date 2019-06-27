"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReadingEntry_1 = require("models/logs/ReadingEntry");
const Actions_1 = require("./Actions");
exports.readingEntriesReducer = (previousState = null, action) => {
    switch (action.type) {
        case Actions_1.RECORD_INPUT:
            const recordReadingAction = action;
            const newInputs = [];
            let inputAlreadyRecorded = false;
            previousState.forEach(r => {
                if (r.readingId === recordReadingAction.inputID) {
                    newInputs.push(ReadingEntry_1.ReadingEntry.make(recordReadingAction.reading, recordReadingAction.value));
                    inputAlreadyRecorded = true;
                }
                else {
                    newInputs.push(r);
                }
            });
            if (!inputAlreadyRecorded) {
                newInputs.push(ReadingEntry_1.ReadingEntry.make(recordReadingAction.reading, recordReadingAction.value));
            }
            return newInputs;
        default:
            return previousState;
    }
};
//# sourceMappingURL=Reducer.js.map