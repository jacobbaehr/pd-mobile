import React from 'react';
import { EditPoolPopover, HeaderInfo } from '~/screens/editPool/components/EditPoolPopover';

import { createStackNavigator } from '@react-navigation/stack';

import { PDVolumesNavigator } from './PDVolumeNavigator';

export type PDEditPoolParams = {
    EditPool: { headerInfo: HeaderInfo };
    PDVolumesNavigator: undefined;
};

const EditPoolStackNavigator = createStackNavigator<PDEditPoolParams>();

export const PDEditPoolNavigator = () => {
    return (
        <EditPoolStackNavigator.Navigator headerMode="none" mode="card">
            <EditPoolStackNavigator.Screen name="EditPool" component={ EditPoolPopover } />
            <EditPoolStackNavigator.Screen name="PDVolumesNavigator" component={ PDVolumesNavigator } />
        </EditPoolStackNavigator.Navigator>
    );
};
