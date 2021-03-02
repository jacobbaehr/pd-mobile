// import { AnyAction } from 'redux';

import { Pool } from '~/models/Pool';

import { createReducer } from '@reduxjs/toolkit';

import { clearPool, selectPool, updatePool } from './Actions';

export const selectedPoolReducer = createReducer(null as Pool | null, (builder) => {
    builder
        .addCase(selectPool, (state, action) => {
            state = action.payload;
            return state;
        })
        .addCase(clearPool, (state) => {
            state = null;
            return state;
        })
        .addCase(updatePool.fulfilled, (state, action) => {
            state = action.payload;
            return state;
        });
});
