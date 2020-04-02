import { AnyAction } from 'redux';

import { Pool } from 'models/Pool';

import {
    SelectPoolAction,
    SAVE_POOL,
    SELECT_POOL,
    UPDATE_POOL
} from './Actions';

export const selectedPoolReducer = (previousState: Pool | null = null, action: AnyAction): Pool | null => {
    switch (action.type) {
        case SAVE_POOL:
        case UPDATE_POOL:
            return action.pool;
        case SELECT_POOL:
            const selectPoolAction = action as SelectPoolAction;
            return selectPoolAction.pool;
        default:
            return previousState;
    }
};