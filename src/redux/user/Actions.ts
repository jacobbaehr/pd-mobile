import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { User } from 'models/User';
import { AppState } from 'redux/AppState';

export const SAVE_USER = 'user/SAVE_USER';
export const UPDATE_USER = 'user/UPDATE_USER';
export const DELETE_USER = 'user/DELETE_USER';
export const HYDRATE_USER = 'user/HYDRATE_USER';

export interface SaveUserAction {
    type: typeof SAVE_USER;
    payload: User;
}

export const saveUserAction = (user: User): ThunkAction<Promise<SaveUserAction>, AppState, null, SaveUserAction> => {
    return async (dispatch: Dispatch<any>) => {
        // save user to persistent storage

        // update app state with user
        const action = makeSaveUserAction(user);
        return dispatch(action);
    };
};

const makeSaveUserAction = (user: User): SaveUserAction => {
    return {
        type: SAVE_USER,
        payload: user
    };
};

export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: User;
}

export const updateUserAction = (user: User): ThunkAction<Promise<UpdateUserAction>, null, null, UpdateUserAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<UpdateUserAction> => {
        // update user in persistent storage

        return dispatch(makeUpdateUserAction(user));
    };
};

const makeUpdateUserAction = (user: User): UpdateUserAction => {
    return {
        type: UPDATE_USER,
        payload: user
    };
};

export interface DeleteUserAction {
    type: typeof DELETE_USER;
    payload: User;
}

export const deleteUserAction = (user: User): ThunkAction<Promise<DeleteUserAction>, null, null, DeleteUserAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<DeleteUserAction> => {
        // Delete user in persistent storage

        return dispatch(makeDeleteUserAction(user));
    };
};

const makeDeleteUserAction = (user: User): DeleteUserAction => {
    return {
        type: DELETE_USER,
        payload: user
    };
};

export interface HydrateUserAction {
    type: typeof HYDRATE_USER;
    payload: User;
}

export const hydrateUserAction = (user: User): HydrateUserAction => {
    const action = makeHydrateUserAction(user);
    return action;
};

const makeHydrateUserAction = (user: User): HydrateUserAction => {
    return {
        type: HYDRATE_USER,
        payload: user
    };
};

export type UserActionsTypes = SaveUserAction | UpdateUserAction | DeleteUserAction | HydrateUserAction;