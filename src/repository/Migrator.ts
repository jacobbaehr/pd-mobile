import Realm from 'realm';
import { LogEntry } from '~/models/logs/LogEntry';
import { ReadingEntry } from '~/models/logs/ReadingEntry';
import { TreatmentEntry } from '~/models/logs/TreatmentEntry';
import { Pool } from '~/models/Pool';
import { TargetRangeOverride } from '~/models/Pool/TargetRangeOverride';

/**
 * List of schemas for the Realm database. This array should be updated every
 * time there is a change to the data model.
 */
export const schemas = [
    {
        schema: [Pool.schema, LogEntry.schema, ReadingEntry.schema, TreatmentEntry.schema, TargetRangeOverride.schema],
        schemaVersion: 0,
    },
];

/**
 * Class that handles Realm migrations when Realm is loaded on app start.
 */
export class Migrator {
    /** Run each migration sequentially. */
    public static runMigrations() {
        let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
        while (nextSchemaIndex < schemas.length) {
            const migratedRealm = new Realm(schemas[nextSchemaIndex++]);
            migratedRealm.close();
        }
    }

    /** Get the latest schema from the schema list */
    public static getCurrentSchemaVersion(): Realm.Configuration {
        return schemas[schemas.length - 1];
    }
}
