import { AnyAction } from 'redux';

import { SAVE_POOL, SELECT_POOL, UPDATE_POOL } from '~/redux/selectedPool/Actions';

export const poolsLastUpdatedReducer = (previousState: number = 0, action: AnyAction): number => {
    switch (action.type) {
        case SAVE_POOL:
        case SELECT_POOL:
        case UPDATE_POOL:
            return previousState + 1;
        default:
            return previousState;
    }
};
