import { createAction } from '@reduxjs/toolkit';
import { RecipeKey } from '~/models/recipe/RecipeKey';

export const updateSelectedRecipe = createAction('recipe/update', (key: RecipeKey | null) => {
    return { payload: key };
});
