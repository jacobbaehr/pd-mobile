import { AnyAction } from 'redux';

import { Reading } from 'models/recipe/Reading';

export const RECORD_INPUT = 'RECORD_INPUT';

export interface RecordReadingAction extends AnyAction {
    type: string;
    value: number;
    reading: Reading;
}

export const recordInput = (reading: Reading, value: number): RecordReadingAction => {
    return {
        type: RECORD_INPUT,
        value,
        reading
    };
};