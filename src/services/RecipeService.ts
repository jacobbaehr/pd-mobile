import { RecipesApiManager } from '~/api/recipes/RecipesApiManager';
import { Recipe } from '~/models/recipe/Recipe';
import { RecipeMeta } from '~/models/recipe/RecipeMeta';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { RecipeAPI } from './gql/RecipeAPI';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

interface RecipesResponse {
    list: RecipeMeta[];
}

export class RecipeService {
    static recipeApiManager = new RecipesApiManager('https://api.pooldash.com/v1/recipes');

    static defaultRecipeKey = '002_initial_big3|1234';

    static resolveRecipeWithKey = async (recipeKey: RecipeKey, client: ApolloClient<NormalizedCacheObject>): Promise<Recipe> => {
        console.log(`loading recipe ${recipeKey}`);
        try {
            const localRecipe = await RecipeRepo.loadLocalRecipeWithKey(recipeKey);
            console.log('loaded locally!');
            return localRecipe;
        } catch (e) {
            console.log('recipe not found locally, fetching remotely...');
        }

        try {
            console.log('fetching...')
            const recipe = await RecipeAPI.fetchRecipe(recipeKey, client);
            console.log('saving...')
            const saveResult = await RecipeRepo.saveRecipe(recipe);
            console.log('saved?: ', saveResult);
            return recipe;
        } catch (e) {
            console.log('Could not fetch recipe remotely!');
            return Promise.reject(e);
        }
    }

    static fetchRecipeList = async (): Promise<RecipeMeta[]> => {
        const getRecipesResponse = await RecipeService.recipeApiManager.getDefaultRecipes();
        if (getRecipesResponse.error || !getRecipesResponse.response) {
            console.log(getRecipesResponse.error);
            return [];
        } else {
            console.log('response: ');
            console.log(getRecipesResponse.response);
            return getRecipesResponse.response.data.list;
        }
    }
}

// Fun Helpers
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