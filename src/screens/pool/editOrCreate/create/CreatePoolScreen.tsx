import * as React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { PDText } from '~/components/PDText';

import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { useCreatePoolSectionInfo } from '~/screens/pool/editOrCreate/hooks/useCreatePoolSectionInfo';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDSpacing } from '~/components/PDTheme';
import { ListRowItem, ListRowItemSectionInfo } from '~/screens/pool/components/ListRowItem';
import { Button } from '~/components/buttons/Button';
import { PDView } from '~/components/PDView';
import { useEntryPool } from '~/screens/pool/editOrCreate/hooks/useEntryPool';
import { saveNewPool } from '~/redux/selectedPool/Actions';
import { useNavigation } from '@react-navigation/core';
import { PoolService } from '~/services/PoolService';
import ModalHeader from '~/components/headers/ModalHeader';
import { Haptic } from '~/services/HapticService';

export const CreatePoolScreen: React.FunctionComponent = () => {
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);
    const createPoolSectionInfo: ListRowItemSectionInfo[] = useCreatePoolSectionInfo(deviceSettings);
    const dispatch = useThunkDispatch();

    const { pool, isRequiredFilledOut } = useEntryPool();
    const  navigation = useNavigation();

    const handleCreatePoolPressed = () => {
        const validatedPool = PoolService.validatePartial(pool);
        if (validatedPool) {
            Haptic.heavy();
            dispatch(saveNewPool(validatedPool));
            navigation.goBack();
        }
    };

    return (
        <PDSafeAreaView bgColor="white">
            <ModalHeader>Create Pool</ModalHeader>
            <SectionList
                sections={ createPoolSectionInfo }
                renderSectionHeader={ ({ section: { title } }) => (
                    <PDText type="bodyGreyBold" style={ styles.sectionHeaderText }>
                        {title}
                    </PDText>
                ) }
                renderItem={ ({ item, index, section }) => {
                    return (
                        <ListRowItem
                            { ...item }
                            index={ index }
                            sectionLength={ section.data.length }
                        />
                    );
                } }
                keyExtractor={ (item, index) => item.staticProps.id + index }
                stickySectionHeadersEnabled={ false }
                contentContainerStyle={ styles.listContent }
                style={ styles.listContainer }
            />
            <PDView bgColor={ 'greyVeryLight' }>
                <PDView
                        opacity={ isRequiredFilledOut ? 1 : 0.4 }
                        style={ styles.buttonContainer }>
                    <Button title="Create Pool"
                        onPress={ handleCreatePoolPressed }
                        textStyles={ styles.text }
                        disabled={ !isRequiredFilledOut }
                        styles={ styles.saveButton }
                        bgColor={ 'blue' }/>
                </PDView>
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
        marginBottom: 10,
        marginTop: 15,
    },
    buttonContainer: {
        borderRadius: 27.5,
        justifyContent: 'center',
        alignSelf: 'center',
        opacity: 0.3,
        marginBottom: PDSpacing.lg,
        overflow: 'visible',
        width: '87%',
    },
    saveButton: {
        borderRadius: 27.5,
        paddingVertical: PDSpacing.xs,
    },
    text: {
        fontWeight: '700',
        fontSize: 18,
        alignSelf: 'center',
    },
});
