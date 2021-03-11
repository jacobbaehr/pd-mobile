import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { Recipe } from '~/models/recipe/Recipe';
import { RecipeKey } from '~/models/recipe/RecipeKey';

import { QueryResult } from '@apollo/react-common';
import { useQuery } from '@apollo/react-hooks';

import { RS } from '../RecipeUtil';
import { FetchLatestRecipeMeta, FetchLatestRecipeMetaVariables } from './generated/FetchLatestRecipeMeta';
import { FetchRecipe, FetchRecipeVariables } from './generated/FetchRecipe';
import { ListRecipes } from './generated/ListRecipes';
import { RecipeTransformer } from './RecipeTransformer';
import { RecipeMeta } from '~/models/recipe/RecipeMeta';

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
        return useQuery<ListRecipes>(query);
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
                    custom {
                        name
                        var
                        description
                        defaults {
                            wallType
                            min
                            max
                        }
                    }
                }
            }
        `;
        const variables = RS.reverseKey(key);
        console.log('Variable: ', JSON.stringify(variables));
        const result = await client.query<FetchRecipe, FetchRecipeVariables>({
            query,
            variables,
        });
        if (result.data) {
            return RecipeTransformer.fromAPI(result.data.recipeVersion);
        }
        return Promise.reject('');
    };

    /// Runs a cheap query to fetch _some_ of the metadata of the most recent version for a particular recipe (see the Omit fields)
    static fetchLatestMetaForRecipe = async (
        key: RecipeKey,
        client: ApolloClient<NormalizedCacheObject>,
    ): Promise<Omit<RecipeMeta, 'desc' | 'name'>> => {
        const query = gql`
            query FetchLatestRecipeMeta($id: String!) {
                latestPublishedMeta(id: $id) {
                    ts
                    appVersion
                    id
                }
            }
        `;
        const variables = {
            id: RS.reverseKey(key).id,
        };
        const result = await client.query<FetchLatestRecipeMeta, FetchLatestRecipeMetaVariables>({
            query,
            variables,
        });
        if (!result.data) {
            return Promise.reject('Recipe meta not found on server');
        }
        console.log('fetching latest for key: ' + key);
        console.log('result: ' + result.data.latestPublishedMeta.ts);

        return result.data.latestPublishedMeta;
    };
}
