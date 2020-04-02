import { AnyAction } from 'redux';

import { ReadingEntry } from '~/models/logs/ReadingEntry';

import { RecordReadingAction, RECORD_INPUT } from './Actions';

export const readingEntriesReducer = (
    previousState: ReadingEntry[] = [],
    action: AnyAction,
): ReadingEntry[] => {
    switch (action.type) {
        case RECORD_INPUT:
            const recordReadingAction = action as RecordReadingAction;
            const newInputs: ReadingEntry[] = [];

            let inputAlreadyRecorded = false;
            previousState.forEach((r) => {
                if (r.readingId === recordReadingAction.inputID) {
                    newInputs.push(
                        ReadingEntry.make(
                            recordReadingAction.reading,
                            recordReadingAction.value,
                        ),
                    );
                    inputAlreadyRecorded = true;
                } else {
                    newInputs.push(r);
                }
            });
            if (!inputAlreadyRecorded) {
                newInputs.push(
                    ReadingEntry.make(
                        recordReadingAction.reading,
                        recordReadingAction.value,
                    ),
                );
            }
            return newInputs;
        default:
            return previousState;
    }
};
