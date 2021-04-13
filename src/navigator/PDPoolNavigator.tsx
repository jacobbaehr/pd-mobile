import React from 'react';
import { HeaderInfo, PoolPopover } from '~/screens/pool/components/PoolPopover';
import { CreatePoolScreen } from '~/screens/pool/create/CreatePoolScreen';
import { EditPoolScreen } from '~/screens/pool/edit/EditPoolScreen';
import EntryShapeScreen from '~/screens/volumeEstimator/EntryShapeScreen';
import SelectShapeScreen from '~/screens/volumeEstimator/SelectShapeScreen';
import { ShapeId } from '~/screens/volumeEstimator/VolumeEstimatorHelpers';

import { createStackNavigator } from '@react-navigation/stack';

export type PDPoolParams = {
    CreatePool: undefined;
    EditPoolScreen: undefined
    EditPoolModal: { headerInfo: HeaderInfo };
    SelectShape: undefined;
    EntryShape: {
        shapeId: ShapeId;
    };

};

const PoolStackNavigator = createStackNavigator<PDPoolParams>();

export const PDPoolNavigator = () => {
    return (
        <PoolStackNavigator.Navigator headerMode="none" mode="card">
            <PoolStackNavigator.Screen name="CreatePool" component={ CreatePoolScreen } />
            <PoolStackNavigator.Screen name="EditPoolScreen" component={ EditPoolScreen } />
            <PoolStackNavigator.Screen name="EditPoolModal" component={ PoolPopover } />
            <PoolStackNavigator.Screen name="SelectShape" component={ SelectShapeScreen } />
            <PoolStackNavigator.Screen name="EntryShape" component={ EntryShapeScreen } />
        </PoolStackNavigator.Navigator>
    );
};
