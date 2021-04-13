import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { PDPickerRouteProps, PickerScreen } from '~/screens/picker/PickerScreen';
import {
    ScoopDetailsRouteProps, ScoopDetailsScreen
} from '~/screens/settings/scoops/ScoopDetailsScreen';

import { NavigationContainer } from '@react-navigation/native';

import { PDCardNavigator } from './PDCardNavigator';
import { PDPoolNavigator } from './PDPoolNavigator';

// This defines the navigation params accepted by each possible screen in PDRootNavigator
export type PDRootNavigatorParams = {
    PDPoolNavigator: undefined;
    PickerScreen: PDPickerRouteProps;
    PDCardNavigator: undefined;
    ScoopDetails: ScoopDetailsRouteProps;
};

const RootStack = createNativeStackNavigator<PDRootNavigatorParams>();

export const PDRootNavigator = (): JSX.Element => {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={ {
                    stackPresentation: 'formSheet',
                    headerShown: false,
                } }>
                <RootStack.Screen name="PDCardNavigator" component={ PDCardNavigator } />
                <RootStack.Screen
                    name="PickerScreen"
                    component={ PickerScreen }
                    options={ { stackPresentation: 'fullScreenModal' } }
                />
                <RootStack.Screen name="ScoopDetails" component={ ScoopDetailsScreen } />
                <RootStack.Screen name="PDPoolNavigator" component={ PDPoolNavigator } />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
