// The shape of this is `${recipe.id}|${recipe.ts}`
// Explicitly typealiasing here makes it slightly harder for us to confuse this with a raw id.
export type RecipeKey = string;

// We don't want to import recipe here, but we want this function to be convenient to call.
export const getRecipeKey = (recipe: { id: string, ts: number }): string => {
    return `${recipe.id}|${recipe.ts}`;
}
