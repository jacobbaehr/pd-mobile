import { Recipe } from '../../models/recipe/Recipe';

export const big3: Recipe = {
    name: 'Big 3',
    id: '002_initial_big3',
    ts: 1234,
    description: 'This lazy recipe just measures your Free Chlorine, pH, and Total Alkalinity.',
    readings: [
        {
            objectId: 'free_chlorine',
            name: 'Free Chlorine',
            variableName: 'fc'
        },
        {
            objectId: 'ph',
            name: 'pH',
            variableName: 'ph'
        },
        {
            objectId: 'ta',
            name: 'Total Alkalinity',
            variableName: 'ta'
        }
    ],
    treatments: [
        {
            objectId: 'calc_hypo_67',
            name: '67% Calcium Hypochlorite',
            variableName: 'chlorine',
            formula: 'if (fc > 3.0) return 0; return (3.0 - fc) * volume * .06;'
        },
        {
            objectId: 'sodium_bicarb',
            name: 'Sodium Bicarbonate',
            variableName: 'baking_soda',
            formula: 'return 6;'
        },
        {
            objectId: 'sodium_carb',
            name: 'Sodium Carbonate',
            variableName: 'soda_ash',
            formula: 'return 0;'
        }
    ]
};
