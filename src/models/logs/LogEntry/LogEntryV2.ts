import { ReadingEntry } from '../ReadingEntry';
import { TreatmentEntry } from '../TreatmentEntry';
import { FormulaKey } from '../../recipe/FormulaKey';

/**
 * Represents readingEntries and treatmentEntries for a given pool
 */
export class LogEntryV2 {
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
    recipeKey!: FormulaKey;

    // The human-friendly name of the formula
    formulaName?: string;

    // Any special thoughts the user had about this log entry.
    notes?: string;

    // If this log entry was imported.
    poolDoctorId?: string;

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
            formulaName: 'string?',
            notes: 'string?',
            poolDoctorId: 'string?',
        },
    };

    static make(
        objectId: string,
        poolId: string,
        ts: number,
        readingEntries: ReadingEntry[],
        treatmentEntries: TreatmentEntry[],
        recipeKey: FormulaKey,
        formulaName: string,
        notes: string | null,
        poolDoctorId: string | null,
    ): LogEntryV2 {
        let logEntry = new LogEntryV2();
        logEntry.objectId = objectId;
        logEntry.poolId = poolId;
        logEntry.ts = ts;
        logEntry.readingEntries = readingEntries;
        logEntry.treatmentEntries = treatmentEntries;
        logEntry.recipeKey = recipeKey;
        logEntry.formulaName = formulaName;
        if (notes && notes.length > 0) {
            logEntry.notes = notes;
        }
        if (poolDoctorId && poolDoctorId.length > 0) {
            logEntry.poolDoctorId = poolDoctorId;
        }
        return logEntry;
    }
}