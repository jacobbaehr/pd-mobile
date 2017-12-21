/**
 * Represents a swimming pool (duh).
 */
export class Pool {
    // The pool's volume, in gallons.
    readonly poolVolume: number;

    // The pool's user-visible name
    readonly poolName: string;

    // An ID that uniquely identifies this pool
    readonly id: string;

    // For Realm purposes
    static schema = {
        name: 'Pool',
        primaryKey: 'objectId',
        properties: {
            poolVolume: 'double?',
            poolName: 'string?',
            objectId: 'string?'
        }
    };

    constructor(volume: number, name: string, id: string = '-1') {
        this.poolVolume = volume;
        this.poolName = name;
        // id will get reset later by the database wrapper
        this.id = id;
    };
}
