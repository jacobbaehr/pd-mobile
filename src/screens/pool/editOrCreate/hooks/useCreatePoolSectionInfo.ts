import { useTheme } from '~/components/PDTheme';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { DeviceSettings } from '~/models/DeviceSettings';
import { getDisplayForWallType } from '~/models/Pool/WallType';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { PDStackNavigationProps } from '~/navigator/shared';
import { ListRowItemSectionInfo } from '~/screens/pool/components/ListRowItem';
import { HeaderInfo } from '~/screens/pool/components/PoolPopover';
import { createPoolPopoverProps } from '~/screens/pool/editOrCreate/create/CreatePoolHelpers';
import { MenuItemId } from '~/screens/pool/editOrCreate/hooks/useEditPoolSectionInfo';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';

import { useEntryPool } from './useEntryPool';
import { useVolumeEstimator } from './useVolumeEstimator';
import { RecipeService } from '~/services/RecipeService';

export const useCreatePoolSectionInfo = (
    deviceSettings: DeviceSettings,
): ListRowItemSectionInfo[] => {
    const { pool } = useEntryPool();
    const { estimation } = useVolumeEstimator();
    const navigation = useNavigation<PDStackNavigationProps>();
    const recipe = useLoadRecipeHook(pool.recipeKey ?? RecipeService.defaultRecipeKey);
    const theme = useTheme();

    const handleNavigateToPopover = (id: MenuItemId) => {
        let headerInfo: HeaderInfo = createPoolPopoverProps[id];
        // TODO: Typing Composite Navigation props.
        navigation.navigate('EditPoolModal', { headerInfo });
    };

    const handleNavigateToRecipeListScreen = () => {
        navigation.navigate('RecipeList', { prevScreen: 'EditOrCreatePoolScreen', poolName: pool.name });
    };

    const volume : number = pool?.gallons || Number(estimation);

    const createPoolSectionInfo: ListRowItemSectionInfo[] = [
        {
            title: 'POOL SETUP',

            data: [
                {
                    staticProps: { label: 'Name: ', image: 'IconName', imageFill: theme.blue, valueColor: pool?.name ? 'blue' : 'grey', id: 'name' },
                    value: pool?.name ?? 'Required',
                    onPress: () => handleNavigateToPopover('name'),
                },
                {
                    staticProps: { label: 'Water Type: ', image: 'IconWaterType', imageFill: theme.green, valueColor: pool?.waterType ? 'green' : 'grey', id: 'waterType' },
                    value: pool?.waterType ? getDisplayForWaterType(pool?.waterType) : 'Required',
                    onPress: () => handleNavigateToPopover('waterType'),
                },
                {
                    staticProps: { label: 'Volume: ', image: 'IconVolume', imageFill: theme.pink, valueColor: volume ? 'pink' : 'grey', id: 'gallons' },
                    value: volume ? VolumeUnitsUtil.getDisplayVolume(volume, deviceSettings) : 'Required',
                    onPress: () => handleNavigateToPopover('gallons'),
                },
                {
                    staticProps: { label: 'Wall Type: ', image: 'IconWallType', imageFill: theme.purple, valueColor: pool?.wallType ? 'purple' : 'grey', id: 'wallType' },
                    value: pool?.wallType ? getDisplayForWallType(pool?.wallType) : 'Vinyl',
                    onPress: () => handleNavigateToPopover('wallType'),
                },
                {
                    staticProps: { label: 'Recipe: ', image: 'IconRecipes', imageFill: theme.orange, valueColor: recipe?.name ? 'orange' : 'grey', id: 'recipe' },
                    value: recipe?.name ? recipe?.name : 'Default',
                    onPress: handleNavigateToRecipeListScreen,
                },
            ],
        }];

    return createPoolSectionInfo;
};
