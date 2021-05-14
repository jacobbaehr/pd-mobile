import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { DeviceSettings } from '~/models/DeviceSettings';
import { getDisplayForWallType } from '~/models/Pool/WallType';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { PDStackNavigationProps } from '~/navigator/shared';
import {
    CreatePoolField, CreatePoolHelpers, CreatePoolList
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
    const recipe = useLoadRecipeHook(pool.recipeKey ?? RecipeService.defaultRecipeKey);

    const handleNavigateToPopover = (id: CreatePoolField) => {
        const headerInfo = CreatePoolHelpers.createPoolList[id];
        navigate('EditPoolModal', { headerInfo });
    };

    const handleNavigateToRecipeListScreen = () => {
        navigate('RecipeList', { prevScreen: 'EditOrCreatePoolScreen', poolName: pool.name });
    };

    const volume: number = pool?.gallons || Number(estimation);

    return [
        {
            title: 'POOL SETUP',
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
                    label: 'Water Type: ',
                    image: 'IconPoolWaterType',
                    valueColor: pool?.waterType ? 'green' : 'grey',
                    id: 'waterType',
                    value: pool?.waterType ? getDisplayForWaterType(pool?.waterType) : ' Required',
                    onPress: () => handleNavigateToPopover('waterType'),
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
                    label: 'Wall Type: ',
                    image: 'IconPoolWallType',
                    valueColor: pool?.wallType ? 'purple' : 'grey',
                    id: 'wallType',
                    value: pool?.wallType ? getDisplayForWallType(pool?.wallType) : ' Vinyl',
                    onPress: () => handleNavigateToPopover('wallType'),
                },
                {
                    label: 'Recipe: ',
                    image: 'IconPoolFormula',
                    valueColor: recipe?.name ? 'orange' : 'grey',
                    id: 'recipe',
                    value: recipe?.name ? recipe?.name : ' Default',
                    onPress: handleNavigateToRecipeListScreen,
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
