import { createReducer } from '@reduxjs/toolkit';

import { beginQuickStart, endQuickStart } from './Actions';

/// isQuickStart is just a boolean value in the app state
export const quickStartReducer = createReducer(false, (builder) => {
    builder
        .addCase(beginQuickStart, () => {
            return true;
        })
        .addCase(endQuickStart, () => {
            return false;
        });
});
