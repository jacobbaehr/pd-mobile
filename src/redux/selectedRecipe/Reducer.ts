import { createReducer } from '@reduxjs/toolkit';

import { updateSelectedRecipe } from './Actions';
import { RecipeKey } from '~/models/recipe/RecipeKey';

export const selectedRecipeReducer = createReducer(null as RecipeKey | null, (builder) => {
    builder
        .addCase(updateSelectedRecipe, (state, action) => {
            state = action.payload;
            return state;
        });
});
