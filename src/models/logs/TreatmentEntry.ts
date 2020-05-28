import { Treatment } from '../recipe/Treatment';

/**
 * Represents the amount or state of a treatment or task
 */
export class TreatmentEntry {
    // The calculated value
    recommended?: number;

    // The actual used value
    amount?: number;

    // Variable name (defined by the recipe)
    variableName!: string;

    // human-friendly name of the reading
    treatmentName!: string;

    // master-id of the treatment.
    referenceId?: string;

    // For Realm purposes
    static schema = {
        name: 'TreatmentEntry',
        properties: {
            treatmentName: 'string',
            treatmentId: 'string',
            amount: 'double?',
            amountRecommended: 'double?'
        }
    };

    static make(treatment: Treatment, amount?: number): TreatmentEntry {
        let entry = new TreatmentEntry();
        entry.referenceId = treatment.referenceId;
        entry.treatmentName = treatment.name;
        entry.amount = amount;
        return entry;
    }
}
