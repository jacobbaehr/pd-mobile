import { AnyAction } from 'redux';

import { UpdatePickerStateAction, UPDATE_PICKER_STATE } from './Actions';
import { PickerState } from './PickerState';

export const pickerStateReducer = (
    previousState: PickerState | null = null,
    action: AnyAction,
): PickerState | null => {
    switch (action.type) {
        case UPDATE_PICKER_STATE:
            const updatePickerStateAction = action as UpdatePickerStateAction;
            return updatePickerStateAction.pickerState;
        default:
            return previousState;
    }
};
