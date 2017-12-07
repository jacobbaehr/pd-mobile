"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const Reducers_1 = require("./Reducers");
const initialAppState = {
    readings: [
        new Reducers_1.Reading('Free Chlorine', 'chlorine'),
        new Reducers_1.Reading('pH', 'pH'),
        new Reducers_1.Reading('Total Alkalinity', 'TA')
    ]
};
const store = redux_1.createStore(Reducers_1.readingsReducer, initialAppState);
exports.dispatch = store.dispatch;
//# sourceMappingURL=AppState.js.map