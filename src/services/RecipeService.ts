import { Recipe } from '~/models/recipe/Recipe';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { RecipeAPI } from './gql/RecipeAPI';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export class RecipeService {
    static defaultRecipeKey = 'vast_argument_756|1593550871334';

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
}
