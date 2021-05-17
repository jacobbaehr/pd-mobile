import * as React from 'react';
import { EntryName } from '~/screens/pool/editOrCreate/entryPoolValues/EntryName';
import { EntryVolume } from '~/screens/pool/editOrCreate/entryPoolValues/EntryVolume';
import { EntryWallType } from '~/screens/pool/editOrCreate/entryPoolValues/EntryWallType';
import { EntryWaterType } from '~/screens/pool/editOrCreate/entryPoolValues/EntryWaterType';
interface PopoverContent {
    name: () => JSX.Element;
    waterType: () => JSX.Element;
    gallons: () => JSX.Element;
    wallType: () => JSX.Element;
}

export const popoverContentResolverFunction: PopoverContent = {
    name: () => <EntryName/>,
    waterType: () => <EntryWaterType />,
    gallons: () => <EntryVolume />,
    wallType: () => <EntryWallType />,
};

