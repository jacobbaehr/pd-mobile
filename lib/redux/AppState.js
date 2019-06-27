"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = require("redux-thunk");
const Reducer_1 = require("./hasValidSubscription/Reducer");
const Reducer_2 = require("./outputs/Reducer");
const Reducer_3 = require("./poolsLastUpdated/Reducer");
const Reducer_4 = require("./readingEntries/Reducer");
const Reducer_5 = require("./recipeId/Reducer");
const Reducer_6 = require("./selectedPool/Reducer");
const Reducer_7 = require("./user/Reducer");
const initialAppState = {
    readingEntries: [],
    outputs: [],
    selectedPool: null,
    recipeId: '002_initial_big3',
    poolsLastUpdated: 0,
    user: null,
    hasValidSubscription: false
};
const reducer = redux_1.combineReducers({
    readingEntries: Reducer_4.readingEntriesReducer,
    outputs: Reducer_2.outputsReducer,
    selectedPool: Reducer_6.selectedPoolReducer,
    recipeId: Reducer_5.recipeIdReducer,
    poolsLastUpdated: Reducer_3.poolsLastUpdatedReducer,
    user: Reducer_7.userReducer,
    hasValidSubscription: Reducer_1.hasValidSubscriptionReducer
});
// apply all middleware for application
const middleware = redux_1.applyMiddleware(redux_thunk_1.default);
// TODO: fix as any on next line?
exports.store = redux_1.createStore(reducer, initialAppState, middleware);
exports.dispatch = exports.store.dispatch;
//# sourceMappingURL=AppState.js.map