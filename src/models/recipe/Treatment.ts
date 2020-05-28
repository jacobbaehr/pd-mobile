/**
 * Represents an action that can be taken during performance of a recipe, and includes
 * a formula that accepts the recipe inputs as parameters and returns whether the action
 * needs to be taken.
 */
export interface Treatment {
    // The treatment's user-visible name
    name: string;

    // The treatment's variable name, for use in subsequent treatment formulas in the same recipe
    variableName: string;

    // An ID that uniquely identifies this input
    referenceId?: string;

    // The javascript formula that determines how much (if any) of the treatment is necessary
    formula: string;
}
