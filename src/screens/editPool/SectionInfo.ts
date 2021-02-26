import { ImageSourcePropType } from 'react-native';
import { images } from '~/assets/images';

interface EditPoolMenuItem {
    name: string;
    titleColor: string | undefined;
    image: ImageSourcePropType;
    value: string;
    valueColor: string;
    onPressRoute: string; //TODO: Find type that is for a valid route
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
                name: 'Name: ',
                titleColor: 'black',
                image: images.nameIcon,
                value: 'Pool of the soul',
                valueColor: '#1E6BFF',
                onPressRoute: 'EditPoolPopover',
            },
            {
                name: 'Water Type: ',
                titleColor: 'black',
                image: images.waterTypeIcon,
                value: 'Salt Water',
                valueColor: '#00B25C',
                onPressRoute: 'EditPoolPopover',
            },
            {
                name: 'Volume: ',
                titleColor: 'black',
                image: images.volumeIcon,
                value: '1,000 Gallons',
                valueColor: '#FF0073',
                onPressRoute: 'EditPoolPopover',
            },
            {
                name: 'Wall Type: ',
                titleColor: 'black',
                image: images.wallTypeIcon,
                value: 'Vinyl',
                valueColor: '#B21FF1',
                onPressRoute: 'EditPoolPopover',
            },
        ],
    },
    {
        headerText: 'SERVICE CONFIGURATION',
        data: [
            {
                name: 'Recipe: ',
                titleColor: 'black',
                image: images.recipeIcon,
                value: 'Weekend Warrior',
                valueColor: '#FF7502',
                onPressRoute: 'EditPoolPopover',
            },
            {
                name: 'Custom Targets: ',
                titleColor: 'black',
                image: images.targetsIcon,
                value: '3 Selected',
                valueColor: '#00AEA0',
                onPressRoute: 'EditPoolPopover',
            },
        ],
    },
    {
        headerText: 'ADDITIONAL ACTIONS',
        data: [
            {
                name: 'Export Data',
                titleColor: 'black',
                image: images.exportIcon,
                value: '',
                valueColor: 'red',
                onPressRoute: 'EditPoolPopover',
            },
            {
                name: 'Import Data',
                titleColor: 'black',
                image: images.importIcon,
                value: '',
                valueColor: 'red',
                onPressRoute: 'EditPoolPopover',
            },
            {
                name: 'Delete Pool',
                titleColor: 'red',
                image: images.deleteIcon,
                value: '',
                valueColor: 'red',
                onPressRoute: 'EditPoolPopover',
            },
        ],
    },
];
