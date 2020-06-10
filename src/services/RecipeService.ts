import { RecipesApiManager } from '~/api/recipes/RecipesApiManager';
import { Recipe } from '~/models/recipe/Recipe';
import { RecipeMeta } from '~/models/recipe/RecipeMeta';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { RecipeKey } from '~/models/recipe/RecipeKey';

interface RecipesResponse {
    list: RecipeMeta[];
}

export class RecipeService {
    static recipeApiManager = new RecipesApiManager('https://api.pooldash.com/v1/recipes');

    static defaultRecipeKey = '002_initial_big3|1234';

    static resolveRecipeWithKey = async (recipeKey: RecipeKey): Promise<Recipe> => {
        console.log(`loading recipe ${recipeKey}`);
        try {
            const localRecipe = await RecipeRepo.loadLocalRecipeWithKey(recipeKey);
            console.log('loaded locally!');
            return localRecipe;
        } catch (e) {
            console.log('recipe not found locally, fetching remotely...');
        }

        try {
            const recipe = await RecipeService.fetchRecipeRemotely(recipeKey);
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

    private static fetchRecipeRemotely = async (recipeId: string): Promise<Recipe> => {
        // TODO: implement this
        return Promise.reject('not yet implemented!');
    }
}
