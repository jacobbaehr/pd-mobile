import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { getDisplayForWallType } from '~/models/Pool/WallType';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { EditPoolField, EditPoolList } from '~/screens/pool/editOrCreate/edit/EditPoolHelpers';
import { ExportService } from '~/services/ExportService';
import { RecipeService } from '~/services/RecipeService';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';
import { EditPoolHelpers } from '../edit/EditPoolHelpers';
import { HeaderInfo } from '../../components/PoolPopover';

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

export const useEditPool = (pool: Partial<Pool>, toggleVisible: () => void): EditPoolList[] => {
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);
    const recipe = useLoadRecipeHook(pool?.recipeKey ?? RecipeService.defaultRecipeKey);
    const navigation = useNavigation<PDStackNavigationProps>();

    const targetsSelected = recipe?.custom.length ?? 0;

    const handleNavigateToPopover = (id: EditPoolField) => {
        const headerInfo = EditPoolHelpers.editPoolList[id];
        navigation.navigate('EditPoolModal', { headerInfo });
    };

    const handleNavigateToRecipeListScreen = () => {
        navigation.navigate('RecipeList', { prevScreen: 'EditOrCreatePoolScreen', poolName: pool?.name });
    };

    const handleNavigateToCustomTargets = () => {
        navigation.navigate('CustomTargets', { prevScreen: 'EditPoolNavigator' });
    };

    const handleExportButtonPressed = async () => {
        const validatedPool = Pool.make(pool as Pool);
        try {
            await ExportService.generateAndShareCSV(validatedPool);
        } catch (e) {
            console.warn(e);
        }
    };

    const handleDeletePressed = () => {
        toggleVisible();
    };

    return [
        {
            title: 'basic information',
            data: [
                {
                    id: 'name',
                    label: 'Name: ',
                    image: 'IconPoolName',
                    value: pool.name,
                    valueColor: 'blue',
                    onPress: () => handleNavigateToPopover('name'),
                },
                {
                    id: 'waterType',
                    label: 'Water Type: ',
                    image: 'IconPoolWaterType',
                    value: getDisplayForWaterType(pool.waterType ?? 'chlorine'),
                    valueColor: 'green',
                    onPress: () => handleNavigateToPopover('waterType'),
                },
                {
                    id: 'gallons',
                    label: 'Volume: ',
                    image: 'IconPoolVolume',
                    value: VolumeUnitsUtil.getDisplayVolume(pool.gallons ?? 0, deviceSettings),
                    valueColor: 'pink',
                    onPress: () => handleNavigateToPopover('gallons'),
                },
                {
                    id: 'wallType',
                    label: 'Wall Type: ',
                    image: 'IconPoolWallType',
                    value: getDisplayForWallType(pool.wallType ?? 'plaster'),
                    valueColor: 'purple',
                    onPress: () => handleNavigateToPopover('wallType'),
                },
            ],
        },
        {
            title: 'service',
            data: [
                {
                    id: 'recipe',
                    label: 'Recipe: ',
                    image: 'IconPoolFormula',
                    value: recipe?.name,
                    valueColor: 'orange',
                    onPress: handleNavigateToRecipeListScreen,
                },
                {
                    id: 'customTargets',
                    label: 'Custom Targets: ',
                    image: 'IconCustomTargets',
                    value: `${targetsSelected} Selected`,
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
                    value: pool?.email,
                    valueColor: 'green',
                    onPress: () => handleNavigateToPopover('email'),
                },
            ],
        },
        {
            title: 'actions',
            data: [
                {
                    id: 'exportData',
                    label: 'Export Data',
                    image: 'IconExportData',
                    valueColor: 'red',
                    onPress: handleExportButtonPressed,
                },
                {
                    id: 'deletePool',
                    label: 'Delete Pool',
                    image: 'IconDelete',
                    valueColor: 'red',
                    onPress: handleDeletePressed,
                },
            ],
        },
    ];
};
