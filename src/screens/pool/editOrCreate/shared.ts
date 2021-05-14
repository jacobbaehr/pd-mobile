import { CreatePoolField } from './create/CreatePoolHelpers';
import { EditPoolField } from './edit/EditPoolHelpers';

type ID = CreatePoolField | EditPoolField

export interface PoolHeader {
    id: ID;
    title?: string;
    description?: string;
}
