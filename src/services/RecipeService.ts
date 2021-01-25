import { Recipe } from '~/models/recipe/Recipe';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { RecipeAPI } from './gql/RecipeAPI';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Database } from '~/repository/Database';
import { RS } from './RecipeUtil';
// TODO: move this to a screen or something? Feels like breaking the chain-of-command to put it here:
import { dispatch } from '~/redux/AppState';
import { updatePool } from '~/redux/selectedPool/Actions';

export class RecipeService {
    static defaultRecipeKey = 'vast_argument_756|1593550871334';

    /// First, tries to load the recipe locally. If not found, it fetches, saves, then returns the recipe from the API.
    static resolveRecipeWithKey = async (
        recipeKey: RecipeKey,
        client: ApolloClient<NormalizedCacheObject>,
    ): Promise<Recipe> => {
        console.log(`loading recipe ${recipeKey}`);
        try {
            const localRecipe = await RecipeRepo.loadLocalRecipeWithKey(recipeKey);
            console.log('loaded locally!');
            return localRecipe;
        } catch (e) {
            console.log('recipe not found locally, fetching remotely...');
        }

        try {
            console.log('fetching...');
            const recipe = await RecipeAPI.fetchRecipe(recipeKey, client);
            console.log('saving...');
            const saveResult = await RecipeRepo.saveRecipe(recipe);
            console.log('saved?: ', saveResult);
            return recipe;
        } catch (e) {
            console.log('Could not fetch recipe remotely!');
            return Promise.reject(e);
        }
    };

    static getLatestRecipeVersion = async (
        key: RecipeKey,
        client: ApolloClient<NormalizedCacheObject>,
    ): Promise<Recipe> => {
        /// latestKey may or may not be equal to "key"
        const latestKey = await RecipeAPI.fetchLatestKeyForRecipe(key, client);
        return await RecipeService.resolveRecipeWithKey(latestKey, client);
    };

    static updateAllLocalRecipes = async (client: ApolloClient<NormalizedCacheObject>): Promise<void> => {
        // First, update all the local recipes
        const oldLocalRecipeKeys = await RecipeRepo.loadLatestLocalRecipeKeys();
        // TODONT: batch these api calls?
        const updateEach = oldLocalRecipeKeys.map((key) => RecipeService.getLatestRecipeVersion(key, client));
        await Promise.all(updateEach);

        // Pull a fresh list from the local repo:
        const updatedKeys = await RecipeRepo.loadLatestLocalRecipeKeys();

        // Then, iterate over all the pools & update them to the latest keys:
        const allPools = Database.loadPools();
        console.log(`Pools: ${allPools.length}`);
        console.log(`${allPools.map((p) => p.recipeKey)}`);
        const outdatedPools = allPools.filter((p) => !!p.recipeKey && updatedKeys.indexOf(p.recipeKey) < 0);

        console.log(`Outdated Pools: ${outdatedPools.length}`);

        const updatedInfos = updatedKeys.map((key) => RS.reverseKey(key));

        outdatedPools.forEach((pool) => {
            const oldKey = pool.recipeKey;
            console.log('a');
            if (!oldKey) {
                return;
            }
            console.log('b');
            const oldRecipeId = RS.reverseKey(oldKey).id;
            const newInfo = updatedInfos.find((info) => info.id === oldRecipeId);
            if (!newInfo) {
                return;
            }
            console.log('c');
            dispatch(
                updatePool(pool, (p) => {
                    p.recipeKey = RS.getKey(newInfo);
                }),
            );
        });
    };
}
