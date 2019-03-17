import { ReadingEntry } from "./ReadingEntry";
import { TreatmentEntry } from "./TreatmentEntry";
import { object } from "prop-types";

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
  
      // For Realm purposes
      static schema = {
          name: 'LogEntry',
          primaryKey: 'objectId',
          properties: {
              objectId: 'string',
              poolId: 'string',
              readingEntries: 'ReadingEntry[]',
              treatmentEntries: 'TreatmentEntry[]',
              ts: 'int'
          }
      };
    
    static make(
        objectId: string, 
        poolId: string, 
        ts: number, 
        readingEntries: ReadingEntry[], 
        treatmentEntries: TreatmentEntry[]): LogEntry {
            let logEntry = new LogEntry();
            logEntry.objectId = objectId;
            logEntry.poolId = poolId;
            logEntry.ts = ts;
            logEntry.readingEntries = readingEntries;
            logEntry.treatmentEntries = treatmentEntries;
            return logEntry;
    }
}