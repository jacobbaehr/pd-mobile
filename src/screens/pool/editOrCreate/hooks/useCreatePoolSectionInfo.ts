import { useNavigation } from '@react-navigation/native';
import { ListRowItemSectionInfo } from '~/screens/pool/components/ListRowItem';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { DeviceSettings } from '~/models/DeviceSettings';
import { getDisplayForWallType } from '~/models/Pool/WallType';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { PDStackNavigationProps } from '~/navigator/shared';
import { defaultRecipe } from '~/repository/recipes/Default';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';
import { createPoolPopoverProps } from '~/screens/pool/editOrCreate/create/CreatePoolHelpers';
import { HeaderInfo } from '~/screens/pool/components/PoolPopover';
import { MenuItemId } from '~/screens/pool/editOrCreate/hooks/useEditPoolSectionInfo';
import { useTheme } from '~/components/PDTheme';
import { useEntryPool } from './useEntryPool';

export const useCreatePoolSectionInfo = (
    deviceSettings: DeviceSettings,
): ListRowItemSectionInfo[] => {
    const { pool } = useEntryPool();
    const navigation = useNavigation<PDStackNavigationProps>();
    const recipe = useLoadRecipeHook(pool?.recipeKey ?? defaultRecipe.id);
    const theme = useTheme();

    const handleNavigateToPopover = (id: MenuItemId) => {
        let headerInfo: HeaderInfo = createPoolPopoverProps[id];
        // TODO: Typing Composite Navigation props.
        navigation.navigate('EditPoolModal', { headerInfo });
    };

    const handleNavigateToRecipeListScreen = () => {
        navigation.navigate('RecipeList', { prevScreen: 'EditOrCreatePoolScreen', poolName: pool?.name });
    };

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
                    staticProps: { label: 'Volume: ', image: 'IconVolume', imageFill: theme.pink, valueColor: pool?.gallons ? 'pink' : 'grey', id: 'gallons' },
                    value: pool?.gallons ? VolumeUnitsUtil.getDisplayVolume(pool?.gallons, deviceSettings) : 'Required',
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
