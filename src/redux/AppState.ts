import { createStore } from 'redux';

import { readingsReducer } from './Reducers';
import { ReadingEntry } from '../models/logs/ReadingEntry';
import { TreatmentEntry } from '../models/logs/TreatmentEntry';
import { Pool } from '../models/Pool';

// Describes the shape of the application redux state.
export interface AppState {
    // All of the readings that a user has recorded
    readingEntries: ReadingEntry[];

    // All of the outputs currently perscribed
    outputs: TreatmentEntry[];

    // The currently selected swimming pool, if any
    selectedPool?: Pool;

    // The currently selected recipe, if any
    recipeId?: string;

    // This increments whenever we update the list of pools
    poolsLastUpdated: number;
}

const initialAppState: AppState = {
    readingEntries: [],
    outputs: [],
    poolsLastUpdated: 0,
    recipeId: '002_initial_big3'
};

export const store = createStore(readingsReducer, initialAppState);

export const dispatch = store.dispatch;
