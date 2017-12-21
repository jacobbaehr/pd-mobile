import { AnyAction } from 'redux';

import { SetReadingAction, SetFormulaAction, SavePoolAction, SET_FORMULA, SET_READING, SAVE_POOL } from './Actions';
import { AppState } from './AppState';
import { Reading } from '../Models/Reading';


// Reducer that modifies the app state in response to a SetReadingAction.
export const readingsReducer = (previousState: AppState, action: AnyAction): AppState => {

    switch(action.type) {
        case SET_READING:
            const setReadingAction = action as SetReadingAction;
            let newReadings: Reading[] = [];
            
            previousState.readings.forEach(r => {
                if (r.identifier === setReadingAction.identifier) {
                    newReadings.push(new Reading(r.name, r.identifier, setReadingAction.value));
                } else {
                    newReadings.push(r);
                }
            });
            return {
                ...previousState,
                readings: newReadings
            };
        case SET_FORMULA:
            const setFormulaAction = action as SetFormulaAction;
            return {
                ...previousState,
                chlorineFormula: action.value
            };
        case SAVE_POOL:
            const savePoolAction = action as SavePoolAction;
            return {
                ...previousState,
                poolsLastUpdated: previousState.poolsLastUpdated + 1
            }
        default:
            return previousState;
    }
}
