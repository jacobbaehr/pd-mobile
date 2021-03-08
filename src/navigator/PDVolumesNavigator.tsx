import React from 'react';
import EntryShapeScreen from '~/screens/volumenEstimator/EntryShapeScreen';
import SelectShapeScreen from '~/screens/volumenEstimator/SelectShapeScreen';

import { createStackNavigator } from '@react-navigation/stack';

export type PDVolumesParams = {
    SelectShape: undefined;
    EntryShape: {
        shape: string;
    };
};

const VolumesStackNavigator = createStackNavigator<PDVolumesParams>();

export const PDVolumesNavigator = () => {
    return (
        <VolumesStackNavigator.Navigator headerMode="none" mode="card">
            <VolumesStackNavigator.Screen name="SelectShape" component={SelectShapeScreen} />
            <VolumesStackNavigator.Screen name="EntryShape" component={EntryShapeScreen} />
        </VolumesStackNavigator.Navigator>
    );
};
