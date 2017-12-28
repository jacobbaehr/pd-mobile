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

    // For Realm purposes
    static schema = {
        name: 'Pool',
        primaryKey: 'objectId',
        properties: {
            volume: 'double',
            name: 'string',
            objectId: 'string'
        }
    };

    static make(name: string, volume: number): Pool {
        let pool = new Pool();
        pool.name = name;
        pool.volume = volume;
        return pool;
    }
}
