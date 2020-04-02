import { RecipeMeta } from 'models/recipe/RecipeMeta';

/** Response of GET request to /api/v1/recipes */
export interface GetRecipesResponse {
    list: RecipeMeta[];
}