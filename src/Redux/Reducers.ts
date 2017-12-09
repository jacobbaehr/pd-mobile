import { AnyAction } from 'redux';

import { SetReadingAction } from './Actions';
import { Reading } from '../Models/Reading';

// Describes the shape of the application redux state.
export interface AppState {
    // All of the readings that a user has taken
    readings: Reading[]
};

// Reducer that modifies the app state in response to a SetReadingAction.
export const readingsReducer = (previousState: AppState, action: AnyAction): AppState => {

    // Assume the action is of type SET_READING
    const setReadingAction = action as SetReadingAction;
    let newReadings: Reading[] = [];
    
    previousState.readings.forEach(r => {
        if (r.identifier === setReadingAction.identifier) {
            newReadings.push(new Reading(r.name, r.identifier, setReadingAction.value));
        } else {
            newReadings.push(r);
        }
    });

    return { readings: newReadings };
}
