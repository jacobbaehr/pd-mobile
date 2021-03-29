import React from 'react';
import EntryShapeScreen from '~/screens/volumeEstimator/EntryShapeScreen';
import SelectShapeScreen from '~/screens/volumeEstimator/SelectShapeScreen';
import { ShapeId } from '~/screens/volumeEstimator/VolumeEstimatorHelpers';

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export type EstimateRoute = RouteProp<PDVolumesParams, 'EntryShape'>;

export type PDVolumesParams = {
    SelectShape: undefined;
    EntryShape: {
        shapeId: ShapeId;
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
