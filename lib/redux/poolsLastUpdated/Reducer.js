"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actions_1 = require("redux/selectedPool/Actions");
exports.poolsLastUpdatedReducer = (previousState = 0, action) => {
    switch (action.type) {
        case Actions_1.SAVE_POOL:
            const savePoolAction = action;
            return previousState + 1;
        default:
            return previousState;
    }
};
//# sourceMappingURL=Reducer.js.map