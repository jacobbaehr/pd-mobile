import { AnyAction } from 'redux';

export const SET_READING = 'SET_READING';

export interface SetReadingAction extends AnyAction {
    type: string;
    value: number;
    identifier: string;
}

export const setReading = (readingID: string, value: number): SetReadingAction => {
    return {
        type: SET_READING,
        value: value,
        identifier: readingID
    };
}

const setReadingAction = setReading('chlorine', 4.3);