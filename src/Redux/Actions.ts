import { AnyAction } from 'redux';

import { Pool } from '../Models/Pool';
import { Database } from '../Models/Database';

export const SET_READING = 'SET_READING';
export const SET_FORMULA = 'SET_FORMULA';
export const SAVE_POOL = 'SAVE_POOL';

export interface SetReadingAction extends AnyAction {
    type: string;
    value?: number;
    identifier: string;
}

export const setReading = (readingID: string, value?: number): SetReadingAction => {
    return {
        type: SET_READING,
        value: value,
        identifier: readingID
    };
}

export interface SetFormulaAction extends AnyAction {
    value?: string;
}

export const setFormula = (value?: string): SetFormulaAction => {
    return { 
        type: SET_FORMULA,
        value: value
    };
}

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
}