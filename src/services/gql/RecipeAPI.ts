import gql from 'graphql-tag';
import { ListRecipes, ListRecipes_listRecipes } from './generated/ListRecipes';
import { useQuery } from "@apollo/react-hooks";
import { QueryResult } from '@apollo/react-common';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { Recipe } from '~/models/recipe/Recipe';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { RecipeVariables } from './generated/Recipe';
import { RecipeTransformer } from './RecipeTransformer';
import { RS } from '../RecipeService';
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
            }
        }
        `;
        return useQuery<ListRecipes>(query, { fetchPolicy: 'network-only' });
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
        const result = await client.query<FetchRecipe, RecipeVariables>({
            query,
            variables
        });
        if (result.data) {
            return RecipeTransformer.fromAPI(result.data.recipeVersion);
        }
        return Promise.reject('');
    }
}
