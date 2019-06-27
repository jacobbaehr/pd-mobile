"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actions_1 = require("./Actions");
/** */
exports.hasValidSubscriptionReducer = (previousState = false, action) => {
    switch (action.type) {
        case Actions_1.UPDATE_VALID_SUBSCRIPTION:
            return action.hasValidSubscription;
        default:
            return previousState;
    }
};
//# sourceMappingURL=Reducer.js.map