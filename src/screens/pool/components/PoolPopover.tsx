import * as React from 'react';
import { StatusBar } from 'react-native';
import { PDEditPoolParams } from '~/navigator/PDEditPoolNavigator';

import { RouteProp, useRoute } from '@react-navigation/native';

import { popoverContentResolverFunction } from './PopoverContent';
import { EditPoolPropertyWrapper } from './EditPoolPropertyWrapper';

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

export const PoolPopover = () => {
    const route = useRoute<RouteProp<PDEditPoolParams, 'EditPool'>>();
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
