import { createStore } from 'redux';

import { readingsReducer } from './Reducers';
import { Reading } from '../Models/Reading';

const initialAppState = {
    readings: [
        new Reading('Free Chlorine', 'chlorine'),
        new Reading('pH', 'pH'),
        new Reading('Total Alkalinity', 'TA')
    ]
};

export const store = createStore(readingsReducer, initialAppState);

export const dispatch = store.dispatch;