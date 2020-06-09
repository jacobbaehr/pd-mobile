import { ReadingEntry } from '../models/logs/ReadingEntry';
import { TreatmentEntry } from '../models/logs/TreatmentEntry';
import { Treatment } from '../models/recipe/Treatment';
import { Reading } from '../models/recipe/Reading';
import { Recipe } from '../models/recipe/Recipe';
import { Pool } from '../models/Pool';

export interface CalculationResult {
    value: number | null;
    var: string;
}

export class CalculationService {
    /// Hermes is the thing that runs the formulas, obviously.
    static getHtmlStringForLocalHermes = (recipe: Recipe, pool: Pool, inputs: ReadingEntry[]): string => {
        const calc = `
        const calc = (event) => {
            // Load up the recipe
            const recipe = event.recipe;
            const outputs = {};
            const inputsAsArgs = \`const r = {\${event.readings.map(r => \`\${r.var}: \${r.value}\`).join(',')}};\`;
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
                outputs[ t.var ] = result;
            }

            const keys = Object.keys(outputs);
            const treatments = keys.map(k => ({ var: k, value: outputs[ k ] }));

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
}
