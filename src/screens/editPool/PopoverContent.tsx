import * as React from 'react';
import { EditName } from './components/EditName';
import { EditVolume } from './components/EditVolume';
import { EditWallType } from './components/EditWallType';
import { EditWaterType } from './components/EditWaterType';

interface PopoverContent {
    name: () => JSX.Element;
    waterType: () => JSX.Element;
    gallons: () => JSX.Element;
    wallType: () => JSX.Element;
}

export const editPopoverContentResolverFunction: PopoverContent = {
    name: () => <EditName />,
    waterType: () => <EditWaterType />,
    gallons: () => <EditVolume />,
    wallType: () => <EditWallType />,
};
