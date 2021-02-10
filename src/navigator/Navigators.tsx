import * as React from 'react';
import { TargetRange } from '~/models/recipe/CustomTarget';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { BuyScreen } from '~/screens/buy/BuyScreen';
import CustomTargetsScreen from '~/screens/customTargets/CustomTargetsScreen';
import { EditPoolScreen } from '~/screens/editPool/EditPoolScreen';
import { PDPickerRouteProps, PickerScreen } from '~/screens/picker/PickerScreen';
import { PoolScreen } from '~/screens/pool/PoolScreen';
import { PoolListScreen } from '~/screens/poolList/PoolListScreen';
import { ReadingListScreen } from '~/screens/readings/ReadingListScreen';
import { RecipeListScreen } from '~/screens/recipes/RecipeListScreen';
import { RecipeScreen } from '~/screens/recipes/RecipeScreen';
import { ScoopDetailsRouteProps, ScoopDetailsScreen } from '~/screens/settings/scoops/ScoopDetailsScreen';
import { SettingsScreen } from '~/screens/settings/SettingsScreen';
import { TreatmentListScreen } from '~/screens/treatments/TreatmentListScreen';
import { PoolHistoryScreen } from '~/screens/trends/PoolHistoryScreen';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

export type PDNavStackParamList = {
    PoolList: undefined;
    CreatePool: undefined;
    PoolScreen: undefined;
    EditPool: undefined;
    ReadingList: undefined;
    TreatmentList: undefined;
    Settings: undefined;
    RecipeList: { prevScreen: 'ReadingList' | 'PoolScreen' };
    RecipeDetails: { recipeKey: RecipeKey; prevScreen: 'ReadingList' | 'PoolScreen' };
    PoolHistory: undefined;
    Buy: undefined;
    PickerScreen: PDPickerRouteProps;
    Main: undefined;
    ScoopDetails: ScoopDetailsRouteProps;
    CustomTargets: { customTargets: TargetRange[] };
};

export type PDNavigationProps = StackNavigationProp<PDNavStackParamList>;
export type PDRouteProps =
    | RouteProp<PDNavStackParamList, 'CustomTargets'>
    | RouteProp<PDNavStackParamList, 'RecipeList'>
    | RouteProp<PDNavStackParamList, 'PickerScreen'>
    | RouteProp<PDNavStackParamList, 'ScoopDetails'>
    | RouteProp<PDNavStackParamList, 'RecipeDetails'>;

const Stack = createStackNavigator<PDNavStackParamList>();

const MainStack = (): JSX.Element => {
    return (
        <Stack.Navigator headerMode="none" mode="card">
            <Stack.Screen name="PoolList" component={PoolListScreen} />
            <Stack.Screen name="CreatePool" component={EditPoolScreen} />
            <Stack.Screen name="PoolScreen" component={PoolScreen} />
            <Stack.Screen name="EditPool" component={EditPoolScreen} />
            <Stack.Screen name="ReadingList" component={ReadingListScreen} />
            <Stack.Screen name="TreatmentList" component={TreatmentListScreen} />
            <Stack.Screen name="RecipeList" component={RecipeListScreen} />
            <Stack.Screen name="RecipeDetails" component={RecipeScreen} />
            <Stack.Screen name="PoolHistory" component={PoolHistoryScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Buy" component={BuyScreen} />
            <Stack.Screen name="CustomTargets" component={CustomTargetsScreen} />
            {/* <Stack.Screen name="PurchasePro" component={ PurchaseProStack } /> */}
        </Stack.Navigator>
    );
};

export const PDNavStack = (): JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={'none'} mode={'modal'}>
                <Stack.Screen name="Main" component={MainStack} />
                <Stack.Screen name="PickerScreen" component={PickerScreen} />
                <Stack.Screen name="ScoopDetails" component={ScoopDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
