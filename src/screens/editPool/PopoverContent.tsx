import * as React from 'react';
import { EditName } from './EditName';
import { EditVolume } from './EditVolume';
import { EditWallType } from './EditWallType';
import { EditWaterType } from './EditWaterType';



interface PopoverContent {
    name: () => JSX.Element;
    waterType: () => JSX.Element;
    volume: () => JSX.Element;
    wallType: () => JSX.Element;
}

export const editPopoverContent: PopoverContent = {
    name: () => <EditName />,
    waterType: () => <EditWaterType />,
    volume: () => <EditVolume />,
    wallType: () => <EditWallType />,
};
