import { createStore } from 'redux';

import { readingsReducer, Reading } from './Reducers';

const initialAppState = {
    readings: [
        new Reading('Free Chlorine', 'chlorine'),
        new Reading('pH', 'pH'),
        new Reading('Total Alkalinity', 'TA')
    ]
};

export const store = createStore(readingsReducer, initialAppState);

export const dispatch = store.dispatch;