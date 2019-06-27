"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Realm = require("realm");
const LogEntry_1 = require("models/logs/LogEntry");
const Pool_1 = require("models/Pool");
const Migrator_1 = require("./Migrator");
class Database {
}
/**
 * Initializes the Realm instance for the app. Also takes the liberty of running version-checks and
 * pre-populating or migrating any necessary data. Maybe that should be de-coupled... meh.
 */
Database.prepare = () => __awaiter(this, void 0, void 0, function* () {
    if (Database.realm !== null && Database.realm !== undefined) {
        return Promise.resolve();
    }
    // migrate database
    // try {
    //     Migrator.runMigrations();
    // } catch (e) {
    //     console.warn(e);
    // }
    yield Realm.open(Migrator_1.Migrator.getCurrentSchemaVersion()).then((value) => {
        Database.realm = value;
        return Promise.resolve();
    }).catch((e) => {
        console.log('error openening database');
        console.error(e);
        return Promise.reject(e);
    });
});
Database.loadPools = () => {
    if (Database.realm === undefined) {
        console.error('wait on realm to load');
    }
    return Database.realm.objects(Pool_1.Pool);
};
// TODO: try/catch in case pool doesn't exist.
Database.loadPool = (object) => {
    if (Database.realm === undefined) {
        console.error('loadPool called before realm loaded');
    }
    return Database.realm.objects(Pool_1.Pool).filtered('objectId = $0', object.objectId)[0];
};
Database.saveNewPool = (pool) => {
    const realm = Database.realm;
    pool.objectId = getObjectId();
    try {
        realm.write(() => {
            realm.create(Pool_1.Pool.schema.name, {
                volume: pool.volume,
                name: pool.name,
                waterType: pool.waterType,
                objectId: pool.objectId
            });
        });
    }
    catch (e) {
        console.log(e);
        console.error('couldnt save it');
    }
    return pool;
};
Database.saveNewLogEntry = (entry) => __awaiter(this, void 0, void 0, function* () {
    const realm = Database.realm;
    try {
        realm.write(() => {
            const object = realm.create(LogEntry_1.LogEntry.schema.name, {
                objectId: entry.objectId,
                poolId: entry.poolId,
                readingEntries: entry.readingEntries,
                treatmentEntries: entry.treatmentEntries,
                ts: entry.ts,
                recipeId: entry.recipeId
            });
            return Promise.resolve();
        });
    }
    catch (e) {
        console.log(e);
        console.error('couldnt save it');
        return Promise.reject('error saving entry');
    }
});
Database.loadLogEntriesForPool = (poolId) => {
    const realm = Database.realm;
    return realm.objects(LogEntry_1.LogEntry).filtered(`poolId = "${poolId}"`);
};
Database.deletePool = (poolObj) => __awaiter(this, void 0, void 0, function* () {
    const realm = Database.realm;
    console.log(poolObj, 'here');
    try {
        realm.write(() => {
            realm.delete(poolObj);
            return Promise.resolve();
        });
        // realm.removeListener('change',Database.loadPools)
    }
    catch (e) {
        console.log(e);
        console.error('couldnt delete it');
        return Promise.reject(e);
    }
});
Database.updatePool = (updatedPool) => {
    const realm = Database.realm;
    try {
        realm.write(() => {
            realm.create(Pool_1.Pool.schema.name, {
                objectId: updatedPool.objectId,
                volume: updatedPool.volume,
                name: updatedPool.name,
                waterType: updatedPool.waterType
            }, true);
        });
    }
    catch (e) {
        console.log(e);
    }
};
// Very unsafely commits the provided changes to the Realm store. This is the pattern Realm makes us use,
// it's unfortunately not async.
Database.commitUpdates = (updates) => {
    if (Database.realm === undefined) {
        console.error('commitUpdates called before realm loaded');
    }
    const realm = Database.realm;
    realm.write(() => {
        updates();
    });
};
exports.Database = Database;
const getObjectId = () => {
    return Math.random().toString(36).slice(2);
};
//# sourceMappingURL=Database.js.map