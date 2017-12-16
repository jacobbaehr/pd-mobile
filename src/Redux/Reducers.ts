import { AnyAction } from 'redux';

import { SetReadingAction, SetFormulaAction, SET_FORMULA, SET_READING } from './Actions';
import { Reading } from '../Models/Reading';

// Describes the shape of the application redux state.
export interface AppState {
    // All of the readings that a user has taken
    readings: Reading[],

    // TODO: make this an array of all treatment calculations
    chlorineFormula: string
};

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
                readings: newReadings,
                chlorineFormula: previousState.chlorineFormula
            };
        case SET_FORMULA:
            const setFormulaAction = action as SetFormulaAction;
            return {
                readings: previousState.readings,
                chlorineFormula: action.value
            };
        default:
            return previousState;
    }
}
