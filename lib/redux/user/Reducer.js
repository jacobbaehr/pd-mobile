"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actions_1 = require("./Actions");
exports.userReducer = (previousState = null, action) => {
    switch (action.type) {
        case Actions_1.HYDRATE_USER:
        case Actions_1.SAVE_USER:
        case Actions_1.UPDATE_USER:
            return action.payload;
        case Actions_1.DELETE_USER:
            return null;
        default:
            return previousState;
    }
};
//# sourceMappingURL=Reducer.js.map