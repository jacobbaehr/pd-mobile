import { AnyAction } from 'redux';

import {
    RecordInputAction,
    SavePoolAction,
    SelectPoolAction,
    RECORD_INPUT,
    SAVE_POOL,
    SELECT_POOL,
    SELECT_RECIPE,
    UPDATE_POOL,
    UpdatePoolAction,
    SelectRecipeAction} from './Actions';
import { AppState } from './AppState';
import { InputEntry } from '../models/recipe/InputEntry';
import { OutputEntry } from '../models/recipe/OutputEntry';


// Reducer that modifies the app state in response to a SetReadingAction.
export const readingsReducer = (previousState: AppState, action: AnyAction): AppState => {

    switch(action.type) {
        case RECORD_INPUT:
            const recordInputAction = action as RecordInputAction;
            let newInputs: InputEntry[] = [];

            let inputAlreadyRecorded = false;
            previousState.inputs.forEach(r => {
                if (r.inputID === recordInputAction.inputID) {
                    newInputs.push(InputEntry.make(recordInputAction.inputID, recordInputAction.value));
                    inputAlreadyRecorded = true;
                } else {
                    newInputs.push(r);
                }
            });
            if (!inputAlreadyRecorded) {
                newInputs.push(InputEntry.make(recordInputAction.inputID, recordInputAction.value));
            }
            return {
                ...previousState,
                inputs: newInputs
            };
        case SAVE_POOL:
            const savePoolAction = action as SavePoolAction;
            return {
                ...previousState,
                poolsLastUpdated: previousState.poolsLastUpdated + 1
            }
        case UPDATE_POOL:
            const updatePoolAction = action as UpdatePoolAction;
            return {
                ...previousState,
                selectedPool: action.pool

            }
        case SELECT_POOL:
            const selectPoolAction = action as SelectPoolAction;
            const selectedPool = selectPoolAction.pool ? selectPoolAction.pool : undefined;
            return {
                ...previousState,
                selectedPool
            };
        case SELECT_RECIPE:
            const selectRecipeAction = action as SelectRecipeAction;
            return {
                ...previousState,
                recipeId: selectRecipeAction.recipe.objectId
            }
        default:
            return previousState;
    }
}
