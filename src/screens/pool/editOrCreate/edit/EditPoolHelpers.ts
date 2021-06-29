import { PDColor } from '~/components/PDTheme';

import { EntryPoolElements } from '../entryPoolValues/EntryPoolHelpers';
import { PoolHeader } from '../shared';

export type EditPoolField = EntryPoolElements
    | 'recipe'
    | 'customTargets'
    | 'exportData'
    | 'deletePool';

export type RecordEditList = Record<EditPoolField, PoolHeader>;

export interface EditPoolListItem {
    id: EditPoolField;
    value?: string | null;
    label: string;
    image: string;
    onPress: () => void;
    valueColor: PDColor;
}

export interface EditPoolList {
    title: string;
    data: EditPoolListItem[]
}

export namespace EditPoolHelpers {

    export const editPoolList: RecordEditList = {
        name: {
            id: 'name',
            title: 'Pool Name',
            description: 'Every pool deserves a name',
        },
        waterType: {
            id: 'waterType',
            title: 'Water Type',
            description: "Select your pool's sanitization method",
        },
        gallons: {
            id: 'gallons',
            title: 'Pool Volume',
            description: 'How big is your pool?',
        },
        wallType: {
            id: 'wallType',
            title: 'Wall Type',
            description: 'This will help us pick target-levels for some chemicals, but you can still override them later.',
        },
        email: {
            id: 'email',
            title: 'Email Address',
            description: 'If you email a log entry, we’ll pre-populate the “to” field with this address.',
        },
        recipe: {
            id: 'recipe',
        },
        customTargets: {
            id: 'customTargets',
        },
        exportData: {
            id: 'exportData',
        },
        deletePool: {
            id: 'deletePool',
        },
    };
}
