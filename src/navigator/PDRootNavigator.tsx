import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { EditPoolPopover, HeaderInfo } from '~/screens/editPool/EditPoolPopover';
import { PDPickerRouteProps, PickerScreen } from '~/screens/picker/PickerScreen';
import { ScoopDetailsRouteProps, ScoopDetailsScreen } from '~/screens/settings/scoops/ScoopDetailsScreen';

import { NavigationContainer } from '@react-navigation/native';

import { PDCardNavigator } from './PDCardNavigator';
import { PDVolumesNavigator } from './PDVolumeNavigator';

// This defines the navigation params accepted by each possible screen in PDRootNavigator
export type PDRootNavigatorParams = {
    EditPoolPopover: { headerInfo: HeaderInfo };
    PickerScreen: PDPickerRouteProps;
    PDCardNavigator: undefined;
    ScoopDetails: ScoopDetailsRouteProps;
    FormSheetNavigator: undefined;
    PDVolumesNavigator: undefined;
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
                <RootStack.Screen name="EditPoolPopover" component={ EditPoolPopover } />
                <RootStack.Screen name="PDVolumesNavigator" component={ PDVolumesNavigator } />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
