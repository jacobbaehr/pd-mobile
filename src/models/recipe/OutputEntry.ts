import { Output } from './Output';

/**
 * Represents the amount or state of a treatment or task
 */
export class OutputEntry {
    // The corresponding output
    output!: Output;

    // For treatments, amount in ounces.
    // For tasks, 0 === incomplete, 1 === complete
    value!: number;
    
    static make(output: Output, value: number): OutputEntry {
        let outputEntry = new OutputEntry();
        outputEntry.output = output;
        outputEntry.value = value;
        return outputEntry;
    }
}
