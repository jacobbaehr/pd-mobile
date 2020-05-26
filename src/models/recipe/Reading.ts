/**
 * Represents a reading or observation to be taken during performance of a recipe
 */
export interface Reading {
    // The input's user-visible name
    name: string;

    // The input's variable name for use in the output formulas
    variableName: string;

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

    // This enables data-collection across recipes. For instance, if you want to plot your pool's free chlorine on a graph,
    // but you switched what recipe you used last week, you'll still be able to see all of the readings on 1 graph if the
    // reference id for the free chlorine reading is set correctly on both recipes.
    referenceId: string;
}

export type ReadingType = 'number';
