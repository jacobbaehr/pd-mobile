import { PDColor } from '~/components/PDTheme';

import { EntryPoolElements } from '../entryPoolValues/EntryPoolHelpers';


export type CreatePoolField = EntryPoolElements | 'recipe' | 'customTargets';

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
