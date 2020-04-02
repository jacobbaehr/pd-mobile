import { AnyAction } from 'redux';

import { TreatmentEntry } from '~/models/logs/TreatmentEntry';

export const outputsReducer = (previousState: TreatmentEntry[] = [], action: AnyAction): TreatmentEntry[] => {
    switch (action.type) {
        default:
            return previousState;
    }
};