import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { DeviceSettings } from '~/models/DeviceSettings';
import { getDisplayForWallType } from '~/models/Pool/WallType';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { PDStackNavigationProps } from '~/navigator/shared';
import {
    CreatePoolField, CreatePoolHelpers, CreatePoolList,
} from '~/screens/pool/editOrCreate/create/CreatePoolHelpers';
import { RecipeService } from '~/services/RecipeService';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';

import { useEntryPool } from './useEntryPool';
import { useVolumeEstimator } from './useVolumeEstimator';
import { useEffect } from 'react';
import { useTypedSelector } from '~/redux/AppState';

/// In quickStart mode, some of the fields will be pre-populated.
export const useCreatePool = (deviceSettings: DeviceSettings): CreatePoolList[] => {
    const { pool } = useEntryPool();
    const { estimation } = useVolumeEstimator();
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const recipe = useLoadRecipeHook(pool.recipeKey ?? RecipeService.defaultFormulaKey);
    const isQuickStart = useTypedSelector(state => state.isQuickStart);

    const numberOfTargetLevels = recipe?.custom?.length ?? 0;


    const handleNavigateToPopover = (id: CreatePoolField) => {
        const headerInfo = CreatePoolHelpers.createPoolList[id];
        navigate('EditPoolModal', { headerInfo });
    };

    const handleNavigateToFormulaListScreen = () => {
        navigate('FormulaList', { prevScreen: 'EditOrCreatePoolScreen', poolName: pool.name });
    };

    const handleNavigateToCustomTargets = () => {
        // TODO: fix these targets, there is no "real" selected pool so I'm not sure if this even works:
        navigate('CustomTargets', { prevScreen: 'EditPoolNavigator' });
    };

    useEffect(() => {
        if (isQuickStart) {
            handleNavigateToPopover('gallons');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const volume: number = pool?.gallons || Number(estimation);

    return [
        {
            title: 'basic',
            data: [
                {
                    label: 'Name: ',
                    image: 'IconPoolName',
                    valueColor: pool?.name ? 'blue' : 'grey',
                    id: 'name',
                    value: pool?.name ?? ' Required',
                    onPress: () => handleNavigateToPopover('name'),
                },
                {
                    label: 'Volume: ',
                    image: 'IconPoolVolume',
                    valueColor: volume ? 'pink' : 'grey',
                    id: 'gallons',
                    value: volume ? VolumeUnitsUtil.getDisplayVolume(volume, deviceSettings) : ' Required',
                    onPress: () => handleNavigateToPopover('gallons'),
                },
                {
                    label: 'Water Type: ',
                    image: 'IconPoolWaterType',
                    valueColor: pool?.waterType ? 'green' : 'grey',
                    id: 'waterType',
                    value: pool?.waterType ? getDisplayForWaterType(pool.waterType) : ' Required',
                    onPress: () => handleNavigateToPopover('waterType'),
                },
                {
                    label: 'Wall Type: ',
                    image: 'IconPoolWallType',
                    valueColor: pool?.wallType ? 'purple' : 'grey',
                    id: 'wallType',
                    value: pool?.wallType ? getDisplayForWallType(pool.wallType) : ' Required',
                    onPress: () => handleNavigateToPopover('wallType'),
                },
            ],
        },
        {
            title: 'advanced',
            data: [
            {
                label: 'Formula: ',
                image: 'IconPoolFormula',
                valueColor: recipe?.name ? 'orange' : 'grey',
                id: 'recipe',
                value: recipe?.name ? recipe?.name : ' Default',
                onPress: handleNavigateToFormulaListScreen,
            },
            {
                id: 'customTargets',
                label: 'Target Levels: ',
                image: 'IconCustomTargets',
                value: `${numberOfTargetLevels} options`,
                valueColor: 'teal',
                onPress: handleNavigateToCustomTargets,
            },
            ],
        },
        {
            title: 'optional',
            data: [
                {
                    id: 'email',
                    label: 'Email: ',
                    image: 'IconPoolEmail',
                    valueColor: pool?.name ? 'blue' : 'grey',
                    value: pool?.email ,
                    onPress: () => handleNavigateToPopover('email'),
                },
            ],
        },
    ];
};
