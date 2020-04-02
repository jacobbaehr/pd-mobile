/**
 * Represents an action that can be taken during performance of a recipe, and includes
 * a formula that accepts the recipe inputs as parameters and returns whether the action
 * needs to be taken.
 */
export class Treatment {
    // The treatment's user-visible name
    name!: string;

    // The treatment's variable name, for use in subsequent treatment formulas in the same recipe
    variableName!: string;

    // An ID that uniquely identifies this input
    objectId!: string;

    // The javascript formula that determines how much (if any) of the treatment is necessary
    formula!: string;

    // For Realm purposes
    static schema = {
        name: 'Treatment',
        primaryKey: 'objectId',
        properties: {
            name: 'string',
            variableName: 'string',
            formula: 'string',
            objectId: 'string'
        }
    };

    static make(name: string, variableName: string, formula: string, objectId: string): Treatment {
        let treatment = new Treatment();
        treatment.name = name;
        treatment.variableName = variableName;
        treatment.formula = formula;
        return treatment;
    }
}
