import { Reading } from '../Models/Reading';
import { Treatment } from '../Models/Treatment';

export class CalculationService {
    static calculateTreatments = (readings: Reading[]): Treatment[] => {
        return [
            new Treatment('Calcium Hypochlorite', 'calcium_hypochlorite', readings.length)
        ];
    };
}
