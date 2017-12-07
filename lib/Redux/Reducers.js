"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A class that represents an individual reading
class Reading {
    constructor(name, identifier, value) {
        // no-op
    }
}
exports.Reading = Reading;
;
;
// Reducer that modifies the app state in response to a SetReadingAction.
exports.readingsReducer = (previousState, action) => {
    // Assume the action is of type SET_READING
    const setReadingAction = action;
    let newReadings = [];
    previousState.readings.forEach(r => {
        if (r.identifier === setReadingAction.identifier) {
            newReadings.push(new Reading(r.name, r.identifier, setReadingAction.value));
        }
        else {
            newReadings.push(r);
        }
    });
    return { readings: newReadings };
};
//# sourceMappingURL=Reducers.js.map