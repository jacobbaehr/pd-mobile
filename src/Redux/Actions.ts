import { AnyAction } from 'redux';

export const SET_READING = 'SET_READING';
export const SET_FORMULA = 'SET_FORMULA';

export interface SetReadingAction extends AnyAction {
    type: string;
    value?: number;
    identifier: string;
}

export const setReading = (readingID: string, value?: number): SetReadingAction => {
    return {
        type: SET_READING,
        value: value,
        identifier: readingID
    };
}

export interface SetFormulaAction extends AnyAction {
    value?: string;
}

export const setFormula = (value?: string): SetFormulaAction => {
    return { 
        type: SET_FORMULA,
        value: value
    };
}

