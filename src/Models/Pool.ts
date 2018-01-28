/**
 * Represents a swimming pool (duh).
 */
export class Pool {
    // The pool's volume, in gallons.
    volume: number;

    // The pool's user-visible name
    name: string;

    // An ID that uniquely identifies this pool
    objectId: string;

    // The objectId of the last recipe selected for this pool, if any
    recipeId?: string;

    // For Realm purposes
    static schema = {
        name: 'Pool',
        primaryKey: 'objectId',
        properties: {
            volume: 'double',
            name: 'string',
            objectId: 'string',
            recipeId: 'string?'
        }
    };

    static make(name: string, volume: number): Pool {
        let pool = new Pool();
        pool.name = name;
        pool.volume = volume;
        return pool;
    }
}
