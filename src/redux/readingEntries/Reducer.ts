import { AnyAction } from 'redux';

import { ReadingEntry } from '~/models/logs/ReadingEntry';

import { RecordReadingAction, RECORD_INPUT, CLEAR_READINGS } from './Actions';

export const readingEntriesReducer = (
    previousState: ReadingEntry[] = [],
    action: AnyAction,
): ReadingEntry[] => {
    switch (action.type) {
        case RECORD_INPUT:
            const recordReadingAction = action as RecordReadingAction;
            const entries = previousState;
            let readingIsNew = true;
            entries.forEach(r => {
                if (r.var === recordReadingAction.reading.var) {
                    r.value = recordReadingAction.value;
                    readingIsNew = false;
                }
            });
            if (readingIsNew) {
                entries.push(ReadingEntry.make(
                    recordReadingAction.reading,
                    recordReadingAction.value,
                ));
            }
            return entries;
        case CLEAR_READINGS:
            return [];
        default:
            return previousState;
    }
};
