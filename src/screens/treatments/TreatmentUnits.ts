export type DryChemicalUnits = 'ounces' | 'pounds' | 'grams' | 'kilograms';
export type WetChemicalUnits = 'ounces' | 'gallons' | 'milliliters' | 'liters';
export type Units = DryChemicalUnits | WetChemicalUnits;

export class Converter {

    // Helper function for cycling through all dry chemical options
    static nextDry = (prevUnits: DryChemicalUnits): DryChemicalUnits => {
        let index = Converter.allDryUnits.indexOf(prevUnits);
        index = (index + 1) % Converter.allDryUnits.length;
        return Converter.allDryUnits[index];
    }

    // Helper function for cycling through all wet chemical options
    static nextWet = (prevUnits: WetChemicalUnits): WetChemicalUnits => {
        let index = Converter.allWetUnits.indexOf(prevUnits);
        index = (index + 1) % Converter.allWetUnits.length;
        return Converter.allWetUnits[index];
    }

    static dry = (prevValue: number, fromUnits: DryChemicalUnits, toUnits: DryChemicalUnits): number => {
        let prevToOunces = 1;
        switch (fromUnits) {
            case 'ounces':
                prevToOunces = 1;
                break;
            case 'pounds':
                prevToOunces = 16;
                break;
            case 'grams':
                prevToOunces = 0.035274;
                break;
            case 'kilograms':
                prevToOunces = 35.274;
        }
        const valueInOunces = prevValue * prevToOunces;
        return Converter.dryOunces(valueInOunces, toUnits);
    }

    static wet = (prevValue: number, fromUnits: WetChemicalUnits, toUnits: WetChemicalUnits): number => {
        let prevToOunces = 1;
        switch (fromUnits) {
            case 'ounces':
                prevToOunces = 1;
                break;
            case 'gallons':
                prevToOunces = 128;
                break;
            case 'milliliters':
                prevToOunces = 0.033814;
                break;
            case 'liters':
                prevToOunces = 33.814;
        }
        const valueInOunces = prevValue * prevToOunces;
        return Converter.wetOunces(valueInOunces, toUnits);
    }

    static dryOunces = (ounces: number, toUnits: DryChemicalUnits): number => {
        let multiplier = 1;
        switch (toUnits) {
            case 'ounces':
                multiplier = 1;
                break;
            case 'pounds':
                multiplier = 0.0625;
                break;
            case 'grams':
                multiplier = 28.3495;
                break;
            case 'kilograms':
                multiplier = .0283495;
                break;
            default:
                multiplier = 1;
                break;
        }
        return ounces * multiplier;
    }

    static wetOunces = (ounces: number, toUnits: WetChemicalUnits): number => {
        let multiplier = 1;
        switch (toUnits) {
            case 'ounces':
                multiplier = 1;
                break;
            case 'gallons':
                multiplier = 0.0078125;
                break;
            case 'milliliters':
                multiplier = 29.5735;
                break;
            case 'liters':
                multiplier = 0.0295735;
                break;
            default:
                multiplier = 1;
                break;
        }
        return ounces * multiplier;
    }

    private static allDryUnits: DryChemicalUnits[] = [
        'ounces',
        'pounds',
        'grams',
        'kilograms'
    ];

    private static allWetUnits: WetChemicalUnits[] = [
        'ounces',
        'gallons',
        'milliliters',
        'liters'
    ];
}
