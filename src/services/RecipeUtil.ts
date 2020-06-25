import { Recipe } from "~/models/recipe/Recipe";
import { RecipeMeta } from "~/models/recipe/RecipeMeta";
import { RecipeKey } from "~/models/recipe/RecipeKey";

export class RS {
    static toMeta = (recipe: Recipe): RecipeMeta => {
        return {
            id: recipe.id,
            name: recipe.name,
            desc: recipe.description,
            ts: recipe.ts
        };
    }

    static getKey = (recipeOrMeta: { id: string, ts: number }): RecipeKey => {
        return `${recipeOrMeta.id}|${recipeOrMeta.ts}`;
    }

    static reverseKey = (key: RecipeKey): { id: string, ts: number } => {
        const parts = key.split('|');
        return {
            id: parts[0],
            ts: parseFloat(parts[1])
        };
    }
}