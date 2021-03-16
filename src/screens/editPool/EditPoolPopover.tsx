import * as React from 'react';
import { RouteProp } from '@react-navigation/native';

import { editPopoverContent } from './PopoverContent';
import { useRoute } from '@react-navigation/native';
import { PDRootNavigatorParams } from '~/navigator/PDRootNavigator';
import { EditPoolPropertyWrapper } from './EditPoolPropertyWrapper';

export interface HeaderInfo {
    id: string;
    title: string;
    description: string;
}

export const popoverProps = {
    name: {
        id: 'name',
        title: 'Edit Pool Name',
        description: 'Choose a name that best describes your pool',
    },
    waterType: {
        id: 'waterType',
        title: 'Edit Water Type',
        description: 'Splash!',
    },
    volume: {
        id: 'volume',
        title: 'Edit Pool Volume',
        description: 'Don\'t know your pool\'s volume? Tap "Use Volume Estimator" below.',
    },
    wallType: {
        id: 'wallType',
        title: 'Edit Wall Type',
        description: 'Crunch!',
    },
    recipe: {
        id: 'recipe',
        title: '',
        description: '',
    },
    customTargets: {
        id: 'customTargets',
        title: '',
        description: '',
    },
    importData: {
        id: 'importData',
        title: '',
        description: '',
    },
    deletePool: {
        id: 'deletePool',
        title: '',
        description: '',
    },
};

export const EditPoolPopover = () => {
    const route = useRoute<RouteProp<PDRootNavigatorParams, 'EditPoolPopover'>>();
    const { headerInfo } = route.params;

    //TODO: Rename THIS To content
    //rename editpopovercontent to something re-function
    const content = editPopoverContent[headerInfo.id]();

    return (
        <EditPoolPropertyWrapper title={headerInfo.title} description={headerInfo.description}>
            {content}
        </EditPoolPropertyWrapper>
    );
};
