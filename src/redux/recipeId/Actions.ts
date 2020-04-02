import { AnyAction } from 'redux';

import { Recipe } from 'models/recipe/Recipe';

export const SELECT_RECIPE = 'SELECT_RECIPE';

export interface SelectRecipeAction extends AnyAction {
    recipe: Recipe;
}

// Sets the currently selected recipe
export const selectRecipe = (recipe: Recipe): SelectRecipeAction => {
    return {
        type: SELECT_RECIPE,
        recipe
    };
};