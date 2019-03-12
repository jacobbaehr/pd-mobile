import { DELETE_USER, SAVE_USER, UserActionsTypes, UPDATE_USER } from './Actions';

export const userReducer = (previousState: any = null, action: UserActionsTypes): any => {
    switch (action.type) {
        case SAVE_USER:
        case UPDATE_USER:
            return action.payload;
        case DELETE_USER:
            return null;
        default:
            return previousState;
    }
};