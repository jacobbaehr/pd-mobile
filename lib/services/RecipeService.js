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
const RecipesApiManager_1 = require("api/recipes/RecipesApiManager");
const RecipeRepository_1 = require("repository/RecipeRepository");
class RecipeService {
    constructor() {
        this.resolveRecipeWithId = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            console.log(`loading recipe ${recipeId}`);
            try {
                const localRecipe = yield this.recipeRepo.loadLocalRecipeWithId(recipeId);
                console.log('loaded locally!');
                return localRecipe;
            }
            catch (e) {
                console.log('recipe not found locally, fetching remotely...');
            }
            try {
                const recipe = yield this.fetchRecipeRemotely(recipeId);
                return recipe;
            }
            catch (e) {
                console.log('Could not fetch recipe remotely!');
                return Promise.reject(e);
            }
        });
        this.fetchRecipeList = () => __awaiter(this, void 0, void 0, function* () {
            const getRecipesResponse = yield this.recipeApiManager.getDefaultRecipes();
            if (getRecipesResponse.error) {
                console.log(getRecipesResponse.error);
                return [];
            }
            else {
                console.log('response: ');
                console.log(getRecipesResponse.response);
                return getRecipesResponse.response.data.list;
            }
        });
        this.fetchRecipeRemotely = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            // TODO: implement this
            return Promise.reject('not yet implemented!');
        });
        this.recipeRepo = new RecipeRepository_1.RecipeRepository();
        this.recipeApiManager = new RecipesApiManager_1.RecipesApiManager('https://api.pooldash.com/v1/recipes');
    }
}
exports.RecipeService = RecipeService;
//# sourceMappingURL=RecipeService.js.map