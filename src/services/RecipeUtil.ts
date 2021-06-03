import compareVersions from 'compare-versions';
import { PDColor } from '~/components/PDTheme';
import { Recipe } from '~/models/recipe/Recipe';
import { FormulaKey } from '~/models/recipe/FormulaKey';
import { FormulaMeta } from '~/models/recipe/FormulaMeta';

export class RS {
    static toMeta = (recipe: Recipe): FormulaMeta => {
        return {
            id: recipe.id,
            name: recipe.name,
            desc: recipe.description,
            ts: recipe.ts,
            appVersion: recipe.appVersion,
        };
    };

    static getKey = (recipeOrMeta: { id: string; ts: number }): FormulaKey => {
        return `${recipeOrMeta.id}|${recipeOrMeta.ts}`;
    };

    static reverseKey = (key: FormulaKey): { id: string; ts: number } => {
        const parts = key.split('|');
        return {
            id: parts[0],
            ts: parseFloat(parts[1]),
        };
    };

    static needUpdateToUseRecipe = (recipeOrMeta: { appVersion: string }, appVersion: string): boolean => {
        return compareVersions.compare(recipeOrMeta.appVersion, appVersion, '>');
    };

    static getRecipeColor = (key: string): PDColor => {
        const allColors: PDColor[] = ['blue', 'pink', 'green', 'orange', 'teal', 'purple'];
        const recipeId = RS.reverseKey(key).id;
        const sum = recipeId.split('').map((x) => x.charCodeAt(0)).reduce((p, c) => p + c);
        const index = sum % allColors.length;
        return allColors[index];
    };
}
