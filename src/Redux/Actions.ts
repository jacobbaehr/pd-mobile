import { AnyAction } from 'redux';

import { Pool } from '../Models/Pool';
import { Recipe } from '../Models/Recipe/Recipe';
import { Database } from '../Models/Database';

export const RECORD_INPUT = 'RECORD_INPUT';
export const SET_FORMULA = 'SET_FORMULA';
export const SAVE_POOL = 'SAVE_POOL';
export const SELECT_POOL = 'SELECT_POOL';
export const SELECT_RECIPE = 'SELECT_RECIPE';

export interface RecordInputAction extends AnyAction {
    type: string;
    value: number;
    inputID: string;
}

export const recordInput = (inputID: string, value: number): RecordInputAction => {
    return {
        type: RECORD_INPUT,
        value: value,
        inputID: inputID
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

export interface SelectPoolAction extends AnyAction { 
    pool: Pool;
}

// Sets the currently selected pool id
export const selectPool = (pool: Pool): SelectPoolAction => {
    return {
        type: SELECT_POOL,
        pool
    };
}

export interface SelectRecipeAction extends AnyAction {
    recipe: Recipe;
}

// Sets the currently selected recipe
export const selectRecipe = (recipe: Recipe): SelectRecipeAction => {
    return {
        type: SELECT_RECIPE,
        recipe
    }
}
