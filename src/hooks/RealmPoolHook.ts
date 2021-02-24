import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { useEffect, useState } from 'react';
import Realm from 'realm';
import { LogEntry } from '~/models/logs/LogEntry';
import { Pool } from '~/models/Pool';
import { TargetRangeOverride } from '~/models/Pool/TargetRangeOverride';
import { Recipe } from '~/models/recipe/Recipe';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { Database } from '~/repository/Database';
import { RecipeService } from '~/services/RecipeService';

import { useApolloClient } from '@apollo/react-hooks';

export const useRealmPoolsHook = (): Realm.Collection<Pool> => {
    const [data, setData] = useState({
        data: Database.loadPools(),
        a: Date.now(),
    });

    // This runs around the time when ComponentDidMount used to be called
    useEffect(() => {
        const handleChange = (newData: Realm.Collection<Pool>) => {
            setData({
                data: newData,
                // The date is here to trigger a rerender on each change (the list is shallow-compared)
                a: Date.now(),
            });
        };
        const dataQuery = Database.loadPools();
        dataQuery.addListener(handleChange);

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners();
        };
    }, []);

    return data.data; // this hook will return only the data from realm
};

export const useRealmPoolHistoryHook = (poolId: string): Realm.Collection<LogEntry> => {
    const [data, setData] = useState({
        data: Database.loadLogEntriesForPool(poolId, null, true),
        a: Date.now(),
    });

    // This runs around the time when ComponentDidMount used to be called
    useEffect(() => {
        const handleChange = (newData: Realm.Collection<LogEntry>) => {
            setData({
                data: newData,
                // The date is here to trigger a rerender on each change (the list is shallow-compared)
                a: Date.now(),
            });
        };
        const dataQuery = Database.loadLogEntriesForPool(poolId, null, true);
        dataQuery.addListener(handleChange);

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners();
        };
    }, [poolId]);

    return data.data; // this hook will return only the data from realm
};

// WARNING: this is susceptible to race-conditions (if you request a remote recipe, and then a local one, the remote one might finish last & stomp the second call).
export const useRecipeHook = (recipeKey: RecipeKey): Recipe | null => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const client = useApolloClient() as ApolloClient<NormalizedCacheObject>; // TODO: type-casting? ugh.

    useEffect(() => {
        try {
            const loadRecipe = async () => {
                const recipeResult = await RecipeService.resolveRecipeWithKey(recipeKey, client);
                // TODO: check async state here for subsequent requests
                setRecipe(recipeResult);
            };
            loadRecipe();
        } catch (e) {
            console.error(e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeKey]);
    return recipe;
};

export const useRealmPoolTargetRange = (poolId: string, variable: string): TargetRangeOverride | undefined => {
    const [data, setData] = useState({
        data: Database.loadCustomTargets(poolId),
        a: Date.now(),
    });

    useEffect(() => {
        const handleChange = (newData: Realm.Collection<TargetRangeOverride>) => {
            setData({
                data: newData,
                a: Date.now(),
            });
        };
        const dataQuery = Database.loadCustomTargets(poolId);
        dataQuery.addListener(handleChange);

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners();
        };
    }, [poolId]);
    //TODO: Sebas: find better way to match with the current Custom target. Could be the objectId?
    const getCurrentTargeRange = data.data.find((ct) => ct.var === variable);

    return getCurrentTargeRange;
};
