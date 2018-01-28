import { Recipe } from './Models/Recipe/Recipe';

export const initialData = {
    recipes: [
        {
            name: 'Big 3',
            objectId: '001_initial_big3',
            description: 'This lazy recipe just measures your Free Chlorine, pH, and Total Alkalinity.',
            inputs: [
                {
                    name: 'Free Chlorine',
                    variableName: 'fc'
                },
                {
                    name: 'pH',
                    variableName: 'ph'
                },
                {
                    name: 'Total Alkalinity',
                    variableName: 'ta'
                }
            ],
            outputs: [
                {
                    name: '67% Calcium Hypochlorite',
                    variableName: 'chlorine',
                    formula: 'if (fc > 3.0) return 0; return (3.0 - fc) * volume * .06;'
                },
                {
                    name: 'Sodium Bicarbonate',
                    variableName: 'baking_soda',
                    formula: 'return 6'
                },
                {
                    name: 'Sodium Carbonate',
                    variableName: 'soda_ash',
                    formula: 'return 0'
                }
            ]
        }
     ] as Recipe[]
}
