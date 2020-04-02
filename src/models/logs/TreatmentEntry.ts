import { Treatment } from '../recipe/Treatment';

/**
 * Represents the amount or state of a treatment or task
 */
export class TreatmentEntry {
    // The corresponding treatment:
    treatmentId!: string;
    treatmentName!: string;

    // For chemical treatments, amount in ounces.
    // For tasks, 0 === incomplete, 1 === complete
    amount!: number;
    // If a different amount was used (vs suggested), the amount suggested is defined here
    amountRecommended?: number;

    // For Realm purposes
    static schema = {
        name: 'TreatmentEntry',
        properties: {
            treatmentName: 'string',
            treatmentId: 'string',
            amount: 'double',
            amountRecommended: 'double?'
        }
    };
    
    static make(treatment: Treatment, value: number): TreatmentEntry {
        let entry = new TreatmentEntry();
        entry.treatmentId = treatment.objectId;
        entry.treatmentName = treatment.name;
        entry.amount = value;
        return entry;
    }
}
