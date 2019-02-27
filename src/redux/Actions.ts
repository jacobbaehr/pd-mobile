import { AnyAction } from 'redux';

import { Recipe } from 'models/recipe/Recipe';
import { Pool } from 'models/Pool';
import { Database } from 'repository/Database';
import { Reading } from 'models/recipe/Reading';

export const RECORD_INPUT = 'RECORD_INPUT';
export const SET_FORMULA = 'SET_FORMULA';
export const SAVE_POOL = 'SAVE_POOL';
export const SELECT_POOL = 'SELECT_POOL';
export const SELECT_RECIPE = 'SELECT_RECIPE';
export const UPDATE_POOL = 'UPDATE_POOL';

export interface RecordReadingAction extends AnyAction {
    type: string;
    value: number;
    reading: Reading;
}

export const recordInput = (reading: Reading, value: number): RecordReadingAction => {
    return {
        type: RECORD_INPUT,
        value,
        reading
    };
};

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

export interface SelectRecipeAction extends AnyAction {
    recipe: Recipe;
}

// Sets the currently selected recipe
export const selectRecipe = (recipe: Recipe): SelectRecipeAction => {
    return {
        type: SELECT_RECIPE,
        recipe
    };
};

export interface DeletePoolAvtion extends AnyAction {

}
