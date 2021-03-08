export interface EntryShapeValues {
    length: string;
    width: string;
    deepest: string;
    shallowest: string;
}

// Validate all the shape fields
export const isCompletedField = (shape: EntryShapeValues) => Object.keys(shape).every((sp) => !!shape[sp]);
