"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RNFS = require("react-native-fs");
const Big3_1 = require("repository/recipes/Big3");
const recipeFolderName = 'recipes';
const defaultRecipes = [Big3_1.big3];
class RecipeRepository {
    constructor() {
        /// Attempts to load the recipes from the Recipe folder
        this.loadLocalRecipeWithId = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            const filePath = this.getFilepathForRecipeId(recipeId);
            const fileExists = yield RNFS.exists(filePath);
            if (!fileExists) {
                return Promise.reject('File does not exist!');
            }
            const fileData = yield RNFS.readFile(filePath, 'utf8');
            const recipe = JSON.parse(fileData);
            // TODO: validate recipe object here
            return recipe;
        });
        /// Saves all the pre-packaged recipes to the file-system:
        this.savePreloadedRecipes = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureRecipeDirectoryExists();
            }
            catch (e) {
                return Promise.reject(e);
            }
            const promises = defaultRecipes.map(r => {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    yield this.saveRecipe(r);
                    resolve();
                }));
            });
            yield Promise.all(promises);
        });
        /// Saves recipe, will overwrite existing file if it already exists.
        this.saveRecipe = (recipe) => __awaiter(this, void 0, void 0, function* () {
            const filePath = this.getFilepathForRecipeId(recipe.objectId);
            const fileData = JSON.stringify(recipe);
            const fileExists = yield RNFS.exists(filePath);
            if (fileExists) {
                // TODO: reconsider returning false here when the recipe already exists
                return false;
            }
            try {
                yield RNFS.writeFile(filePath, fileData, 'utf8');
                return true;
            }
            catch (e) {
                console.warn(JSON.stringify(e));
                return false;
            }
        });
        this.ensureRecipeDirectoryExists = () => __awaiter(this, void 0, void 0, function* () {
            const dirPath = `${RNFS.DocumentDirectoryPath}/${recipeFolderName}`;
            const fileExists = yield RNFS.exists(dirPath);
            if (!fileExists) {
                try {
                    yield RNFS.mkdir(dirPath);
                }
                catch (e) {
                    console.warn(e);
                    return Promise.reject(e);
                }
            }
        });
        this.deleteRecipeWithId = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            const filePath = this.getFilepathForRecipeId(recipeId);
            const fileExists = yield RNFS.exists(filePath);
            if (!fileExists) {
                return false;
            }
            try {
                yield RNFS.unlink(filePath);
                return true;
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    getFilepathForRecipeId(recipeId) {
        const fileName = recipeId + '.of';
        const filePath = `${RNFS.DocumentDirectoryPath}/${recipeFolderName}/${fileName}`;
        console.warn(filePath);
        return filePath;
    }
}
exports.RecipeRepository = RecipeRepository;
//# sourceMappingURL=RecipeRepository.js.map