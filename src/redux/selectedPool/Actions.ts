import { Pool } from '~/models/Pool';
import { Database } from '~/repository/Database';

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const saveNewPool = createAsyncThunk('pool/save', (pool: Pool) => {
    Database.saveNewPool(pool);
    return pool;
});

export const updatePool = createAsyncThunk('pool/update', (pool: Pool) => {
    Database.updatePool(pool);
    return pool;
});

export const selectPool = createAction('pool/select', (pool: Pool) => {
    return {
        payload: pool,
    };
});

export const deletePool = createAsyncThunk('pool/delete', (pool: Pool) => {
    Database.deletePool(pool);
});

export const clearPool = createAction('pool/clear');

// const handleUpdateExitingPool = () => {
//     const dispatch = useThunkDispatch();
//     const rawgPool: Partial<Pool> = {
//         name: 'Pair Promgin',
//         objectId: '123123',
//     };

//     const exisitngPool = Pool.make(rawgPool);

//     disaptch(updatePool(exisitngPool));
// };
