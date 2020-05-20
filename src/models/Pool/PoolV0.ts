import { WaterTypeValue } from "./WaterType";
import { RecipeKey } from "../recipe/RecipeKey";

/**
 * Represents a swimming pool (duh).
 */
export class PoolV0 {
    // The pool's volume, in gallons.
    gallons!: number;

    // The pool's user-visible name
    name!: string;

    // An ID that uniquely identifies this pool
    objectId!: string;

    // The recipe id + the ts it was last updated
    // recipeKey?: RecipeKey;

    // The pool water type
    waterType!: WaterTypeValue;

    // For Realm purposes
    static schema = {
        name: 'Pool',
        primaryKey: 'objectId',
        properties: {
            gallons: 'double',
            name: 'string',
            objectId: 'string',
            recipeKey: 'string?',
            waterType: 'string'
        }
    };

    static make(name: string, gallons: number, waterType: WaterTypeValue, objectId?: string): PoolV0 {
        const pool = new PoolV0();
        pool.name = name;
        pool.gallons = gallons;
        pool.waterType = waterType;
        // yuck:
        // pool.recipeKey = recipeKey;
        if (objectId) {
            pool.objectId = objectId;
        }
        return pool;
    }
}
