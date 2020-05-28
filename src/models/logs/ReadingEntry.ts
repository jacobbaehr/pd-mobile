import { Reading } from '~/models/recipe/Reading';

/**
 * Represents the value of a reading or observation
 */
export class ReadingEntry {
    // The value of the input
    value?: number;

    // Variable name (defined by the recipe)
    variableName!: string;

    // human-friendly name of the reading
    readingName!: string;

    // master-id of the reading.
    referenceId?: string;

    // For Realm purposes
    static schema = {
        name: 'ReadingEntry',
        properties: {
            readingName: 'string',
            referenceId: 'string?',
            variableName: 'string',
            value: 'double?',
        },
    };

    static make(reading: Reading, value?: number): ReadingEntry {
        let readingEntry = new ReadingEntry();
        readingEntry.variableName = reading.variableName;
        readingEntry.referenceId = reading.referenceId;
        readingEntry.readingName = reading.name;
        readingEntry.value = value;
        return readingEntry;
    }
}
