import * as React from 'react';
import { EditPoolMenuItem } from '~/screens/pool/editOrCreate/hooks/useEditPoolSectionInfo';
import { MenuItemButtonWrapper } from './MenuItemButtonWrapper';

export interface MenuItemButtonProps extends EditPoolMenuItem {
    index: number;
    sectionLength: number;
    toggleVisible: any;
}
export const MenuItemButton: React.FC<MenuItemButtonProps> = (props) => {
    return (
        <MenuItemButtonWrapper
            { ...props }
            index={ props.index }
            sectionLength={ props.sectionLength }
            toggleVisible={ props.toggleVisible }
        />
    );
};
