import React from 'react';
import { useTypedSelector } from '~/redux/AppState';
import { PoolPopover } from '~/screens/pool/components/PoolPopover';
import { EditOrCreatePoolScreen } from '~/screens/pool/editOrCreate/EditOrCreatePoolScreen';
import { PoolProvider } from '~/screens/pool/editOrCreate/hooks/useEntryPool';
import { ShapeProvider } from '~/screens/pool/editOrCreate/hooks/useVolumeEstimator';
import { PoolHeader } from '~/screens/pool/editOrCreate/shared';
import EntryShapeScreen from '~/screens/pool/editOrCreate/volumeEstimator/EntryShapeScreen';
import SelectShapeScreen from '~/screens/pool/editOrCreate/volumeEstimator/SelectShapeScreen';
import { ShapeId } from '~/screens/pool/editOrCreate/volumeEstimator/VolumeEstimatorHelpers';
import { RecipeListNavParams, RecipeListScreen } from '~/screens/recipes/RecipeListScreen';
import { RecipeDetailsNavParams, RecipeScreen } from '~/screens/recipes/RecipeScreen';

import { createStackNavigator } from '@react-navigation/stack';

export type PDPoolParams = {
    EditOrCreatePoolScreen: undefined;
    EditPoolModal: { headerInfo: PoolHeader };
    SelectShape: undefined;
    EntryShape: {
        shapeId: ShapeId;
    };
    RecipeList: RecipeListNavParams,
    RecipeDetails: RecipeDetailsNavParams;
};

const PoolStackNavigator = createStackNavigator<PDPoolParams>();

/// Also surrounds navigator with providers for EntryPool hooks & VolumeEstimator hooks.
/// Because of how component trees & navigators work, the providers should wrap the whole navigator
export const EditPoolNavigator: React.FC = () => {
    const selectedPool = useTypedSelector((state) => state.selectedPool);
    return (
        <PoolProvider initialPool={ selectedPool }>
            <ShapeProvider>
                <PoolStackNavigator.Navigator headerMode="none" mode="card">
                    <PoolStackNavigator.Screen name="EditOrCreatePoolScreen" component={ EditOrCreatePoolScreen } />
                    <PoolStackNavigator.Screen name="EditPoolModal" component={ PoolPopover } />
                    <PoolStackNavigator.Screen name="SelectShape" component={ SelectShapeScreen } />
                    <PoolStackNavigator.Screen name="EntryShape" component={ EntryShapeScreen } />
                    <PoolStackNavigator.Screen name="RecipeList" component={ RecipeListScreen } />
                    <PoolStackNavigator.Screen name="RecipeDetails" component={ RecipeScreen } />
                </PoolStackNavigator.Navigator>
            </ShapeProvider>
        </PoolProvider>
    );
};
