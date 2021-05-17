import * as React from 'react';
import { StatusBar } from 'react-native';
import { PDPoolParams } from '~/navigator/EditPoolNavigator';

import { RouteProp, useRoute } from '@react-navigation/native';

import { EditPoolPropertyWrapper } from './EditPoolPropertyWrapper';
import { popoverContentResolverFunction } from './PopoverContent';

export interface HeaderInfo {
    id: string;
    title: string;
    description: string;
}

export interface PopoverProps {
    name: HeaderInfo,
    waterType: HeaderInfo,
    gallons: HeaderInfo,
    wallType: HeaderInfo,
    recipe: {id: 'recipe'}
}

export const PoolPopover: React.FC = () => {
    const route = useRoute<RouteProp<PDPoolParams, 'EditPoolModal'>>();
    const { headerInfo } = route.params;

    const content = popoverContentResolverFunction[headerInfo.id]();

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
