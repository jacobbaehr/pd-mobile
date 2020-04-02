import { Reading } from './Reading';
import { Treatment } from './Treatment';

/**
 * Represents the instructions for a pool treatment
 */
export class Recipe {
    // The user-visible name of the recipe (ideally, should be unique)
    name!: string;

    // A brief description of this recipe
    description!: string;

    // An ID that uniquely identifies this recipe
    objectId!: string;

    // All the inputs to this recipe
    readings!: Reading[];

    // All the outputs to this recipe
    treatments!: Treatment[];

    // For Realm purposes
    static schema = {
        name: 'Recipe',
        primaryKey: 'objectId',
        properties: {
            name: 'string',
            description: 'string',
            objectId: 'string',
            readings: 'Reading[]',
            treatments: 'Treatment[]'
        }
    };

    static make(name: string, description: string, readings: Reading[], treatments: Treatment[]): Recipe {
        let recipe = new Recipe();
        recipe.name = name;
        recipe.description = description;
        // TODO: verify that this works for to-many relationships in Realm.
        recipe.readings = readings;
        recipe.treatments = treatments;
        return recipe;
    }
}
