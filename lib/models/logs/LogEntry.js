"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents readingEntries and treatmentEntries for a given pool
 */
class LogEntry {
    static make(objectId, poolId, ts, readingEntries, treatmentEntries, recipeId) {
        let logEntry = new LogEntry();
        logEntry.objectId = objectId;
        logEntry.poolId = poolId;
        logEntry.ts = ts;
        logEntry.readingEntries = readingEntries;
        logEntry.treatmentEntries = treatmentEntries;
        logEntry.recipeId = recipeId;
        return logEntry;
    }
}
// For Realm purposes
LogEntry.schema = {
    name: 'LogEntry',
    primaryKey: 'objectId',
    properties: {
        objectId: 'string',
        poolId: 'string',
        readingEntries: 'ReadingEntry[]',
        treatmentEntries: 'TreatmentEntry[]',
        ts: 'int',
        recipeId: 'string'
    }
};
exports.LogEntry = LogEntry;
//# sourceMappingURL=LogEntry.js.map