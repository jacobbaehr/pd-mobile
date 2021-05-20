import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { PDPickerRouteProps, PickerScreen } from '~/screens/picker/PickerScreen';
import { PopoverRouteProps, PopoverScreen } from '~/screens/popover/PopoverScreen';
import { AddScoopScreen } from '~/screens/settings/scoops/add/AddScoopScreen';
import {
    ScoopDetailsRouteProps, ScoopDetailsScreen
} from '~/screens/settings/scoops/ScoopDetailsScreen';

import { NavigationContainer } from '@react-navigation/native';

import { EditPoolNavigator } from './EditPoolNavigator';
import { PDCardNavigator } from './PDCardNavigator';

// This defines the navigation params accepted by each possible screen in PDRootNavigator
export type PDRootNavigatorParams = {
    EditPoolNavigator: undefined;
    PickerScreen: PDPickerRouteProps;
    PDCardNavigator: undefined;
    ScoopDetails: ScoopDetailsRouteProps;
    AddScoop: undefined
    PopoverScreen: PopoverRouteProps
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
                <RootStack.Screen name="EditPoolNavigator" component={ EditPoolNavigator } />
                <RootStack.Screen name="ScoopDetails" component={ ScoopDetailsScreen } />
                <RootStack.Screen name="AddScoop" component={ AddScoopScreen } />
                <RootStack.Screen name="PopoverScreen" component={ PopoverScreen } />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
