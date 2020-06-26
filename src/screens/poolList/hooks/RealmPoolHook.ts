import { useEffect, useState } from "react"
import Realm from 'realm';
import { Pool } from "~/models/Pool";
import { Database } from "~/repository/Database";
import { LogEntry } from "~/models/logs/LogEntry";
import { RecipeKey } from "~/models/recipe/RecipeKey";
import { Recipe } from "~/models/recipe/Recipe";
import { RecipeService } from "~/services/RecipeService";
import { useApolloClient } from "@apollo/react-hooks";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";


export const useRealmPoolsHook = (): Realm.Collection<Pool> => {
    const [data, setData] = useState({
        data: Database.loadPools(),
        a: Date.now()
    });

    // This runs around the time when ComponentDidMount used to be called
    useEffect(() => {
        const handleChange = (newData: Realm.Collection<Pool>) => {
            setData({
                data: newData,
                // The date is here to trigger a rerender on each change (the list is shallow-compared)
                a: Date.now()
            });
        }
        const dataQuery = Database.loadPools();
        dataQuery.addListener(handleChange);

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners()
        }
    }, []);

    return data.data;           // this hook will return only the data from realm
}

export const useRealmPoolHistoryHook = (poolId: string): Realm.Collection<LogEntry> => {
    const [data, setData] = useState({
        data: Database.loadLogEntriesForPool(poolId, null, true),
        a: Date.now()
    });

    // This runs around the time when ComponentDidMount used to be called
    useEffect(() => {
        const handleChange = (newData: Realm.Collection<LogEntry>) => {
            setData({
                data: newData,
                // The date is here to trigger a rerender on each change (the list is shallow-compared)
                a: Date.now()
            });
        }
        const dataQuery = Database.loadLogEntriesForPool(poolId, null, true);
        dataQuery.addListener(handleChange);

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners()
        }
    }, [poolId]);

    return data.data;           // this hook will return only the data from realm
}

// WARNING: this is susceptible to race-conditions (if you request a remote recipe, and then a local one, the remote one might finish last & stomp the second call).
export const useRecipeHook = (recipeKey: RecipeKey): Recipe | null => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;    // TODO: type-casting? ugh.

    useEffect(() => {
        try {
            const loadRecipe = async () => {
                const recipe = await RecipeService.resolveRecipeWithKey(recipeKey, client);
                // TODO: check async state here for subsequent requests
                setRecipe(recipe);
            }
            loadRecipe();
        } catch (e) {
            console.error(e);
        }
    }, [recipeKey]);
    return recipe;
}