import { PDColor } from '~/components/PDTheme';

import { EntryPoolElements } from '../entryPoolValues/EntryPoolHelpers';
import { PoolHeader } from '../shared';

export type CreatePoolField = EntryPoolElements | 'recipe' | 'customTargets';

export type RecordCreateList = Record<CreatePoolField, PoolHeader>;

export interface CreatePoolListItem {
    id: CreatePoolField;
    value?: string | null;
    label: string;
    image: string;
    onPress: () => void;
    valueColor: PDColor;
}

export interface CreatePoolList {
    title: string;
    data: CreatePoolListItem[];
}

export namespace CreatePoolHelpers {

    export const createPoolList: RecordCreateList  = {
        name: {
            id: 'name',
            title: 'Pool Name',
            description: 'Every pool deserves a name',
        },
        waterType: {
            id: 'waterType',
            title: 'Water Type',
            description: 'Every pool is different. This will help us pick a pool-care formula for you.',
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
        recipe: {
            id: 'recipe',
        },
        email: {
            id: 'email',
            title: 'Email Address',
            description: 'If you email a log entry, we’ll pre-populate the “to” field with this address.',
        },
        customTargets: {
            id: 'customTargets',
        },
    };
}
