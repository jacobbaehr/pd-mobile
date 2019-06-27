"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.big3 = {
    name: 'Big 3',
    objectId: '002_initial_big3',
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
//# sourceMappingURL=Big3.js.map