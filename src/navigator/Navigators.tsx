import * as React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { PoolScreen } from '~/screens/pool/PoolScreen';
import { PoolHistoryScreen } from '~/screens/trends/PoolHistoryScreen';
import { PoolListScreen } from '~/screens/poolList/PoolListScreen';
import { ReadingListScreen } from '~/screens/readings/ReadingListScreen';
import { RecipeListScreen } from '~/screens/recipes/RecipeListScreen';
import { TreatmentListScreen } from '~/screens/treatments/TreatmentListScreen';
import { EditPoolScreen } from '~/screens/editPool/EditPoolScreen';
import { PickerScreen, PDPickerRouteProps } from '~/screens/picker/PickerScreen';
import { RecipeScreen } from '~/screens/recipes/RecipeScreen';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { SettingsScreen } from '~/screens/settings/SettingsScreen';
import { BuyScreen } from '~/screens/buy/BuyScreen';
import { Scoop } from '~/models/Scoop';
import { ScoopDetailsScreen, ScoopDetailsRouteProps } from '~/screens/settings/scoops/ScoopDetailsScreen';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();
const Stack = createStackNavigator<PDNavStackParamList>();

const MainStack = (): JSX.Element => {
    return (
        <Stack.Navigator headerMode={ 'none' } mode={ 'card' }>
            <Stack.Screen name="PoolList" component={ PoolListScreen } />
            <Stack.Screen name="CreatePool" component={ EditPoolScreen } />
            <Stack.Screen name="PoolScreen" component={ PoolScreen } />
            <Stack.Screen name="EditPool" component={ EditPoolScreen } />
            <Stack.Screen name="ReadingList" component={ ReadingListScreen } />
            <Stack.Screen name="TreatmentList" component={ TreatmentListScreen } />
            <Stack.Screen name="RecipeList" component={ RecipeListScreen } />
            <Stack.Screen name="RecipeDetails" component={ RecipeScreen } />
            <Stack.Screen name="PoolHistory" component={ PoolHistoryScreen } />
            <Stack.Screen name="Settings" component={ SettingsScreen } />
            <Stack.Screen name="Buy" component={ BuyScreen } />

            {/* <Stack.Screen name="PurchasePro" component={ PurchaseProStack } /> */ }
        </Stack.Navigator>
    );
}

const ModalScreens = (): JSX.Element => {
    return (
        <Stack.Navigator headerMode={ 'none' } mode={ 'modal' }>
            <Stack.Screen name="Main" component={ MainStack } />
            <Stack.Screen name="PickerScreen" component={ PickerScreen } />
            <Stack.Screen name="ScoopDetails" component={ ScoopDetailsScreen } />
        </Stack.Navigator>
    );
}

export const PDNavStack = (): JSX.Element => {
    return (
        <NavigationContainer ref={ navigationRef }>
            { ModalScreens() }
        </NavigationContainer>
    );
};

export type PDNavStackParamList = {
    PoolList: undefined;
    CreatePool: undefined;
    PoolScreen: undefined;
    EditPool: undefined;
    ReadingList: undefined;
    TreatmentList: undefined;
    Settings: undefined;
    RecipeList: { prevScreen: 'ReadingList' | 'PoolScreen' };
    RecipeDetails: { recipeKey: RecipeKey, prevScreen: 'ReadingList' | 'PoolScreen' };
    PoolHistory: undefined;
    Buy: undefined;
    PickerScreen: PDPickerRouteProps;
    Main: undefined;
    ScoopDetails: ScoopDetailsRouteProps;
};
