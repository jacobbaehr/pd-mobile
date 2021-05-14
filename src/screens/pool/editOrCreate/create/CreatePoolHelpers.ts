import { PDTheme } from '~/components/PDTheme';

import { EntryPoolElements } from '../entryPoolValues/EntryPoolHelpers';
import { PoolHeader } from '../shared';

export type CreatePoolField = EntryPoolElements | 'recipe';

export type RecordCreateList = Record<CreatePoolField, PoolHeader>;

export interface CreatePoolListItem {
    id: CreatePoolField;
    value?: string | null;
    label: string;
    image: string;
    onPress: () => void;
    valueColor: keyof PDTheme;
}

export interface CreatePoolList {
    title: string;
    data: CreatePoolListItem[]
}

export namespace CreatePoolHelpers {

    export const createPoolList: RecordCreateList  = {
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
        recipe: {
            id: 'recipe',
        },
        email: {
            id: 'email',
            title: 'Email Address',
            description: 'If you email a log entry, we’ll pre-populate the “to” field with this address.',
        },
    };
}
