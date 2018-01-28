/**
 * Represents an action that can be taken during performance of a recipe, and includes
 * a formula that accepts the recipe inputs as parameters and returns whether the action
 * needs to be taken.
 */
export class Output {
    // The output's user-visible name
    name: string;

    // The output's variable name, for use in subsequent output formulas in the same recipe
    variableName: string;

    // An ID that uniquely identifies this input
    objectId: string;

    // The javascript formula that determines how much (if any) of the output is necessary
    formula: string;

    // For Realm purposes
    static schema = {
        name: 'Output',
        primaryKey: 'objectId',
        properties: {
            name: 'string',
            variableName: 'string',
            formula: 'string',
            objectId: 'string'
        }
    };

    static make(name: string, variableName: string, formula: string, objectId: string): Output {
        let output = new Output();
        output.name = name;
        output.variableName = variableName;
        output.formula = formula;
        return output;
    }
}
