import { useRealmPoolsHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';

export const usePoolSearch = (rawSearchInput: string): Pool[] => {
    const pools = useRealmPoolsHook();
    const cleanedUserInput = rawSearchInput.trim().toLowerCase();
    const searchedPools = pools.filter(p => p.name.toLowerCase().includes(cleanedUserInput));
    return rawSearchInput.length > 0 ? searchedPools : pools;
};
