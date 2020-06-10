import * as RNFS from 'react-native-fs';
import { Recipe } from '~/models/recipe/Recipe';
import { big3 } from '~/repository/recipes/Big3';
import { RecipeKey, getRecipeKey } from '~/models/recipe/RecipeKey';

const recipeFolderName = 'recipes';
const defaultRecipes: Recipe[] = [big3];

export class RecipeRepo {

    /// Attempts to load the recipes from the Recipe folder
    static loadLocalRecipeWithKey = async (recipeKey: RecipeKey): Promise<Recipe> => {
        const filePath = RecipeRepo.getFilepathForRecipeKey(recipeKey);

        const fileExists = await RNFS.exists(filePath);
        if (!fileExists) {
            return Promise.reject('File does not exist!');
        }

        const fileData = await RNFS.readFile(filePath, 'utf8');
        const recipe: Recipe = JSON.parse(fileData);
        // TODO: validate recipe object here

        return recipe;
    }

    /// Saves all the pre-packaged recipes to the file-system:
    static savePreloadedRecipes = async () => {
        try {
            await RecipeRepo.ensureRecipeDirectoryExists();
        } catch (e) {
            return Promise.reject(e);
        }
        const promises = defaultRecipes.map(r => {
            return new Promise(async (resolve) => {
                await RecipeRepo.saveRecipe(r);
                resolve();
            });
        });
        await Promise.all(promises);
    }

    /// Saves recipe, will overwrite existing file if it already exists.
    private static saveRecipe = async (recipe: Recipe): Promise<Boolean> => {
        const key = getRecipeKey(recipe);
        const filePath = RecipeRepo.getFilepathForRecipeKey(key);
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
    }

    private static ensureRecipeDirectoryExists = async () => {
        const dirPath = `${RNFS.DocumentDirectoryPath}/${recipeFolderName}`
        const fileExists = await RNFS.exists(dirPath);
        if (!fileExists) {
            try {
                await RNFS.mkdir(dirPath);
            } catch (e) {
                console.warn(e);
                return Promise.reject(e);
            }
        }
    }

    private static getFilepathForRecipeKey(recipeKey: RecipeKey): string {
        const fileName = recipeKey + '.json';
        const filePath = `${RNFS.DocumentDirectoryPath}/${recipeFolderName}/${fileName}`;
        // console.warn(filePath);
        return filePath;
    }

    private static deleteRecipeWithId = async (recipeKey: RecipeKey): Promise<boolean> => {
        const filePath = RecipeRepo.getFilepathForRecipeKey(recipeKey);
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
    }
}
