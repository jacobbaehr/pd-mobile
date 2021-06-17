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

export const useCreatePool = (deviceSettings: DeviceSettings): CreatePoolList[] => {
    const { pool } = useEntryPool();
    const { estimation } = useVolumeEstimator();
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const recipe = useLoadRecipeHook(pool.recipeKey ?? RecipeService.defaultFormulaKey);

    const handleNavigateToPopover = (id: CreatePoolField) => {
        const headerInfo = CreatePoolHelpers.createPoolList[id];
        navigate('EditPoolModal', { headerInfo });
    };

    const handleNavigateToFormulaListScreen = () => {
        navigate('FormulaList', { prevScreen: 'EditOrCreatePoolScreen', poolName: pool.name });
    };

    const volume: number = pool?.gallons || Number(estimation);

    return [
        {
            title: 'basic info',
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
                    value: volume ? VolumeUnitsUtil.getDisplayVolume(volume, deviceSettings) : 'Required',
                    onPress: () => handleNavigateToPopover('gallons'),
                },
                {
                    label: 'Water Type: ',
                    image: 'IconPoolWaterType',
                    valueColor: pool?.waterType ? 'green' : 'grey',
                    id: 'waterType',
                    value: pool?.waterType ? getDisplayForWaterType(pool?.waterType) : ' Required',
                    onPress: () => handleNavigateToPopover('waterType'),
                },
                {
                    label: 'Wall Type: ',
                    image: 'IconPoolWallType',
                    valueColor: pool?.wallType ? 'purple' : 'grey',
                    id: 'wallType',
                    value: pool?.wallType ? getDisplayForWallType(pool?.wallType) : ' Vinyl',
                    onPress: () => handleNavigateToPopover('wallType'),
                },
            ],
        },
        {
            title: 'chemistry',
            data: [
            {
                label: 'Formula: ',
                image: 'IconPoolFormula',
                valueColor: recipe?.name ? 'orange' : 'grey',
                id: 'recipe',
                value: recipe?.name ? recipe?.name : ' Default',
                onPress: handleNavigateToFormulaListScreen,
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
