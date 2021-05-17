import * as React from 'react';
import { PDPoolParams } from '~/navigator/EditPoolNavigator';

import { RouteProp, useRoute } from '@react-navigation/native';

import { EditPoolPropertyWrapper } from './EditPoolPropertyWrapper';
import { popoverContentResolverFunction } from './PopoverContent';
import { useContrastStatusBar } from '~/hooks/useStatusBar';

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
    useContrastStatusBar();
    const route = useRoute<RouteProp<PDPoolParams, 'EditPoolModal'>>();
    const { headerInfo } = route.params;

    const content = popoverContentResolverFunction[headerInfo.id]();

    return (
        <EditPoolPropertyWrapper title={ headerInfo.title } description={ headerInfo.description }>
            {content}
        </EditPoolPropertyWrapper>
    );
};
