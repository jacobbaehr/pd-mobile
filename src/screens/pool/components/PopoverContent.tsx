import * as React from 'react';
import { EditName } from '~/screens/pool/entryPoolValues/EntryName';
import { EditVolume } from '~/screens/pool/entryPoolValues/EntryVolume';
import { EditWallType } from '~/screens/pool/entryPoolValues/EntryWallType';
import { EditWaterType } from '~/screens/pool/entryPoolValues/EntryWaterType';

interface PopoverContent {
    name: () => JSX.Element;
    waterType: () => JSX.Element;
    gallons: () => JSX.Element;
    wallType: () => JSX.Element;
}

export const popoverContentResolverFunction: PopoverContent = {
    name: () => <EditName />,
    waterType: () => <EditWaterType />,
    gallons: () => <EditVolume />,
    wallType: () => <EditWallType />,
};
