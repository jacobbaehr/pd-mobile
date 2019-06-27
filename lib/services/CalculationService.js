"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TreatmentEntry_1 = require("../models/logs/TreatmentEntry");
class CalculationService {
}
CalculationService.calculateTreatments = (recipe, pool, recordedInputs) => {
    // const freeChlorineReading = readings.filter(r => r.identifier === 'free_chlorine');
    // const free_chlorine = freeChlorineReading[0].value;
    // const chlorineAmount = eval(chlorineFormula);
    // Get all of the inputs as a single string w/ all paramaters.
    // Call each output function with the parameters, store results in array.
    // Filter & display array.
    let recipeParamNames = recipe.readings.map(reading => reading.variableName);
    recipeParamNames.splice(0, 0, 'volume');
    const paramString = recipeParamNames.join(', ');
    /// Ensure these are in the correct order
    let inputValues = recipe.readings.map(reading => {
        let record = recordedInputs.find(ri => ri.readingId === reading.objectId);
        if ((record === null) || (record === undefined)) {
            return null; // TODO: handle case where some inputs are empty?
        }
        return record.value;
    });
    inputValues.splice(0, 0, pool.volume);
    const inputString = inputValues.join(', ');
    console.log(paramString);
    console.log(inputString);
    let outputs = recipe.treatments.map(treatment => {
        const formula = 'function x(' + paramString + ') { ' + treatment.formula + ' } x(' + inputString + ');';
        const value = eval(formula);
        console.log('formula: ' + formula);
        console.log('value: ' + String(value));
        return TreatmentEntry_1.TreatmentEntry.make(treatment, value);
    });
    return outputs;
};
exports.CalculationService = CalculationService;
const calculateValueForOutput = (treatment, poolVolume, inputs, inputEntries) => {
    const formula = treatment.formula;
    // TODO: finish this, my brain === mush
    const params = inputs.map(r => {
        if (inputEntries.filter(e => e.readingId === r.objectId).length > 0) {
            return '';
        }
    });
    return 0;
};
//# sourceMappingURL=CalculationService.js.map