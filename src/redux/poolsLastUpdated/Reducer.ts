import { AnyAction } from 'redux';

import { SavePoolAction, SAVE_POOL } from 'redux/selectedPool/Actions';

export const poolsLastUpdatedReducer = (previousState: number = 0, action: AnyAction): number => {
    switch (action.type) {
        case SAVE_POOL:
            const savePoolAction = action as SavePoolAction;
            return previousState + 1;
        default:
            return previousState;
    }
};