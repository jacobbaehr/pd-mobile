import Realm from 'realm';

import { LogEntry } from '~/models/logs/LogEntry';
import { Pool } from '~/models/Pool';

import { Migrator } from './Migrator';

export class Database {
    static realm: Realm;

    /**
     * Initializes the Realm instance for the app. Also takes the liberty of running version-checks and
     * pre-populating or migrating any necessary data. Maybe that should be de-coupled... meh.
     */
    static prepare = async () => {
        if (Database.realm !== null && Database.realm !== undefined) {
            return Promise.resolve();
        }

        // migrate database
        // try {
        //     Migrator.runMigrations();
        // } catch (e) {
        //     console.warn(e);
        // }
        await Realm.open(Migrator.getCurrentSchemaVersion())
            .then((value: Realm) => {
                Database.realm = value;
                return Promise.resolve();
            })
            .catch((e: any) => {
                console.log('error openening database');
                console.error(e);
                return Promise.reject(e);
            });
    };

    static loadPools = (): Realm.Collection<Pool> => {
        if (Database.realm === undefined) {
            console.error('wait on realm to load');
        }
        const results = Database.realm.objects<Pool>(Pool.schema.name);
        return results;
    };

    // TODO: try/catch in case pool doesn't exist.
    static loadPool = (object: Pool): Pool => {
        if (Database.realm === undefined) {
            console.error('loadPool called before realm loaded');
        }
        return Database.realm.objects<Pool>(Pool).filtered('objectId = $0', object.objectId)[0];
    };

    static saveNewPool = (pool: Pool) => {
        const realm = Database.realm;
        pool.objectId = getObjectId();
        try {
            realm.write(() => {
                realm.create(Pool.schema.name, {
                    gallons: pool.gallons,
                    name: pool.name,
                    waterType: pool.waterType,
                    objectId: pool.objectId,
                    recipeKey: pool.recipeKey
                });
            });
        } catch (e) {
            console.log(e);
            console.error('couldnt save it');
        }
        return pool;
    };

    static saveNewLogEntry = async (entry: LogEntry) => {
        const realm = Database.realm;
        try {
            realm.write(() => {
                const object: LogEntry = realm.create(LogEntry.schema.name, {
                    objectId: entry.objectId,
                    poolId: entry.poolId,
                    readingEntries: entry.readingEntries,
                    treatmentEntries: entry.treatmentEntries,
                    ts: entry.ts,
                    recipeKey: entry.recipeKey,
                });
                return Promise.resolve();
            });
        } catch (e) {
            console.log(e);
            console.error('couldnt save it');
            return Promise.reject('error saving entry');
        }
    };

    static loadLogEntriesForPool = (poolId: string): Realm.Collection<LogEntry> => {
        const realm = Database.realm;
        return realm.objects<LogEntry>(LogEntry.schema.name).filtered(`poolId = "${poolId}"`);
    };

    static deletePool = (pool: Pool) => {
        const realm = Database.realm;
        try {
            // We have to delete the actual realm object
            realm.write(() => {
                realm.delete(pool);
                return Promise.resolve();
            });
            // realm.removeListener('change',Database.loadPools)
        } catch (e) {
            console.log(e);
            console.error('couldnt delete it');
            return Promise.reject(e);
        }
    };

    // Why does this work?
    static updatePool = (updatedPool: Pool) => {
        const realm = Database.realm;
        try {
            realm.write(() => {
                realm.create(
                    Pool.schema.name,
                    {
                        objectId: updatedPool.objectId,
                        gallons: updatedPool.gallons,
                        name: updatedPool.name,
                        waterType: updatedPool.waterType,
                        recipeKey: updatedPool.recipeKey
                    },
                    true,
                );
            });
        } catch (e) {
            console.log(e);
        }
    };

    // Very unsafely commits the provided changes to the Realm store. This is the pattern Realm makes us use,
    // it's unfortunately not async.
    static commitUpdates = (updates: () => void) => {
        if (Database.realm === undefined) {
            console.error('commitUpdates called before realm loaded');
        }
        const realm = Database.realm;
        realm.write(() => {
            updates();
        });
    };
}

const getObjectId = (): string => {
    return Math.random().toString(36).slice(2);
};
