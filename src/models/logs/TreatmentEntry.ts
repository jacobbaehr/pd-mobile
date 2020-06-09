import { Treatment } from '../recipe/Treatment';

/**
 * Represents the amount or state of a treatment or task
 */
export class TreatmentEntry {
    // The calculated value, converted to the actual used concentration.
    recommended?: number;

    // The actual used value
    amount?: number;

    // The actual concentration used
    concentration?: number;

    // Variable name (defined by the recipe)
    var!: string;

    // human-friendly name of the reading
    treatmentName!: string;

    // For Realm purposes
    static schema = {
        name: 'TreatmentEntry',
        properties: {
            treatmentName: 'string',
            var: 'string',
            amount: 'double?',
            amountRecommended: 'double?',
            concentation: 'double?'
        }
    };

    static make(treatment: Treatment, amount?: number, concentration?: number): TreatmentEntry {
        let entry = new TreatmentEntry();
        entry.treatmentName = treatment.name;
        entry.var = treatment.var;
        entry.amount = amount;
        entry.concentration = concentration || treatment.concentration;
        return entry;
    }
}
