import { ReadingEntry } from '../models/logs/ReadingEntry';
import { TreatmentEntry } from '../models/logs/TreatmentEntry';
import { Treatment } from '../models/recipe/Treatment';
import { Reading } from '../models/recipe/Reading';
import { Recipe } from '../models/recipe/Recipe';
import { Pool } from '../models/Pool';

export interface CalculationResult {
    value: number | null;
    variable: string;
}

export class CalculationService {
    /// Hermes is the thing that runs the formulas, obviously.
    static getHtmlStringForLocalHermes = (recipe: Recipe, pool: Pool, inputs: ReadingEntry[]): string => {
        const calc = `
        const calc = (event) => {
            // Load up the recipe
            const recipe = event.recipe;
            const outputs = {};
            const inputsAsArgs = \`const r = {\${event.readings.map(r => \`\${r.variableName}: \${r.value}\`).join(',')}};\`;
            const poolAsArgs = \`const p = {gallons: \${event.pool.gallons}};\`;
            for (let i = 0; i < recipe.treatments.length; i++) {
                const t = recipe.treatments[ i ];
                const prevTreatVals = [];
                Object.entries(outputs).forEach(([ variable, value ]) => { prevTreatVals.push(\`\${variable}:\${value}\`) });
                const previousTreatmentsAsArgs = \`const t = {\${prevTreatVals.join(',') || ''}};\`;
                const f = \`
                    \${inputsAsArgs}
                    \${poolAsArgs}
                    \${previousTreatmentsAsArgs}
                    \${t.formula}
                \`;

                // Fire away (for each formula)!
                let result = null;
                try {
                    result = new Function(f)();
                } catch (e) {
                    console.error(e);
                }
                outputs[ t.variableName ] = result;
            }

            const keys = Object.keys(outputs);
            const treatments = keys.map(k => ({ variable: k, value: outputs[ k ] }));

            return treatments;
        };`;
        const event = {
            recipe,
            pool,
            readings: inputs
        };
        const jsCall = calc + `const results = calc(${JSON.stringify(event)});document.getElementById("hello").innerHTML = JSON.stringify(results);window.ReactNativeWebView.postMessage(JSON.stringify(results));`;

        return `<body><h1 id="hello">hello</h1><script>${jsCall}</script></body>`;
    }

    static calculateTreatments = (recipe: Recipe, pool: Pool, recordedInputs: ReadingEntry[]): TreatmentEntry[] => {

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
            let record = recordedInputs.find(ri => ri.variableName === reading.variableName)
            if ((record === null) || (record === undefined)) {
                return null;  // TODO: handle case where some inputs are empty?
            }
            return record.value;
        });
        inputValues.splice(0, 0, pool.gallons);
        const inputString = inputValues.join(', ');

        console.log(paramString);
        console.log(inputString);

        let outputs = recipe.treatments.map(treatment => {
            const formula = 'function x(' + paramString + ') { ' + treatment.formula + ' } x(' + inputString + ');';
            const value = eval(formula);
            console.log('formula: ' + formula);
            console.log('value: ' + String(value));
            return TreatmentEntry.make(treatment, value);
        });

        return outputs;
    };
}

const calculateValueForOutput = (
    treatment: Treatment,
    poolVolume: number,
    inputs: Reading[],
    inputEntries: ReadingEntry[]): number => {

    const formula = treatment.formula;
    // TODO: finish this, my brain === mush
    const params = inputs.map(r => {
        if (inputEntries.filter(e => e.variableName === r.variableName).length > 0) {
            return ''
        }
    });

    return 0;
};