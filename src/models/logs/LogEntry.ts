import { ReadingEntry } from './ReadingEntry';
import { TreatmentEntry } from './TreatmentEntry';
import { RecipeKey } from '../recipe/RecipeKey';

/**
 * Represents readingEntries and treatmentEntries for a given pool
 */
export class LogEntry {
    // The id of this object
    objectId!: string;

    // The objectID of the corresponding pool
    poolId!: string;

    // The timestamp, in milliseconds
    ts!: number;

    // All the readings taken
    readingEntries!: ReadingEntry[];

    // All the treatments performed
    treatmentEntries!: TreatmentEntry[];

    // The unique id of the recipe
    recipeKey!: RecipeKey;

    // Any special thoughts the user had about this log entry.
    notes?: string;

    // For Realm purposes
    static schema = {
        name: 'LogEntry',
        primaryKey: 'objectId',
        properties: {
            objectId: 'string',
            poolId: 'string',
            readingEntries: 'ReadingEntry[]',
            treatmentEntries: 'TreatmentEntry[]',
            ts: 'int',
            recipeKey: 'string',
            notes: 'string?',
        },
    };

    static make(
        objectId: string,
        poolId: string,
        ts: number,
        readingEntries: ReadingEntry[],
        treatmentEntries: TreatmentEntry[],
        recipeKey: RecipeKey,
        notes: string | null,
    ): LogEntry {
        let logEntry = new LogEntry();
        logEntry.objectId = objectId;
        logEntry.poolId = poolId;
        logEntry.ts = ts;
        logEntry.readingEntries = readingEntries;
        logEntry.treatmentEntries = treatmentEntries;
        logEntry.recipeKey = recipeKey;
        if (notes && notes.length > 0) {
            logEntry.notes = notes;
        }
        return logEntry;
    }
}
