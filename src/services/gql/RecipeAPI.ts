import gql from 'graphql-tag';
import { ListRecipes } from './generated/ListRecipes';
import { useQuery } from "@apollo/react-hooks";
import { QueryResult } from '@apollo/react-common';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { Recipe } from '~/models/recipe/Recipe';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { FetchRecipeVariables } from './generated/FetchRecipe';
import { RecipeTransformer } from './RecipeTransformer';
import { RS } from '../RecipeUtil';
import { FetchRecipe } from './generated/FetchRecipe';

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
            fetchPolicy: 'no-cache'
        });
        if (result.data) {
            return RecipeTransformer.fromAPI(result.data.recipeVersion);
        }
        return Promise.reject('');
    }
}
