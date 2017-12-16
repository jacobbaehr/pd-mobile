import { Reading } from '../Models/Reading';
import { Treatment } from '../Models/Treatment';

export class CalculationService {
    static calculateTreatments = (readings: Reading[], chlorineFormula: string): Treatment[] => {

        const freeChlorineReading = readings.filter(r => r.identifier === 'free_chlorine');
        const free_chlorine = freeChlorineReading[0].value;
        const chlorineAmount = eval(chlorineFormula);

        return [
            new Treatment('Calcium Hypochlorite', 'calcium_hypochlorite', chlorineAmount)
        ];
    };
}
