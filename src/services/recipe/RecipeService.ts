import { Recipe } from "models/recipe/Recipe";
import { RecipeRepository } from "repository/RecipeRepository";
import axios from 'axios';
import { RecipeMeta } from "models/recipe/RecipeMeta";

interface RecipesResponse {
    list: RecipeMeta[];
}

export class RecipeService {

    recipeRepo: RecipeRepository;

    constructor() {
        this.recipeRepo = new RecipeRepository();
    }

    resolveRecipeWithId = async (recipeId: string): Promise<Recipe> => {
        console.log(`loading recipe ${recipeId}`);
        try {
            const localRecipe = await this.recipeRepo.loadLocalRecipeWithId(recipeId);
            console.log('loaded locally!');
            return localRecipe;
        } catch (e) {
            console.log('recipe not found locally, fetching remotely...')
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
        try {
            const response = await axios.get<RecipesResponse>('https://api.pooldash.com/v1/recipes');
            console.log('response: ');
            console.log(response);
            return response.data.list;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    private fetchRecipeRemotely = async (recipeId: string): Promise<Recipe> => {
        // TODO: implement this
        return Promise.reject('not yet implemented!');
    }
}