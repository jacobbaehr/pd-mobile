import { PDTheme } from '~/components/PDTheme';
import { ImageSourcePropType } from 'react-native';
import { images } from '~/assets/images';

export interface EditPoolMenuItem {
    title: string;
    titleColor: keyof PDTheme;
    image: ImageSourcePropType;
    value: string;
    valueColor: keyof PDTheme;
    onPressRoute: any; //TODO: find valid route type,
    id: string;
}

interface EditPoolSectionInfo {
    headerText: string;
    data: EditPoolMenuItem[];
}

export const editPoolSectionInfo: EditPoolSectionInfo[] = [
    {
        headerText: 'BASIC INFORMATION',
        data: [
            {
                title: 'Name: ',
                titleColor: 'black',
                image: images.titleIcon,
                value: 'Pool of the soul',
                valueColor: 'blue',
                onPressRoute: 'EditPoolPopover',
                id: 'name',
            },
            {
                title: 'Water Type: ',
                titleColor: 'black',
                image: images.waterTypeIcon,
                value: 'Salt Water',
                valueColor: 'green',
                onPressRoute: 'EditPoolPopover',
                id: 'waterType',
            },
            {
                title: 'Volume: ',
                titleColor: 'black',
                image: images.volumeIcon,
                value: '1,000 Gallons',
                valueColor: 'pink',
                onPressRoute: 'EditPoolPopover',
                id: 'volume',
            },
            {
                title: 'Wall Type: ',
                titleColor: 'black',
                image: images.wallTypeIcon,
                value: 'Vinyl',
                valueColor: 'purple',
                onPressRoute: 'EditPoolPopover',
                id: 'wallType',
            },
        ],
    },
    {
        headerText: 'SERVICE CONFIGURATION',
        data: [
            {
                title: 'Recipe: ',
                titleColor: 'black',
                image: images.recipeIcon,
                value: 'Weekend Warrior',
                valueColor: 'orange',
                onPressRoute: 'RecipeList',
                id: 'recipe',
            },
            {
                title: 'Custom Targets: ',
                titleColor: 'black',
                image: images.targetsIcon,
                value: '3 Selected',
                valueColor: 'teal',
                onPressRoute: 'CustomTargets',
                id: 'customTargets',
            },
        ],
    },
    {
        headerText: 'ADDITIONAL ACTIONS',
        data: [
            {
                title: 'Export Data',
                titleColor: 'black',
                image: images.exportIcon,
                value: '',
                valueColor: 'red',
                onPressRoute: 'Export',
                id: 'exportData',
            },
            {
                title: 'Delete Pool',
                titleColor: 'red',
                image: images.deleteIcon,
                value: '',
                valueColor: 'red',
                onPressRoute: 'DeletePool',
                id: 'deletePool',
            },
        ],
    },
];
