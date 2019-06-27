"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an action that can be taken during performance of a recipe, and includes
 * a formula that accepts the recipe inputs as parameters and returns whether the action
 * needs to be taken.
 */
class Treatment {
    static make(name, variableName, formula, objectId) {
        let treatment = new Treatment();
        treatment.name = name;
        treatment.variableName = variableName;
        treatment.formula = formula;
        return treatment;
    }
}
// For Realm purposes
Treatment.schema = {
    name: 'Treatment',
    primaryKey: 'objectId',
    properties: {
        name: 'string',
        variableName: 'string',
        formula: 'string',
        objectId: 'string'
    }
};
exports.Treatment = Treatment;
//# sourceMappingURL=Treatment.js.map