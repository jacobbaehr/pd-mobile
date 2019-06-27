"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the value of a reading or observation
 */
class ReadingEntry {
    static make(reading, value) {
        let readingEntry = new ReadingEntry();
        readingEntry.readingId = reading.objectId;
        readingEntry.readingName = reading.name;
        readingEntry.value = value;
        return readingEntry;
    }
}
// For Realm purposes
ReadingEntry.schema = {
    name: 'ReadingEntry',
    properties: {
        readingName: 'string',
        readingId: 'string',
        value: 'double'
    }
};
exports.ReadingEntry = ReadingEntry;
//# sourceMappingURL=ReadingEntry.js.map