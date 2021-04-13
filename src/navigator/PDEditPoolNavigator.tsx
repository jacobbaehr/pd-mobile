import React from 'react';
import { PoolPopover, HeaderInfo } from '~/screens/pool/components/PoolPopover';

import { createStackNavigator } from '@react-navigation/stack';

import { PDVolumesNavigator } from './PDVolumeNavigator';

export type PDEditPoolParams = {
    EditPool: { headerInfo: HeaderInfo };
    CreatePool: { headerInfo: HeaderInfo };
    PDVolumesNavigator: undefined;
};

const EditPoolStackNavigator = createStackNavigator<PDEditPoolParams>();

export const PDEditPoolNavigator = () => {
    return (
        <EditPoolStackNavigator.Navigator headerMode="none" mode="card">
            <EditPoolStackNavigator.Screen name="EditPool" component={ PoolPopover } />
            <EditPoolStackNavigator.Screen name="CreatePool" component={ PoolPopover } />
            <EditPoolStackNavigator.Screen name="PDVolumesNavigator" component={ PDVolumesNavigator } />
        </EditPoolStackNavigator.Navigator>
    );
};
