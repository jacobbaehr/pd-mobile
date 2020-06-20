import gql from 'graphql-tag';
import { ListRecipes, ListRecipes_listRecipes } from './generated/ListRecipes';
import { useQuery } from "@apollo/react-hooks";
import { QueryResult } from '@apollo/react-common';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { Recipe } from '~/models/recipe/Recipe';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Recipe_latestRecipe } from './generated/Recipe';
import { RecipeTransformer } from './RecipeTransformer';

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

    static fetchRecipe = async (id: string, client: ApolloClient<NormalizedCacheObject>): Promise<Recipe> => {
        const query = gql`
            query Recipe($id: String!) { 
                latestRecipe(id: $id) {
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
        const result = await client.query<Recipe_latestRecipe>({
            query,
            variables: { id }
        });
        if (result.data) {
            return RecipeTransformer.fromAPI(result.data);
        }
        return Promise.reject('');
    }
}
