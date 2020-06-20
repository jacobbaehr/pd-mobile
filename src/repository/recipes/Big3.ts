import { Recipe } from '../../models/recipe/Recipe';

export const big3: Recipe = {
    name: 'Big 3',
    id: '002_initial_big3',
    ts: 1234,
    description: 'This lazy recipe just measures your Free Chlorine, pH, and Total Alkalinity.',
    readings: [
        {
            name: 'Free Chlorine',
            var: 'fc',
            type: 'number',
            units: 'ppm',
            defaultValue: 3,
            sliderMax: 6,
            sliderMin: 0,
            decimalPlaces: 1,
            idealMin: 3,
            idealMax: 4
        },
        {
            name: 'pH',
            var: 'ph',
            type: 'number',
            units: null,
            defaultValue: 7.2,
            sliderMax: 9,
            sliderMin: 5,
            decimalPlaces: 1,
            idealMin: 6.8,
            idealMax: 7.2
        },
        {
            name: 'Total Alkalinity',
            var: 'ta',
            type: 'number',
            units: 'ppm',
            defaultValue: 100,
            sliderMax: 150,
            sliderMin: 50,
            decimalPlaces: 0,
            idealMax: 190,
            idealMin: 220
        }
    ],
    treatments: [
        {
            name: 'Calcium Hypochlorite',
            var: 'chlorine',
            formula: 'if (r.fc > 3.0) return 0; return (3.0 - r.fc) * p.gallons * .06;',
            concentration: 67,
            type: 'dry_chem'
        },
        {
            name: 'Sodium Bicarbonate',
            var: 'baking_soda',
            formula: 'return 6;',
            concentration: 100,
            type: 'dry_chem'
        },
        {
            name: 'Sodium Carbonate',
            var: 'soda_ash',
            formula: 'return 0;',
            concentration: 100,
            type: 'dry_chem'
        }
    ]
};
