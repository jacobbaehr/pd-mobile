import { InputEntry } from '../Models/Recipe/InputEntry';
import { OutputEntry } from '../Models/Recipe/OutputEntry';
import { Output } from '../Models/Recipe/Output';
import { Input } from '../Models/Recipe/Input';
import { Recipe } from '../Models/Recipe/Recipe';

export class CalculationService {
    static calculateTreatments = (recipe: Recipe, recordedInputs: InputEntry[]): OutputEntry[] => {
        
        // const freeChlorineReading = readings.filter(r => r.identifier === 'free_chlorine');
        // const free_chlorine = freeChlorineReading[0].value;
        // const chlorineAmount = eval(chlorineFormula);

        return [
            OutputEntry.make(recipe.outputs[0], 9)
        ];
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
