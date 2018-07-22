/**
 * Represents the value of a reading or observation
 */
export class InputEntry {
    // The objectID of the corresponding input
    inputID: string;

    // The value of the input
    value: number;
    
    static make(inputID: string, value: number): InputEntry {
        let inputEntry = new InputEntry();
        inputEntry.inputID = inputID;
        inputEntry.value = value;
        return inputEntry;
    }
}
