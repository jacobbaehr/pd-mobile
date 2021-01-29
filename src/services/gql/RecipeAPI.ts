import gql from 'graphql-tag';
import { ListRecipes } from './generated/ListRecipes';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { Recipe } from '~/models/recipe/Recipe';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { FetchRecipeVariables } from './generated/FetchRecipe';
import { RecipeTransformer } from './RecipeTransformer';
import { RS } from '../RecipeUtil';
import { FetchRecipe } from './generated/FetchRecipe';
import { FetchLatestRecipeMeta, FetchLatestRecipeMetaVariables } from './generated/FetchLatestRecipeMeta';

export class RecipeAPI {
    static useRecipeList = (): QueryResult<ListRecipes> => {
        const query = gql`
            query ListRecipes {
                listRecipes {
                    id
                    name
                    desc
                    ts
                    appVersion
                }
            }
        `;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useQuery<ListRecipes>(query, { fetchPolicy: 'no-cache' });
    };

    static fetchRecipe = async (key: RecipeKey, client: ApolloClient<NormalizedCacheObject>): Promise<Recipe> => {
        const query = gql`
            query FetchRecipe($id: String!, $ts: Float!) {
                recipeVersion(id: $id, ts: $ts) {
                    id
                    author_id
                    author_username
                    name
                    description
                    ts
                    appVersion
                    readings {
                        name
                        var
                        sliderMin
                        sliderMax
                        idealMin
                        idealMax
                        type
                        decimalPlaces
                        units
                        defaultValue
                    }
                    treatments {
                        name
                        var
                        formula
                        type
                        concentration
                    }
                }
            }
        `;
        const variables = RS.reverseKey(key);
        console.log('Variable: ', JSON.stringify(variables));
        const result = await client.query<FetchRecipe, FetchRecipeVariables>({
            query,
            variables,
            fetchPolicy: 'no-cache',
        });
        if (result.data) {
            return RecipeTransformer.fromAPI(result.data.recipeVersion);
        }
        return Promise.reject('');
    };

    /// Runs a cheap query to fetch the metadata of the most recent version for a particular recipe, and returns the latest key.
    static fetchLatestKeyForRecipe = async (
        key: RecipeKey,
        client: ApolloClient<NormalizedCacheObject>,
    ): Promise<RecipeKey> => {
        const query = gql`
            query FetchLatestRecipeMeta($id: String!) {
                latestPublishedMeta(id: $id) {
                    ts
                }
            }
        `;
        const variables = {
            id: RS.reverseKey(key).id,
        };
        const result = await client.query<FetchLatestRecipeMeta, FetchLatestRecipeMetaVariables>({
            query,
            variables,
            fetchPolicy: 'no-cache',
        });
        if (!result.data) {
            return Promise.reject('Recipe meta not found on server');
        }
        console.log('fetching latest for key: ' + key);
        console.log('result: ' + result.data.latestPublishedMeta.ts);
        return RS.getKey({ id: variables.id, ts: result.data.latestPublishedMeta.ts });
    };
}
