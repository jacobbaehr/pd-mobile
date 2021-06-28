import Realm from 'realm';
import { LogEntry } from '~/models/logs/LogEntry';
import { Pool, IPool } from '~/models/Pool';
import { TargetRangeOverride } from '~/models/Pool/TargetRangeOverride';

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
        try {
            Migrator.runMigrations();
        } catch (e) {
            console.warn(e);
        }
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

    static saveNewPool = (unsavedPool: IPool): IPool => {
        const realm = Database.realm;
        const pool: IPool = {
            ...unsavedPool,
        };
        try {
            realm.write(() => {
                realm.create(Pool.schema.name, {
                    gallons: pool.gallons,
                    name: pool.name,
                    waterType: pool.waterType,
                    objectId: pool.objectId,
                    recipeKey: pool.recipeKey,
                    wallType: pool.wallType,
                    email: pool.email,
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
                realm.create(LogEntry.schema.name, {
                    objectId: entry.objectId,
                    poolId: entry.poolId,
                    readingEntries: entry.readingEntries,
                    treatmentEntries: entry.treatmentEntries,
                    ts: entry.ts,
                    recipeKey: entry.recipeKey,
                    formulaName: entry.formulaName,
                    notes: entry.notes,
                });
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject('error saving entry');
        }
    };

    static loadLogEntriesForPool = (
        poolId: string,
        since_ts: number | null,
        recentFirst: boolean,
    ): Realm.Collection<LogEntry> => {
        const realm = Database.realm;
        let query = `poolId = "${poolId}"`;
        if (since_ts) {
            query += `AND ts > ${since_ts}`;
        }
        if (recentFirst) {
            query += ' SORT(ts DESC)';
        } else {
            query += ' SORT(ts ASC)';
        }

        return realm.objects<LogEntry>(LogEntry.schema.name).filtered(query);
    };

    static deletePool = (pool: IPool) => {
        const realm = Database.realm;
        try {
            // We have to delete the actual realm object
            realm.write(() => {
                const deletedPool = realm.objectForPrimaryKey<Pool>(Pool.schema.name, pool.objectId);
                if (deletedPool) {
                    realm.delete(deletedPool);
                }
            });
            return Promise.resolve();
        } catch (e) {
            console.log(e);
            console.error('couldnt delete it');
            return Promise.reject(e);
        }
    };

    static deleteLogEntry = async (logEntryId: string) => {
        const realm = Database.realm;
        try {
            // We have to delete the actual realm object
            realm.write(() => {
                const logEntry = realm.objectForPrimaryKey<LogEntry>(LogEntry.schema.name, logEntryId);
                if (logEntry) {
                    realm.delete(logEntry);
                }
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    static updatePool = (pool: Pool) => {
        const realm = Database.realm;
        try {
            realm.write(() => {
                const existingPool = realm.objectForPrimaryKey<Pool>(Pool.schema.name, pool.objectId);
                if (existingPool) {
                    existingPool.name = pool.name;
                    existingPool.gallons = pool.gallons;
                    existingPool.recipeKey = pool.recipeKey;
                    existingPool.waterType = pool.waterType;
                    existingPool.wallType = pool.wallType;
                    existingPool.email = pool.email;
                }
            });
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject('Error updating a pool');
        }
    };

    static saveNewCustomTarget = async (customTarget: TargetRangeOverride) => {
        const realm = Database.realm;
        try {
            // Delete previous values (if any)
            realm.write(() => {
                const previousOverrides = Database.realm
                    .objects<TargetRangeOverride>(TargetRangeOverride.schema.name)
                    .filtered('poolId = $0 AND var = $1', customTarget.poolId, customTarget.var);
                realm.delete(previousOverrides);
            });
            // Store some new values
            realm.write(() => {
                realm.create<TargetRangeOverride>(
                    TargetRangeOverride.schema.name,
                    {
                        objectId: customTarget.objectId,
                        poolId: customTarget.poolId,
                        var: customTarget.var,
                        min: customTarget.min,
                        max: customTarget.max,
                    },
                    Realm.UpdateMode.Modified,
                );
            });
            return Promise.resolve();
        } catch (error) {
            return Promise.reject('Error saving a customTarget');
        }
    };

    static loadCustomTargets = (poolId: string): Realm.Collection<TargetRangeOverride> => {
        const realm = Database.realm;
        const query = `poolId = "${poolId}"`;
        const data = realm.objects<TargetRangeOverride>(TargetRangeOverride.schema.name).filtered(query);
        return data;
    };

    static deleteCustomTarget = (customTarget: TargetRangeOverride) => {
        const realm = Database.realm;
        try {
            // We have to delete the actual realm object
            realm.write(() => {
                const previousOverrides = Database.realm
                    .objects<TargetRangeOverride>(TargetRangeOverride.schema.name)
                    .filtered('poolId = $0 AND var = $1', customTarget.poolId, customTarget.var);
                realm.delete(previousOverrides);
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };
}
