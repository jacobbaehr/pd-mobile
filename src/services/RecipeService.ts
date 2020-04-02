import { RecipesApiManager } from '~/api/recipes/RecipesApiManager';
import { Recipe } from '~/models/recipe/Recipe';
import { RecipeMeta } from '~/models/recipe/RecipeMeta';
import { RecipeRepository } from '~/repository/RecipeRepository';

interface RecipesResponse {
    list: RecipeMeta[];
}

export class RecipeService {
    recipeApiManager: RecipesApiManager;
    recipeRepo: RecipeRepository;

    constructor() {
        this.recipeRepo = new RecipeRepository();
        this.recipeApiManager = new RecipesApiManager('https://api.pooldash.com/v1/recipes');
    }

    resolveRecipeWithId = async (recipeId: string): Promise<Recipe> => {
        console.log(`loading recipe ${recipeId}`);
        try {
            const localRecipe = await this.recipeRepo.loadLocalRecipeWithId(recipeId);
            console.log('loaded locally!');
            return localRecipe;
        } catch (e) {
            console.log('recipe not found locally, fetching remotely...');
        }

        try {
            const recipe = await this.fetchRecipeRemotely(recipeId);
            return recipe;
        } catch (e) {
            console.log('Could not fetch recipe remotely!');
            return Promise.reject(e);
        }
    }

    fetchRecipeList = async (): Promise<RecipeMeta[]> => {
        const getRecipesResponse = await this.recipeApiManager.getDefaultRecipes();
        if (getRecipesResponse.error || !getRecipesResponse.response) {
            console.log(getRecipesResponse.error);
            return [];
        } else {
            console.log('response: ');
            console.log(getRecipesResponse.response);
            return getRecipesResponse.response.data.list;
        }
    }

    private fetchRecipeRemotely = async (recipeId: string): Promise<Recipe> => {
        // TODO: implement this
        return Promise.reject('not yet implemented!');
    }
}
