/**
 * Represents a reading or observation to be taken during performance of a recipe
 */
export class Reading {
    // The input's user-visible name
    name!: string;

    // The input's variable name for use in the output formulas
    variableName!: string;

    // An ID that uniquely identifies this input
    objectId!: string;

    // For Realm purposes
    static schema = {
        name: 'Reading',
        primaryKey: 'objectId',
        properties: {
            name: 'string',
            variableName: 'string',
            objectId: 'string',
        },
    };

    static make(
        name: string,
        variableName: string,
        _objectId: string,
    ): Reading {
        let reading = new Reading();
        reading.name = name;
        reading.variableName = variableName;
        return reading;
    }
}
