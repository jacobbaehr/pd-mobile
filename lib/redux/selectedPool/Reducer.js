"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actions_1 = require("./Actions");
exports.selectedPoolReducer = (previousState = null, action) => {
    switch (action.type) {
        case Actions_1.SAVE_POOL:
        case Actions_1.UPDATE_POOL:
            return action.pool;
        case Actions_1.SELECT_POOL:
            const selectPoolAction = action;
            return selectPoolAction.pool;
        default:
            return previousState;
    }
};
//# sourceMappingURL=Reducer.js.map