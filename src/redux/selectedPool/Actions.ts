import { AnyAction } from 'redux';

import { Pool } from 'models/Pool';
import { Database } from 'repository/Database';

export const SAVE_POOL = 'SAVE_POOL';
export const SELECT_POOL = 'SELECT_POOL';
export const UPDATE_POOL = 'UPDATE_POOL';

export interface SavePoolAction extends AnyAction {
    pool: Pool;
}

// Saves the pool to the database, tells Redux about it.
export const saveNewPool = (pool: Pool): SavePoolAction => {
    Database.saveNewPool(pool);
    return {
        type: SAVE_POOL,
        pool: pool
    };
};

export interface UpdatePoolAction extends AnyAction {
    pool: Pool;
}

export const updatePool = (updatedPool: Pool): UpdatePoolAction => {
    Database.updatePool(updatedPool);
    return {
        type: UPDATE_POOL,
        pool: updatedPool
    };
};

export interface SelectPoolAction extends AnyAction {
    pool?: Pool;
}

// Sets the currently selected pool id
export const selectPool = (pool?: Pool): SelectPoolAction => {
    return {
        type: SELECT_POOL,
        pool
    };
};