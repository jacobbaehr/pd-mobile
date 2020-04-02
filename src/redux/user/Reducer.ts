import { DELETE_USER, HYDRATE_USER, SAVE_USER, UserActionsTypes, UPDATE_USER } from './Actions';

export const userReducer = (previousState: any = null, action: UserActionsTypes): any => {
    switch (action.type) {
        case HYDRATE_USER:
        case SAVE_USER:
        case UPDATE_USER:
            return action.payload;
        case DELETE_USER:
            return null;
        default:
            return previousState;
    }
};