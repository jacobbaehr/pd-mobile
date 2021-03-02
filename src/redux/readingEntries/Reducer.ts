import { ReadingEntry } from '~/models/logs/ReadingEntry';
import { clearReadings } from '~/redux/readingEntries/Actions';

// import { AnyAction } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { recordInput } from './Actions';

export const readingEntriesReducer = createReducer([] as ReadingEntry[], (builder) => {
    builder
        .addCase(recordInput, (state, action) => {
            const { reading, value } = action.payload;
            let readingIsNew = true;

            state.forEach((r) => {
                if (r.var === reading.var) {
                    r.value = value;
                    readingIsNew = false;
                }
            });
            if (readingIsNew) {
                state.push(ReadingEntry.make(reading, value));
            }

            return state;
        })
        .addCase(clearReadings, (state) => {
            state = [];
            return state;
        });
});
