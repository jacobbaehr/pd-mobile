import { defaultRecipe } from './../../repository/recipes/Default';
import { useRecipeHook } from './../../hooks/RealmPoolHook';
import { DeviceSettings } from './../../models/DeviceSettings';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useNavigation } from '@react-navigation/native';
import { Pool } from '~/models/Pool';
import { PDTheme } from '~/components/PDTheme';
import { ImageSourcePropType } from 'react-native';
import { images } from '~/assets/images';
import { ExportService } from '~/services/ExportService';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { Util } from '~/services/Util';
import { getDisplayForWallType } from '~/models/Pool/WallType';
import { HeaderInfo, popoverProps } from './EditPoolPopover';

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

export interface usePoolSectionInfoProps {
    pool: Pool;
    deviceSettings: DeviceSettings;
    toggleVisible: undefined;
}

export const usePoolSectionInfo = (
    pool: Pool,
    deviceSettings: DeviceSettings,
    toggleVisible: () => void,
): EditPoolSectionInfo[] => {
    const recipe = useRecipeHook(pool?.recipeKey ?? defaultRecipe.id);
    const navigation = useNavigation<PDStackNavigationProps>();
    const targetsSelected = recipe?.custom.length ?? 0;

    const handleNavigateToPopover = (id: MenuItemId) => {
        let headerInfo: HeaderInfo = popoverProps[id];
        navigation.navigate('EditPoolPopover', { headerInfo });
    };

    const handleNavigateToRecipeListScreen = () => {
        navigation.navigate('RecipeList', { prevScreen: 'EditPool' });
    };

    const handleNavigateToCustomTargets = () => {
        navigation.navigate('CustomTargets');
    };

    const handleExportButtonPressed = async () => {
        try {
            await ExportService.generateAndShareCSV(pool);
        } catch (e) {
            console.error(e);
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
                    value: pool?.name,
                    valueColor: 'blue',
                    onPress: () => handleNavigateToPopover('name'),
                    id: 'name',
                },
                {
                    label: 'Water Type: ',
                    image: images.waterTypeIcon,
                    value: getDisplayForWaterType(pool?.waterType),
                    valueColor: 'green',
                    onPress: () => handleNavigateToPopover('waterType'),
                    id: 'waterType',
                },
                {
                    label: 'Volume: ',
                    image: images.volumeIcon,
                    value: Util.getDisplayVolume(pool?.gallons, deviceSettings),
                    valueColor: 'pink',
                    onPress: () => handleNavigateToPopover('gallons'),
                    id: 'gallons',
                },
                {
                    label: 'Wall Type: ',
                    image: images.wallTypeIcon,
                    value: getDisplayForWallType(pool?.wallType),
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