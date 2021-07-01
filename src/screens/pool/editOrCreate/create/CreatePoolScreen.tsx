import * as React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { PDButton } from '~/components/buttons/PDButton';
import ModalHeader from '~/components/headers/ModalHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { saveNewPool } from '~/redux/selectedPool/Actions';
import { useCreatePool } from '~/screens/pool/editOrCreate/hooks/useCreatePool';
import { useEntryPool } from '~/screens/pool/editOrCreate/hooks/useEntryPool';
import { Haptic } from '~/services/HapticService';

import { useNavigation } from '@react-navigation/core';

import { MenuItemButton } from '../../components/MenuItemButton';
import { toPoolNoId } from '../shared';


export const CreatePoolScreen: React.FC = () => {
    const deviceSettings = useTypedSelector(state => state.deviceSettings);
    const createPoolSectionInfo = useCreatePool(deviceSettings);
    const dispatch = useThunkDispatch();
    const insets = useSafeArea();
    const theme = useTheme();

    const { pool, isRequiredFilledOut } = useEntryPool();
    const navigation = useNavigation();

    const handleCreatePoolPressed = () => {
        Haptic.heavy();

        const newPoolNotSaved = toPoolNoId(pool);
        if (newPoolNotSaved) {
            dispatch(saveNewPool(newPoolNotSaved));
            navigation.goBack();
        }
    };

    console.log('so many renders');

    return (
        <PDSafeAreaView bgColor="white" forceInset={ { bottom: 'never', top: 'never' } }>
            <ModalHeader>Create Pool</ModalHeader>
            <SectionList
                sections={ createPoolSectionInfo }
                renderSectionHeader={ ({ section: { title } }) => (
                    <PDText type="bodyGreyBold" style={ styles.sectionHeaderText }>
                        {title}
                    </PDText>
                ) }
                renderItem={ ({ item, index, section }) => (
                    <MenuItemButton { ...item } index={ index } sectionLength={ section.data.length } />
                ) }
                keyExtractor={ (item, index) => item.id + index }
                stickySectionHeadersEnabled={ false }
                contentContainerStyle={ styles.listContent }
                style={ [styles.listContainer, { backgroundColor: theme.colors.background }] }
            />
            <PDView style={ { paddingBottom: insets.bottom + PDSpacing.sm } }>
                <PDButton
                    textStyle={ styles.text }
                    onPress={ handleCreatePoolPressed }
                    touchableProps={ { disabled: !isRequiredFilledOut } }
                    style={ styles.saveButton }
                    bgColor={ !isRequiredFilledOut ? 'greyLight' : 'blue' }>
                    Create Pool
                </PDButton>
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
        marginHorizontal: PDSpacing.lg,
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
});
