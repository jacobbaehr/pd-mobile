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
import { ButtonWithChildren } from '~/components/buttons/ButtonWithChildren';
import { SVG } from '~/assets/images';
import { QuickStartText } from './QuickStartText';

// look cdat volume if they dont enter it
// look at background color of ListView
// thats all i think.

export const CreatePoolScreen: React.FC = () => {
    // are there performance implications to just returning the whole state from this?
    const { deviceSettings, isQuickStart } = useTypedSelector(state => ({
        deviceSettings: state.deviceSettings,
        isQuickStart: state.isQuickStart,
    }));
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

    const getButtonComponent = () => {
        if (isQuickStart) {
            return (
            <ButtonWithChildren onPress={ handleCreatePoolPressed } styles={ styles.buttonContainer }>
                <SVG.IconPlayWhite height={ 21 } width={ 15 } style={ styles.buttonIcon } />
                <PDText type="subHeading" style={ { color: 'white' } }>Continue</PDText>
            </ButtonWithChildren>
            );
        } else {
            return (
            <PDButton
                textStyle={ styles.text }
                onPress={ handleCreatePoolPressed }
                touchableProps={ { disabled: !isRequiredFilledOut } }
                style={ styles.saveButton }
                bgColor={ !isRequiredFilledOut ? 'greyLight' : 'blue' }>
                Create Pool
            </PDButton>
            );
        }
    };

    return (
        <PDSafeAreaView bgColor="greyLighter" forceInset={ { bottom: 'never', top: 'never' } }>
            <ModalHeader>Create Pool</ModalHeader>
            <SectionList
                sections={ createPoolSectionInfo }
                renderSectionHeader={ ({ section: { title } }) => {
                    if (isQuickStart && title === 'quick-start') {
                        return <QuickStartText />;
                    } else {
                        return <PDText type="bodyGreyBold" style={ styles.sectionHeaderText }>
                        {title}
                    </PDText>;
                    }
                } }
                renderItem={ ({ item, index, section }) => (
                    <MenuItemButton { ...item } index={ index } sectionLength={ section.data.length } />
                ) }
                keyExtractor={ (item, index) => item.id + index }
                stickySectionHeadersEnabled={ false }
                contentContainerStyle={ styles.listContent }
                style={ [styles.listContainer, { backgroundColor: theme.colors.background }] }
            />
            { getButtonComponent() }
            <PDView style={ { paddingBottom: insets.bottom + PDSpacing.sm } } />
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: PDSpacing.md,
    },
    sectionHeaderText: {
        color: '#737373',
        marginBottom: 10,
        marginTop: 15,
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
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        // marginBottom: PDSpacing.sm,
        marginHorizontal: PDSpacing.lg,
        // marginTop: PDSpacing.lg,
        backgroundColor: '#1E6BFF',
        justifyContent: 'center',
        paddingTop: 9,
        paddingBottom: 9,
        borderRadius: 27.5,
    },
    buttonIcon: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: PDSpacing.xs,
    },
});
