export interface PickerState {
    key: PickerKey;
    value: string | null;
}

export type PickerKey = 'water_type' | 'chem_concentration';