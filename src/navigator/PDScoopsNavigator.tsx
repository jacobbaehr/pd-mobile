import React from 'react';
import { ScoopsListScreen } from '~/screens/settings/scoops/list/ScoopsListScreen';

import { createStackNavigator } from '@react-navigation/stack';

export type PDScoopsParam = {
    ScoopsList: undefined;
    ScoopsAdd: undefined;
    ScoopsEdit: undefined;
};

const ScoopsNavigator = createStackNavigator<PDScoopsParam>();

export const PDScoopsNavigator: React.FC = () => {
    return (
        <ScoopsNavigator.Navigator headerMode="none" mode="card">
            <ScoopsNavigator.Screen name="ScoopsList" component={ ScoopsListScreen } />
            <ScoopsNavigator.Screen name="ScoopsAdd" component={ ScoopsListScreen } />
            <ScoopsNavigator.Screen name="ScoopsEdit" component={ ScoopsListScreen } />
        </ScoopsNavigator.Navigator>
    );
};
