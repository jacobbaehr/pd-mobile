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
import { Util } from '~/services/Util';

import { useApolloClient } from '@apollo/react-hooks';

import { RealmUtil } from '../services/RealmUtil';

export const useRealmPoolsHook = (): Pool[] => {
    const [data, setData] = useState<Pool[]>(() => {
        const realmPools = Database.loadPools();
        const parserData = RealmUtil.poolToPojo(realmPools);
        return parserData;
    });

    // This runs around the time when ComponentDidMount used to be called
    useEffect(() => {
        const handleChange = (newData: Realm.Collection<Pool>) => {
            const parserData = RealmUtil.poolToPojo(newData);
            setData(parserData);
        };

        const dataQuery = Database.loadPools();

        dataQuery.addListener(handleChange);

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners();
        };
    }, []);

    return data; // this hook will return only the data from realm
};

export const useRealmPoolHistoryHook = (poolId: string): LogEntry[] => {
    const [data, setData] = useState<LogEntry[]>(() => {
        const reamlLogEntry = Database.loadLogEntriesForPool(poolId, null, true);
        const parserData = RealmUtil.logEntryToPojo(reamlLogEntry);
        return parserData;
    });

    // This runs around the time when ComponentDidMount used to be called
    useEffect(() => {
        const handleChange = (newData: Realm.Collection<LogEntry>) => {
            const parserData = RealmUtil.logEntryToPojo(newData);

            setData(parserData);
        };

        const dataQuery = Database.loadLogEntriesForPool(poolId, null, true);

        dataQuery.addListener(handleChange);

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners();
        };
    }, [poolId]);

    return data; // this hook will return only the data from realm
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

/// This pulls all target range overrides for a given pool
export const useRealmPoolTargetRangesForPool = (poolId: string): TargetRangeOverride[] => {
    const [data, setData] = useState<TargetRangeOverride[]>(() => {
        const realmCustomTarget = Database.loadCustomTargets(poolId);
        const parserData = RealmUtil.customTargetToPojo(realmCustomTarget);
        return parserData;
    });

    useEffect(() => {
        const handleChange = (newData: Realm.Collection<TargetRangeOverride>) => {
            const parserData = RealmUtil.customTargetToPojo(newData);

            setData(parserData);
        };
        const dataQuery = Database.loadCustomTargets(poolId);
        dataQuery.addListener(handleChange);

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners();
        };
    }, [poolId]);

    return data;
};

/// This pulls a single target range override for a given pool & variable.
export const useRealmPoolTargetRange = (poolId: string, variable: string): TargetRangeOverride | null => {
    const data = useRealmPoolTargetRangesForPool(poolId);
    return Util.firstOrNull(data.filter((ct) => ct.var === variable));
};
