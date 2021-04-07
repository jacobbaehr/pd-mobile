import * as React from 'react';
import { RouteProp } from '@react-navigation/native';

import { editPopoverContentResolverFunction } from '../PopoverContent';
import { useRoute } from '@react-navigation/native';
import { PDRootNavigatorParams } from '~/navigator/PDRootNavigator';
import { EditPoolPropertyWrapper } from './EditPoolPropertyWrapper';
import { StatusBar } from 'react-native';

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
        description: 'Select your pool\'s sanitization method',
    },
    gallons: {
        id: 'gallons',
        title: 'Edit Pool Volume',
        description: 'Don\'t know your pool\'s volume? Tap "Use Volume Estimator" below.',
    },
    wallType: {
        id: 'wallType',
        title: 'Edit Wall Type',
        description: 'This choice might affect the target range for some of your chemical readings',
    },
    recipe: {
        id: 'recipe',
    },
    customTargets: {
        id: 'customTargets',
    },
    importData: {
        id: 'importData',
    },
    deletePool: {
        id: 'deletePool',
    },
};

export const EditPoolPopover = () => {
    const route = useRoute<RouteProp<PDRootNavigatorParams, 'EditPoolPopover'>>();
    const { headerInfo } = route.params;

    const content = editPopoverContentResolverFunction[headerInfo.id]();

    React.useEffect(() => {
        StatusBar.setBarStyle('light-content');
        return () => {
            StatusBar.setBarStyle('dark-content');
        };
    }, []);

    return (
        <EditPoolPropertyWrapper title={ headerInfo.title } description={ headerInfo.description }>
            {content}
        </EditPoolPropertyWrapper>
    );
};
