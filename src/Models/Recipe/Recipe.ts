import { Input } from './Input';
import { Output } from './Output';

/**
 * Represents the instructions for a pool treatment
 */
export class Recipe {
    // The user-visible name of the recipe (ideally, should be unique)
    name: string;

    // A brief description of this recipe
    description: string;

    // An ID that uniquely identifies this recipe
    objectId: string;

    // All the inputs to this recipe
    inputs: Input[];

    // All the outputs to this recipe
    outputs: Output[];

    // For Realm purposes
    static schema = {
        name: 'Recipe',
        primaryKey: 'objectId',
        properties: {
            name: 'string',
            description: 'string',
            objectId: 'string',
            inputs: 'Input[]',
            outputs: 'Output[]'
        }
    };

    static make(name: string, description: string, inputs: Input[], outputs: Output[]): Recipe {
        let recipe = new Recipe();
        recipe.name = name;
        recipe.description = description;
        // TODO: verify that this works for to-many relationships in Realm.
        recipe.inputs = inputs;
        recipe.outputs = outputs;
        return recipe;
    }

    static fromJSON(json: string) {
        
    }
}
