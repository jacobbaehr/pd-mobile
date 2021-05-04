import * as RNFS from 'react-native-fs';
import { Recipe } from '~/models/recipe/Recipe';
import { defaultRecipe } from '~/repository/recipes/Default';
import { RecipeKey, getRecipeKey } from '~/models/recipe/RecipeKey';
import { Util } from '~/services/Util';
import { RS } from '~/services/RecipeUtil';

const recipeFolderName = 'recipes';
const defaultRecipes: Recipe[] = [defaultRecipe];

export namespace RecipeRepo {
    /// Attempts to load the recipes from the Recipe folder
    export const loadLocalRecipeWithKey = async (recipeKey: RecipeKey): Promise<Recipe> => {
        const filePath = getFilepathForRecipeKey(recipeKey);

        const fileExists = await RNFS.exists(filePath);
        if (!fileExists) {
            return Promise.reject('File does not exist!');
        }

        const fileData = await RNFS.readFile(filePath, 'utf8');
        const recipe: Recipe = JSON.parse(fileData);

        /// some old recipes might not have the "custom" property, so we default it
        /// to an empty array:
        recipe.custom = recipe.custom || [];

        return recipe;
    };

    /// Saves all the pre-packaged recipes to the file-system:
    export const savePreloadedRecipes = async (): Promise<void> => {
        try {
            await ensureRecipeDirectoryExists();
        } catch (e) {
            return Promise.reject(e);
        }
        const latestLocalRecipeMetas = (await loadLatestLocalRecipeKeys()).map((rk) => RS.reverseKey(rk));

        const promises = defaultRecipes.map((r) => {
            return new Promise<void>(async (resolve) => {
                /// If we've already saved the same (or later) local recipe, skip it.
                const existingNewerRecipeMeta = latestLocalRecipeMetas.filter(
                    (meta) => meta.id === r.id && meta.ts >= r.ts,
                );
                if (existingNewerRecipeMeta.length === 0) {
                    await RecipeRepo.saveRecipe(r);
                }
                resolve();
            });
        });
        await Promise.all(promises);
    };

    /// Saves recipe, will overwrite existing file if it already exists.
    export const saveRecipe = async (recipe: Recipe): Promise<Boolean> => {
        const key = getRecipeKey(recipe);
        const filePath = getFilepathForRecipeKey(key);
        const fileData = JSON.stringify(recipe);

        const fileExists = await RNFS.exists(filePath);
        if (fileExists) {
            // TODO: reconsider returning false here when the recipe already exists
            return false;
        }

        try {
            await RNFS.writeFile(filePath, fileData, 'utf8');
            return true;
        } catch (e) {
            console.warn(JSON.stringify(e));
            return false;
        }
    };

    /// Loads the latest version of each recipe from the filesystem
    export const loadLatestLocalRecipes = async (): Promise<Recipe[]> => {
        const latestRecipeKeys = await RecipeRepo.loadLatestLocalRecipeKeys();
        const loadLatest = latestRecipeKeys.map((key) => RecipeRepo.loadLocalRecipeWithKey(key));
        return await Promise.all(loadLatest);
    };

    export const loadLatestLocalRecipeKeys = async (): Promise<RecipeKey[]> => {
        const folderPath = `${RNFS.DocumentDirectoryPath}/${recipeFolderName}/`;
        const allRecipeFiles = await RNFS.readDir(folderPath);
        const latestRecipeInfos: { id: string; ts: number }[] = [];

        allRecipeFiles.forEach((file) => {
            const key = getRecipeKeyFromFileName(file.name);
            if (!key) {
                return; /* continue to next */
            }

            const meta = RS.reverseKey(key);

            // We received error reports from some clients that apparently have recipes without a timestamp saved... whoops?
            if (!meta.ts) {
                meta.ts = 0;    // Just default to 0... this isn't _great_, but if the id is valid, maybe it'll return a later version.
            }
            const existingIndex = latestRecipeInfos.findIndex((r) => r.id === meta.id);
            if (existingIndex >= 0) {
                // If we already have a recipe w/ this id, keep the newer one
                if (latestRecipeInfos[existingIndex].ts < meta.ts) {
                    latestRecipeInfos[existingIndex] = meta;
                }
            } else {
                // If this is the first recipe w/ this id, keep it
                latestRecipeInfos.push(meta);
            }
        });

        return latestRecipeInfos.map((info) => RS.getKey(info));
    };

    const ensureRecipeDirectoryExists = async (): Promise<void> => {
        const dirPath = `${RNFS.DocumentDirectoryPath}/${recipeFolderName}`;
        const fileExists = await RNFS.exists(dirPath);
        if (!fileExists) {
            try {
                await RNFS.mkdir(dirPath);
            } catch (e) {
                console.warn(e);
                return Promise.reject(e);
            }
        }
    };

    const getFilepathForRecipeKey = (recipeKey: RecipeKey): string => {
        const fileName = recipeKey + '.json';
        const filePath = `${RNFS.DocumentDirectoryPath}/${recipeFolderName}/${fileName}`;
        // console.warn(filePath);
        return filePath;
    };

    const getRecipeKeyFromFileName = (name: string): RecipeKey | null => {
        if (!name.endsWith('.json')) {
            return null;
        }
        return Util.removeSuffixIfPresent('.json', name);
    };

    export const deleteRecipeWithId = async (recipeKey: RecipeKey): Promise<boolean> => {
        const filePath = getFilepathForRecipeKey(recipeKey);
        const fileExists = await RNFS.exists(filePath);
        if (!fileExists) {
            return false;
        }

        try {
            await RNFS.unlink(filePath);
            return true;
        } catch (e) {
            return Promise.reject(e);
        }
    };
}
