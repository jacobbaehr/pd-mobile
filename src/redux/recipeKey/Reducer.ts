import { AnyAction } from 'redux';

import { SelectRecipeAction, SELECT_RECIPE } from './Actions';
import { RecipeKey } from '~/models/recipe/RecipeKey';

export const recipeKeyReducer = (previousState: RecipeKey | null = null, action: AnyAction): RecipeKey | null => {
    switch (action.type) {
        case SELECT_RECIPE:
            const selectRecipeAction = action as SelectRecipeAction;
            return selectRecipeAction.key;
        default:
            return previousState;
    }
};