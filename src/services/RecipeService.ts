import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { Pool } from '~/models/Pool';
import { Recipe } from '~/models/recipe/Recipe';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { Database } from '~/repository/Database';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { defaultRecipe } from '~/repository/recipes/Default';
import { Config } from './Config';

import { RecipeAPI } from './gql/RecipeAPI';
import { RS } from './RecipeUtil';

export class RecipeService {
    static defaultRecipeKey = RS.getKey(defaultRecipe);

    /// First, tries to load the recipe locally. If not found, it fetches, saves, then returns the recipe from the API.
    static resolveRecipeWithKey = async (
        recipeKey: RecipeKey,
        client: ApolloClient<NormalizedCacheObject>,
    ): Promise<Recipe> => {
        try {
            const localRecipe = await RecipeRepo.loadLocalRecipeWithKey(recipeKey);
            return localRecipe;
        } catch (e) {
        }

        try {
            const recipe = await RecipeAPI.fetchRecipe(recipeKey, client);
            const saveResult = await RecipeRepo.saveRecipe(recipe);
            if (!saveResult) { console.warn(`Warning: could not save recipe ${recipe.id}|${recipe.ts}`); }
            return recipe;
        } catch (e) {
            return Promise.reject(e);
        }
    };

    static saveLatestRecipeVersion = async (
        key: RecipeKey,
        client: ApolloClient<NormalizedCacheObject>,
    ): Promise<void> => {
        /// latestKey may or may not be equal to "key"
        const latestInfo = await RecipeAPI.fetchLatestMetaForRecipe(key, client);

        if (RS.needUpdateToUseRecipe(latestInfo, Config.version)) {
            console.warn('Please update pooldash!');
            return;
        }

        const latestKey = RS.getKey(latestInfo);
        // As a side-effect, this saves it locally if we neededt ofetch it
        await RecipeService.resolveRecipeWithKey(latestKey, client);
    };

    static updateAllLocalRecipes = async (client: ApolloClient<NormalizedCacheObject>): Promise<void> => {
        // First, update all the local recipes
        const oldLocalRecipeKeys = await RecipeRepo.loadLatestLocalRecipeKeys();
        // TODO: batch these api calls? (nah)
        // As a side-effect of fetching them, we'll persist them locally.
        const updateEach = oldLocalRecipeKeys.map((key) => RecipeService.saveLatestRecipeVersion(key, client));
        await Promise.all(updateEach);

        // Pull a fresh list from the local repo:
        const updatedKeys = await RecipeRepo.loadLatestLocalRecipeKeys();

        // Then, iterate over all the pools & update them to the latest keys:
        const allPools = Database.loadPools();
        const outdatedPools = allPools.filter((p) => !!p.recipeKey && updatedKeys.indexOf(p.recipeKey) < 0);
        const updatedInfos = updatedKeys.map((key) => RS.reverseKey(key));

        outdatedPools.forEach((pool) => {
            const oldKey = pool.recipeKey;

            if (!oldKey) {
                return;
            }

            const oldRecipeId = RS.reverseKey(oldKey).id;
            const newInfo = updatedInfos.find((info) => info.id === oldRecipeId);
            if (!newInfo) {
                return;
            }

            // TODO: bring the pool update closure back
            // we can't edit a pool object outside of a realm write block, that's why it existed.
            // this is terrible.
            const updatedPool: Pool = {
                objectId: pool.objectId,
                name: pool.name,
                gallons: pool.gallons,
                waterType: pool.waterType,
                wallType: pool.wallType,
                recipeKey: RS.getKey(newInfo),
            };

            Database.updatePool(updatedPool);
        });
    };
}
