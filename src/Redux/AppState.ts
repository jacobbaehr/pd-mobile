import { createStore } from 'redux';

import { readingsReducer } from './Reducers';
import { Reading } from '../Models/Reading';

const initialAppState = {
    readings: [
        new Reading('Free Chlorine', 'free_chlorine'),
        new Reading('Total Chlorine', 'total_chlorine'),
        new Reading('pH', 'ph'),
        new Reading('Total Alkalinity', 'total_alkalinity'),
        new Reading('Calcium Hardness', 'calcium_hardness'),
        new Reading('Cyanuric Acid', 'cyanuric_acid'),
        new Reading('Copper', 'copper'),
        new Reading('Total Dissolved Solids', 'total_dissolved_solids'),
    ],
    chlorineFormula: '4 - free_chlorine'
};

export const store = createStore(readingsReducer, initialAppState);

export const dispatch = store.dispatch;
