import React from 'react';

import { EntryEmail } from './EntryEmail';
import { EntryName } from './EntryName';
import { EntryVolume } from './EntryVolume';
import { EntryWallType } from './EntryWallType';
import { EntryWaterType } from './EntryWaterType';

export type EntryPoolElements = 'name' | 'waterType'| 'gallons' | 'wallType' | 'email';

type RecordEntryPool = Record<EntryPoolElements, () => JSX.Element>

export namespace EntryPoolHelpers {

    export const getEntryElementById = (id: EntryPoolElements) => {
        const entryPool : RecordEntryPool = {
            name: () => <EntryName/>,
            waterType: () => <EntryWaterType />,
            gallons: () => <EntryVolume />,
            wallType: () => <EntryWallType />,
            email: () => <EntryEmail />,
        };
        return entryPool[id];
    };

}
