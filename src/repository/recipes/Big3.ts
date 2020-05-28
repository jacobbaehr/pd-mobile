import { Recipe } from '../../models/recipe/Recipe';

export const big3: Recipe = {
    name: 'Big 3',
    id: '002_initial_big3',
    ts: 1234,
    description: 'This lazy recipe just measures your Free Chlorine, pH, and Total Alkalinity.',
    readings: [
        {
            name: 'Free Chlorine',
            variableName: 'fc',
            type: 'number',
            units: 'ppm',
            defaultValue: 3,
            sliderMax: 6,
            sliderMin: 0,
            decimalPlaces: 1,
            referenceId: 'fc'
        },
        {
            name: 'pH',
            variableName: 'ph',
            type: 'number',
            units: null,
            defaultValue: 7.2,
            sliderMax: 9,
            sliderMin: 5,
            decimalPlaces: 1,
            referenceId: 'ph'
        },
        {
            name: 'Total Alkalinity',
            variableName: 'ta',
            type: 'number',
            units: 'ppm',
            defaultValue: 100,
            sliderMax: 150,
            sliderMin: 50,
            decimalPlaces: 0,
            referenceId: 'ta'
        }
    ],
    treatments: [
        {
            referenceId: 'calc_hypo_67',
            name: '67% Calcium Hypochlorite',
            variableName: 'chlorine',
            formula: 'if (r.fc > 3.0) return 0; return (3.0 - r.fc) * p.gallons * .06;'
        },
        {
            referenceId: 'sodium_bicarb',
            name: 'Sodium Bicarbonate',
            variableName: 'baking_soda',
            formula: 'return 6;'
        },
        {
            referenceId: 'sodium_carb',
            name: 'Sodium Carbonate',
            variableName: 'soda_ash',
            formula: 'return 0;'
        }
    ]
};
