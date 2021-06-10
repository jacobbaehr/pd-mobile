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
            description: 'Choose a name that best describes your pool',
        },
        waterType: {
            id: 'waterType',
            title: 'Water Type',
            description: "Select your pool's sanitization method",
        },
        gallons: {
            id: 'gallons',
            title: 'Pool Volume',
            description: 'Don\'t know your pool\'s volume? Tap "Use Volume Estimator" below.',
        },
        wallType: {
            id: 'wallType',
            title: 'Wall Type',
            description: 'This choice might affect the target range for some of your chemical readings',
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
