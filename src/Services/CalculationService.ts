import { InputEntry } from '../Models/Recipe/InputEntry';
import { OutputEntry } from '../Models/Recipe/OutputEntry';
import { Output } from '../Models/Recipe/Output';
import { Input } from '../Models/Recipe/Input';
import { Recipe } from '../Models/Recipe/Recipe';
import { Pool } from '../Models/Pool';
import { Database } from '../Models/Database';

export class CalculationService {
    static calculateTreatments = (recipe: Recipe, pool: Pool, recordedInputs: InputEntry[]): OutputEntry[] => {
        
        // const freeChlorineReading = readings.filter(r => r.identifier === 'free_chlorine');
        // const free_chlorine = freeChlorineReading[0].value;
        // const chlorineAmount = eval(chlorineFormula);

        // Get all of the inputs as a single string w/ all paramaters.
        // Call each output function with the parameters, store results in array.
        // Filter & display array.

        let recipeParamNames = recipe.inputs.map(input => input.variableName);
        recipeParamNames.splice(0, 0, 'volume');
        const paramString = recipeParamNames.join(', ');

        /// Ensure these are in the correct order
        let inputValues = recipe.inputs.map(input => {
            let record = recordedInputs.find(ri => ri.inputID === input.objectId)
            if ((record === null) || (record === undefined)) {
                return null;  // TODO: handle case where some inputs are empty?
            }
            return record.value;
        });
        inputValues.splice(0, 0, pool.volume);
        const inputString = inputValues.join(', ');

        console.log(paramString);
        console.log(inputString);

        let outputs = recipe.outputs.map( output => {
            const formula = 'function x(' + paramString + ') { ' + output.formula + ' } x(' + inputString + ');';
            const value = eval(formula);
            console.log('formula: ' + formula);
            console.log('value: ' + String(value));
            return OutputEntry.make(output, value);
        });

        return outputs;
    };
}

const calculateValueForOutput = (
    output: Output,
    poolVolume: number,
    inputs: Input[],
    inputEntries: InputEntry[]): number => {

        const formula = output.formula;
        // TODO: finish this, my brain === mush
        const params = inputs.map(r => {
            if (inputEntries.filter(e => e.inputID === r.objectId).length > 0) {
                return ''
            }
        })

        return 0;
}
