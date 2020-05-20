import { AnyAction } from 'redux';

import { PickerState } from './PickerState';

export const UPDATE_PICKER_STATE = 'UPDATE_PICKER_STATE';

export interface UpdatePickerStateAction extends AnyAction {
    pickerState: PickerState | null;
}

export const updatePickerState = (pickerState: PickerState | null): UpdatePickerStateAction => {
    return {
        type: UPDATE_PICKER_STATE,
        pickerState
    };
};
