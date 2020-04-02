import * as React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ConfirmPurchaseScreen } from '~/screens/confirmPurchase/ConfirmPurchaseScreen';
import { PoolScreen } from '~/screens/pool/PoolScreen';
import { PoolHistoryScreen } from '~/screens/poolHistory/PoolHistoryScreen';
import { PoolListScreen } from '~/screens/poolList/PoolListScreen';
import { ReadingDetailsScreen } from '~/screens/readings/ReadingDetailsScreen';
import { ReadingListScreen } from '~/screens/readings/ReadingListScreen';
import { RecipeListScreen } from '~/screens/recipes/RecipeListScreen';
import { ResultsScreen } from '~/screens/results/ResultsScreen';
import { AuthenticationScreen } from '~/screens/AuthenticationScreen';
import { CalculationSettingsScreen } from '~/screens/CalculationSettingsScreen';
import { EditPoolScreen } from '~/screens/EditPoolScreen';
import { RegistrationVerificationScreen } from '~/screens/RegistrationVerificationScreen';
import { User } from '~/models/User';
import { ReadingEntry } from '~/models/logs/ReadingEntry';
import { Reading } from '~/models/recipe/Reading';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();
const Stack = createStackNavigator<PDNavStackParamList>();

const PurchaseProStack = (): JSX.Element => {
    return (
        <Stack.Navigator mode={ 'card' }>
            <Stack.Screen name="Authentication" component={ AuthenticationScreen } />
            <Stack.Screen name="RegistrationVerification" component={ RegistrationVerificationScreen } />
            <Stack.Screen name="ConfirmPurchase" component={ ConfirmPurchaseScreen } />
        </Stack.Navigator>
    );
};

export const PDNavStack = (): JSX.Element => {
    return (
        <NavigationContainer ref={ navigationRef }>
            <Stack.Navigator headerMode={ 'none' } mode={ 'card' }>
                <Stack.Screen name="PoolList" component={ PoolListScreen } />
                <Stack.Screen name="CreatePool" component={ EditPoolScreen } />
                <Stack.Screen name="PoolScreen" component={ PoolScreen } />
                <Stack.Screen name="EditPool" component={ EditPoolScreen } />
                <Stack.Screen name="ReadingList" component={ ReadingListScreen } />
                <Stack.Screen name="ReadingDetails" component={ ReadingDetailsScreen } />
                <Stack.Screen name="Results" component={ ResultsScreen } />
                <Stack.Screen name="Settings" component={ CalculationSettingsScreen } />
                <Stack.Screen name="RecipeList" component={ RecipeListScreen } />
                <Stack.Screen name="PoolHistory" component={ PoolHistoryScreen } />
                <Stack.Screen name="PurchasePro" component={ PurchaseProStack } />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export type PDNavStackParamList = {
    PoolList: undefined;
    CreatePool: undefined;
    PoolScreen: undefined;
    EditPool: undefined;
    ReadingList: undefined;
    ReadingDetails: { reading: Reading, readingEntry?: ReadingEntry };
    Results: undefined;
    Settings: undefined;
    RecipeList: { poolName: string };
    PoolHistory: undefined;
    PurchasePro: { screenType: 'Login' | 'Register' };
    // purchase pro stack
    Authentication: { screenType: 'Login' | 'Register' };
    RegistrationVerification: { email: string, password: string };
    ConfirmPurchase: { user: User };
};
