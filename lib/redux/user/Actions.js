"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAVE_USER = 'user/SAVE_USER';
exports.UPDATE_USER = 'user/UPDATE_USER';
exports.DELETE_USER = 'user/DELETE_USER';
exports.HYDRATE_USER = 'user/HYDRATE_USER';
exports.saveUserAction = (user) => {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        // save user to persistent storage
        // update app state with user
        const action = makeSaveUserAction(user);
        return dispatch(action);
    });
};
const makeSaveUserAction = (user) => {
    return {
        type: exports.SAVE_USER,
        payload: user
    };
};
exports.updateUserAction = (user) => {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        // update user in persistent storage
        return dispatch(makeUpdateUserAction(user));
    });
};
const makeUpdateUserAction = (user) => {
    return {
        type: exports.UPDATE_USER,
        payload: user
    };
};
exports.deleteUserAction = (user) => {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        // Delete user in persistent storage
        return dispatch(makeDeleteUserAction(user));
    });
};
const makeDeleteUserAction = (user) => {
    return {
        type: exports.DELETE_USER,
        payload: user
    };
};
exports.hydrateUserAction = (user) => {
    const action = makeHydrateUserAction(user);
    return action;
};
const makeHydrateUserAction = (user) => {
    return {
        type: exports.HYDRATE_USER,
        payload: user
    };
};
//# sourceMappingURL=Actions.js.map