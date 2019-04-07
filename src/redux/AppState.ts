import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import { ReadingEntry } from 'models/logs/ReadingEntry';
import { TreatmentEntry } from 'models/logs/TreatmentEntry';
import { Pool } from 'models/Pool';
import { User } from 'models/User';

import { hasValidSubscriptionReducer } from './hasValidSubscription/Reducer';
import { outputsReducer } from './outputs/Reducer';
import { poolsLastUpdatedReducer } from './poolsLastUpdated/Reducer';
import { readingEntriesReducer } from './readingEntries/Reducer';
import { recipeIdReducer } from './recipeId/Reducer';
import { selectedPoolReducer } from './selectedPool/Reducer';
import { userReducer } from './user/Reducer';

// Describes the shape of the application redux state.
export interface AppState {
    // All of the readings that a user has recorded
    readingEntries: ReadingEntry[];

    // All of the outputs currently perscribed
    outputs: TreatmentEntry[];

    // The currently selected swimming pool, if any
    selectedPool?: Pool;

    // The currently selected recipe, if any
    recipeId: string;

    // This increments whenever we update the list of pools
    poolsLastUpdated: number;

    // User object including cognito user returned after user signs in
    user: User;

    // Whether or not the user has a valid subscription
    hasValidSubscription: boolean;
}

const initialAppState: AppState = {
    readingEntries: [],
    outputs: [],
    selectedPool: null,
    recipeId: '002_initial_big3',
    poolsLastUpdated: 0,
    user: null,
    hasValidSubscription: false
};

const reducer = combineReducers({
    readingEntries: readingEntriesReducer,
    outputs: outputsReducer,
    selectedPool: selectedPoolReducer,
    recipeId: recipeIdReducer,
    poolsLastUpdated: poolsLastUpdatedReducer,
    user: userReducer,
    hasValidSubscription: hasValidSubscriptionReducer
});

// apply all middleware for application
const middleware = applyMiddleware(ReduxThunk);

export const store = createStore(reducer, initialAppState, middleware);

export const dispatch = store.dispatch;
