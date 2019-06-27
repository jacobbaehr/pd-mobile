"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the amount or state of a treatment or task
 */
class TreatmentEntry {
    static make(treatment, value) {
        let entry = new TreatmentEntry();
        entry.treatmentId = treatment.objectId;
        entry.treatmentName = treatment.name;
        entry.amount = value;
        return entry;
    }
}
// For Realm purposes
TreatmentEntry.schema = {
    name: 'TreatmentEntry',
    properties: {
        treatmentName: 'string',
        treatmentId: 'string',
        amount: 'double',
        amountRecommended: 'double?'
    }
};
exports.TreatmentEntry = TreatmentEntry;
//# sourceMappingURL=TreatmentEntry.js.map