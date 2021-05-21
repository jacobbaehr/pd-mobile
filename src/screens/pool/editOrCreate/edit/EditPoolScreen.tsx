import * as React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import ModalHeader from '~/components/headers/ModalHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useModal } from '~/hooks/useModal';
import { Pool } from '~/models/Pool';
import { useThunkDispatch } from '~/redux/AppState';
import { updatePool } from '~/redux/selectedPool/Actions';
import { MenuItemButton } from '~/screens/pool/components/MenuItemButton';
import { useEditPool } from '~/screens/pool/editOrCreate/hooks/useEditPool';

import { useEntryPool } from '../hooks/useEntryPool';
import { DeletePool } from './components/DeletePool';

export const EditPoolScreen: React.FunctionComponent = () => {
    const { visible, toggleVisible } = useModal();
    const { pool, isRequiredFilledOut } = useEntryPool();
    const dispatchThunk = useThunkDispatch();
    const editPoolSectionInfo = useEditPool(pool, toggleVisible);
    const insets = useSafeArea();

    /// Whenever the pool context changes, persist them in the db:
    React.useEffect(() => {
        if (isRequiredFilledOut) {
            const updatedPool = Pool.make(pool as Pool);
            dispatchThunk(updatePool(updatedPool));

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pool]);

    return (
        <PDSafeAreaView bgColor="white" forceInset={ { bottom: 'never' } }>
            <ModalHeader>Edit Pool</ModalHeader>
            <SectionList
                sections={ editPoolSectionInfo }
                renderSectionHeader={ ({ section: { title } }) => (
                    <PDText type="bodyGreyBold" style={ styles.sectionHeaderText }>
                        {title}
                    </PDText>
                ) }
                renderItem={ ({ item, index, section }) => (
                    <MenuItemButton
                        { ...item }
                        index={ index }
                        sectionLength={ section.data.length }
                        toggleVisible={ toggleVisible }
                    />
                ) }
                keyExtractor={ (item, index) => item.id + index }
                stickySectionHeadersEnabled={ false }
                contentContainerStyle={ styles.listContent }
                style={ styles.listContainer }
            />
            <PDView style={ { paddingBottom: insets.bottom + PDSpacing.sm } }>
                <DeletePool visible={ visible } toggleVisible={ toggleVisible } />
            </PDView>
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
        marginBottom:  PDSpacing.md,
        marginTop:  PDSpacing.lg,
        textTransform: 'uppercase',
    },
});
