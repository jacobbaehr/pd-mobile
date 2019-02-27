import { Reading } from "models/recipe/Reading";

/**
 * Represents the value of a reading or observation
 */
export class ReadingEntry {
    // The value of the input
    value!: number;

    // human-friendly name of the reading
    readingName!: string;

    // master-id of the reading (for now, is objectId)
    readingId!: string;

    // For Realm purposes
    static schema = {
        name: 'ReadingEntry',
        properties: {
            readingName: 'string',
            readingId: 'string',
            value: 'double'
        }
    };
    
    static make(reading: Reading, value: number): ReadingEntry {
        let readingEntry = new ReadingEntry();
        readingEntry.readingId = reading.objectId;
        readingEntry.readingName = reading.name;
        readingEntry.value = value;
        return readingEntry;
    }
}
