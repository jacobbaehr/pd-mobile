import { IPool } from '~/models/Pool';
import { IPoolNoId } from '~/models/Pool/IPool';
import { CreatePoolField } from './create/CreatePoolHelpers';
import { EditPoolField } from './edit/EditPoolHelpers';

type ID = CreatePoolField | EditPoolField

export interface PoolHeader {
    id: ID;
    title?: string;
    description?: string;
}

export const toPoolNoId = (pool: Partial<IPool>): IPoolNoId | null => {
    if (!!pool.name && !!pool.gallons && !!pool.waterType) {
        return {
            name: pool.name ?? 'My Pool',
            gallons: pool.gallons ?? 0,
            waterType: pool.waterType ?? 'chlorine',
            wallType: pool.wallType ?? 'vinyl',
            email: pool.email,
            recipeKey: pool.recipeKey,
        };
    }
    return null;
};

export const toPool = (pool: Partial<IPool>): IPool | null => {
    const poolWithoutId = toPoolNoId(pool);
    if (poolWithoutId && pool.objectId) {
        return {
            ...poolWithoutId,
            objectId: pool.objectId ?? 'abc',
        };
    }
    return null;
};
