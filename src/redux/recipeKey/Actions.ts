import { AnyAction } from 'redux';

import { Recipe } from 'models/recipe/Recipe';
import { RecipeKey, getRecipeKey } from '~/models/recipe/RecipeKey';

export const SELECT_RECIPE = 'SELECT_RECIPE';

export interface SelectRecipeAction extends AnyAction {
    key: RecipeKey
}

// Sets the currently selected recipe
export const selectRecipe = (recipe: Recipe): SelectRecipeAction => {
    const key = getRecipeKey(recipe);
    return {
        type: SELECT_RECIPE,
        key
    };
};