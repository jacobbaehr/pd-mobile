import { ImageSourcePropType } from 'react-native';
import { images } from '~/assets/images';
import { PDTheme } from '~/components/PDTheme';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { getDisplayForWallType } from '~/models/Pool/WallType';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { HeaderInfo } from '~/screens/pool/components/PoolPopover';
import { editPoolPopoverProps } from '~/screens/pool/editOrCreate/edit/EditPoolHelpers';
import { ExportService } from '~/services/ExportService';
import { PoolService } from '~/services/PoolService';
import { RecipeService } from '~/services/RecipeService';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';

export type MenuItemId =
    | 'name'
    | 'waterType'
    | 'gallons'
    | 'wallType'
    | 'recipe'
    | 'customTargets'
    | 'export'
    | 'delete';

export type NavigationProps = { headerInfo: HeaderInfo } | { prevScreen: string };

export interface EditPoolMenuItem {
    label: string;
    image: ImageSourcePropType;
    value?: string | null;
    valueColor: keyof PDTheme;
    onPress: () => void;
    id: MenuItemId;
}

export interface EditPoolSectionInfo {
    title: string;
    data: EditPoolMenuItem[];
}

export const useEditPoolSectionInfo = (
    pool: Partial<Pool>,
    toggleVisible: () => void,
): EditPoolSectionInfo[] => {
    const deviceSettings = useTypedSelector(state => state.deviceSettings);
    const recipe = useLoadRecipeHook(pool.recipeKey ?? RecipeService.defaultRecipeKey);
    const navigation = useNavigation<PDStackNavigationProps>();

    const targetsSelected = recipe?.custom.length ?? 0;

    const handleNavigateToPopover = (id: MenuItemId) => {
        let headerInfo: HeaderInfo = editPoolPopoverProps[id];
        navigation.navigate('EditPoolModal', { headerInfo });
    };

    const handleNavigateToRecipeListScreen = () => {
        navigation.navigate('RecipeList', { prevScreen: 'EditOrCreatePoolScreen', poolName: pool?.name });
    };

    const handleNavigateToCustomTargets = () => {
        navigation.navigate('CustomTargets', { prevScreen: 'EditPoolNavigator' });
    };

    const handleExportButtonPressed = async () => {
        const validatedPool = PoolService.validatePartial(pool);
        if (validatedPool) {
            try {
                await ExportService.generateAndShareCSV(validatedPool);
            } catch (e) {
                console.warn(e);
            }
        }
    };

    const handleDeletePressed = () => {
        toggleVisible();
    };

    const editPoolSectionInfo: EditPoolSectionInfo[] = [
        {
            title: 'BASIC INFORMATION',
            data: [
                {
                    label: 'Name: ',
                    image: images.titleIcon,
                    value: pool.name,
                    valueColor: 'blue',
                    onPress: () => handleNavigateToPopover('name'),
                    id: 'name',
                },
                {
                    label: 'Water Type: ',
                    image: images.waterTypeIcon,
                    value: getDisplayForWaterType(pool.waterType ?? 'chlorine'),
                    valueColor: 'green',
                    onPress: () => handleNavigateToPopover('waterType'),
                    id: 'waterType',
                },
                {
                    label: 'Volume: ',
                    image: images.volumeIcon,
                    value: VolumeUnitsUtil.getDisplayVolume(pool.gallons ?? 0, deviceSettings),
                    valueColor: 'pink',
                    onPress: () => handleNavigateToPopover('gallons'),
                    id: 'gallons',
                },
                {
                    label: 'Wall Type: ',
                    image: images.wallTypeIcon,
                    value: getDisplayForWallType(pool.wallType ?? 'plaster'),
                    valueColor: 'purple',
                    onPress: () => handleNavigateToPopover('wallType'),
                    id: 'wallType',
                },
            ],
        },
        {
            title: 'SERVICE',
            data: [
                {
                    label: 'Recipe: ',
                    image: images.recipeIcon,
                    value: recipe?.name,
                    valueColor: 'orange',
                    onPress: handleNavigateToRecipeListScreen,
                    id: 'recipe',
                },
                {
                    label: 'Custom Targets: ',
                    image: images.targetsIcon,
                    value: `${targetsSelected} Selected`,
                    valueColor: 'teal',
                    onPress: handleNavigateToCustomTargets,
                    id: 'customTargets',
                },
            ],
        },
        {
            title: 'ADDITIONAL ACTIONS',
            data: [
                {
                    label: 'Export Data',
                    image: images.exportIcon,
                    value: undefined,
                    valueColor: 'red',
                    onPress: handleExportButtonPressed,
                    id: 'export',
                },
                {
                    label: 'Delete Pool',
                    image: images.deleteIcon,
                    value: undefined,
                    valueColor: 'red',
                    onPress: handleDeletePressed,
                    id: 'delete',
                },
            ],
        },
    ];

    return editPoolSectionInfo;
};
