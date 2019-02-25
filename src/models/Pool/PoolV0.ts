/**
 * Represents a swimming pool (duh).
 */
export class PoolV0 {
    // The pool's volume, in gallons.
    volume!: number;

    // The pool's user-visible name
    name!: string;

    // An ID that uniquely identifies this pool
    objectId!: string;

    // The objectId of the last recipe selected for this pool, if any
    recipeId?: string;

    // The pool water type
    waterType!: string;

    // For Realm purposes
    static schema = {
        name: 'Pool',
        primaryKey: 'objectId',
        properties: {
            volume: 'double',
            name: 'string',
            objectId: 'string',
            recipeId: 'string?',
            waterType: 'string'
        }
    };

    static make(name: string, volume: number, waterType: string): PoolV0 {
        const pool = new PoolV0();
        pool.name = name;
        pool.volume = volume;
        pool.waterType = 'Chlorine';
        return pool;
    }
}
