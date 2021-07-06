/**
 * Represents a reading or observation to be taken during performance of a recipe
 */
export interface Reading {
    // The input's user-visible name
    name: string;

    // The input's variable name for use in the output formulas
    var: string;

    // Most of these will be ReadingType.number
    type: ReadingType;

    // The units.
    units: string | null;

    // The default value:
    defaultValue: number;

    // To enable the slider:
    sliderMin: number;
    sliderMax: number;
    decimalPlaces: number;

    // The ideal values
    idealMax: number | null;
    idealMin: number | null;

    // Whether the slider is enabled the first time the user sees this formula
    isDefaultOn: boolean;
}

// export type ReadingType = 'number';
export type ReadingType = string;
