"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool_1 = require("models/Pool");
const LogEntry_1 = require("models/logs/LogEntry");
const ReadingEntry_1 = require("models/logs/ReadingEntry");
const TreatmentEntry_1 = require("models/logs/TreatmentEntry");
/**
 * List of schemas for the Realm database. This array should be updated every
 * time there is a change to the data model.
 */
exports.schemas = [
    { schema: [Pool_1.Pool, LogEntry_1.LogEntry, ReadingEntry_1.ReadingEntry, TreatmentEntry_1.TreatmentEntry], schemaVersion: 0 }
];
/**
 * Class that handles Realm migrations when Realm is loaded on app start.
 */
class Migrator {
    /** Run each migration sequentially. */
    static runMigrations() {
        let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
        while (nextSchemaIndex < exports.schemas.length) {
            const migratedRealm = new Realm(exports.schemas[nextSchemaIndex++]);
            migratedRealm.close();
        }
    }
    /** Get the latest schema from the schema list */
    static getCurrentSchemaVersion() {
        return exports.schemas[exports.schemas.length - 1];
    }
}
exports.Migrator = Migrator;
//# sourceMappingURL=Migrator.js.map