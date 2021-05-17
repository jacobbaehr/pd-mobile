import * as React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import ModalHeader from '~/components/headers/ModalHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { useModal } from '~/hooks/useModal';
import { useThunkDispatch } from '~/redux/AppState';
import { updatePool } from '~/redux/selectedPool/Actions';
import { MenuItemButton } from '~/screens/pool/editOrCreate/edit/components/MenuItemButton';
import { useEditPoolSectionInfo } from '~/screens/pool/editOrCreate/hooks/useEditPoolSectionInfo';
import { PoolService } from '~/services/PoolService';
import { useEntryPool } from '../hooks/useEntryPool';
import { DeletePool } from './components/DeletePool';

export const EditPoolScreen: React.FunctionComponent = () => {
    const { visible, toggleVisible } = useModal();
    const { pool } = useEntryPool();
    const dispatchThunk = useThunkDispatch();
    const editPoolSectionInfo = useEditPoolSectionInfo(pool, toggleVisible );

    /// Whenever the pool context changes, persist them in the db:
    React.useEffect(() => {
        const validatedPool = PoolService.validatePartial(pool);
        if (validatedPool) {
            dispatchThunk(updatePool(validatedPool));
        } else {
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pool]);

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


