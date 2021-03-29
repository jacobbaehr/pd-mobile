import * as React from 'react';
import { EditName } from './EditName';
import { EditVolume } from './EditVolume';
import { EditWallType } from './EditWallType';
import { EditWaterType } from './EditWaterType';

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
