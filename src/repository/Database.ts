import * as Realm from 'realm';

import { LogEntry } from 'models/logs/LogEntry';
import { Reading } from 'models/recipe/Reading';
import { Recipe } from 'models/recipe/Recipe';
import { Treatment } from 'models/recipe/Treatment';
import { Pool } from 'models/Pool';
import { initialData } from 'InitialData';

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

        await Realm.open(Migrator.getCurrentSchemaVersion()).then((value: Realm) => {
            Database.realm = value;
            // Database.createInitialRecipes();
            return Promise.resolve();
        }).catch((e: any) => {
            console.log('error openening database');
            console.error(e);
            return Promise.reject(e);
        });
    }

    static loadPools = (): Realm.Results<Pool> => {
        if (Database.realm === undefined) {
            console.error('wait on realm to load');
        }
        return Database.realm.objects<Pool>(Pool);
    }

    // TODO: try/catch in case pool doesn't exist.
    static loadPool = (object: Pool): Pool => {
        if (Database.realm === undefined) {
            console.error('loadPool called before realm loaded');
        }
        return Database.realm.objects<Pool>(Pool).filtered('objectId = $0', object.objectId)[0];
    }

    static saveNewPool = (pool: Pool) => {
        const realm = Database.realm;
        pool.objectId = getObjectId();
        try {
            realm.write(() => {
                realm.create(Pool.schema.name, {
                    volume: pool.volume,
                    name: pool.name,
                    waterType: pool.waterType,
                    objectId: pool.objectId
                });
            });
        } catch (e) {
            console.log(e);
            console.error('couldnt save it');
        }
        return pool;
    }

    static saveNewLogEntry = async (entry: LogEntry) => {
        const realm = Database.realm;
        try {
            realm.write(() => {
                const object: LogEntry = realm.create(LogEntry.schema.name, {
                    objectId: entry.objectId,
                    poolId: entry.poolId,
                    readingEntries: entry.readingEntries,
                    treatmentEntries: entry.treatmentEntries,
                    ts: entry.ts
                });
                return Promise.resolve();
            });
        } catch (e) {
            console.log(e);
            console.error('couldnt save it');
            return Promise.reject('error saving entry');
        }
    }

    static loadLogEntriesForPool = (poolId: string): Realm.Results<LogEntry> => {
        const realm = Database.realm;
        return realm.objects<LogEntry>(LogEntry).filtered(`poolId = "${poolId}"`);
    }

    static deletePool = async (poolObj: Pool) => {
        const realm = Database.realm;
        console.log(poolObj, 'here');
        try {
            realm.write(() => {
                realm.delete(poolObj);
                return Promise.resolve();
            });
        // realm.removeListener('change',Database.loadPools)
        } catch (e) {
            console.log(e);
            console.error('couldnt delete it');
            return Promise.reject(e);
        }
    }

    static updatePool = (updatedPool: Pool) => {
        const realm = Database.realm;
        try {
            realm.write(() => {
                realm.create(
                    Pool.schema.name, {
                        objectId: updatedPool.objectId,
                        volume: updatedPool.volume,
                        name: updatedPool.name,
                        waterType: updatedPool.waterType
                }, true);
            });
        } catch (e) {
            console.log(e);
        }
    }

    static loadRecipes = (): Realm.Results<Recipe> => {
        if (Database.realm === undefined) {
            console.error('wait on realm to load');
        }
        return Database.realm.objects<Recipe>(Recipe);
    }

    static loadRecipe = (objectId: string): Recipe => {
        if (Database.realm === undefined) {
            console.error('loadRecipe called before realm loaded');
        }
        return Database.realm.objects<Recipe>(Recipe).filtered('objectId = $0', objectId)[0];
    }

    static createInitialRecipes = () => {
        const realm = Database.realm;
        initialData.recipes[0].readings.forEach((reading: Reading) => {
            reading.objectId = getObjectId();
        });
        initialData.recipes[0].treatments.forEach((treatment: Treatment) => {
            treatment.objectId = getObjectId();
        });
        try {
            realm.write(() => {
                realm.create(Recipe.schema.name, initialData.recipes[0]);
            });
        } catch (e) {
            console.log(e);
            //  TODO: use async-storage to check necessary version, support migrations.
            console.error('Error saving recipes');
        }
    }

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
    }
}

const getObjectId = (): string => {
    return Math.random().toString(36).slice(2);
};
