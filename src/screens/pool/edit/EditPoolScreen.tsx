import * as React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import ModalHeader from '~/components/headers/ModalHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { useModal } from '~/hooks/useModal';
import { Pool } from '~/models/Pool';
import { useTypedSelector } from '~/redux/AppState';
import { MenuItemButton } from '~/screens/pool/edit/components/MenuItemButton';
import { usePoolSectionInfo } from '~/screens/pool/hooks/useEditPoolSectionInfo';

import { DeletePool } from './components/DeletePool';

export const EditPoolScreen: React.FunctionComponent = () => {
    const { visible, toggleVisible } = useModal();
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const editPoolSectionInfo = usePoolSectionInfo(selectedPool,  toggleVisible );

    return (
        <PDSafeAreaView bgColor="white">
            <ModalHeader>Edit Pool</ModalHeader>
                <SectionList
                    sections={ editPoolSectionInfo }
                    renderSectionHeader={ ({ section: { title } }) => (
                        <PDText type="bodyGreyBold" style={ styles.sectionHeaderText }>
                            {title}
                        </PDText>
                    ) }
                    renderItem={ ({ item, index, section }) => {
                        return (
                            <MenuItemButton
                                { ...item }
                                index={ index }
                                sectionLength={ section.data.length }
                                toggleVisible={ toggleVisible }
                            />
                        );
                    } }
                    keyExtractor={ (item, index) => item.id + index }
                    stickySectionHeadersEnabled={ false }
                    contentContainerStyle={ styles.listContent }
                    style={ styles.listContainer }
                />
            <DeletePool visible={ visible } toggleVisible={ toggleVisible } />
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    listContent: {
        paddingHorizontal: PDSpacing.md,

    },
    sectionHeaderText: {
        color: '#737373',
        marginBottom: 10,
        marginTop: 15,
    },
});


