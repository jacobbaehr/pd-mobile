import React, { useState } from 'react';
import { PDView } from '~/components/PDView';
import { FlatList, StyleSheet } from 'react-native';
import { wallTypeOptions, WallTypeValue } from '~/models/Pool/WallType';
import { SVG } from '~/assets/images';
import { useNavigation } from '@react-navigation/native';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useEntryPool } from '../hooks/useEntryPool';
import { PDText } from '~/components/PDText';
import { ButtonWithChildren } from '~/components/buttons/ButtonWithChildren';
import { Haptic } from '~/services/HapticService';

export const EntryWallType = () => {
    const { pool, setPool } = useEntryPool();
    const [wallType, setWallType] = useState(pool?.wallType ?? '');
    const [isDismissing, setIsDismissing] = useState(false);

    const navigation = useNavigation<PDStackNavigationProps>();

    const handleButtonSelected = (menuItem: WallTypeValue) => {
        if (isDismissing) { return; }
        setIsDismissing(true);

        setWallType(menuItem);
        setPool({ wallType: menuItem });
        Haptic.medium();

        setTimeout(() => {
            navigation.goBack();
        }, 5);
    };

    return (
        <PDView style={ { display: 'flex', flexDirection: 'column', flex: 1 } }>
            <FlatList
                data={ wallTypeOptions }
                renderItem={ ({ item }) => (
                    <ButtonWithChildren
                        styles={ wallType === item.value ? styles.selectedButtonContainer : styles.buttonContainer }
                        onPress={ () => { handleButtonSelected(item.value); } } >
                        <PDText style={ wallType === item.value ? styles.selectedText : styles.unselectedText }>
                            {item.display}
                        </PDText>
                        {wallType === item.value ? (
                            <SVG.IconCheckmark width={ 24 } height={ 24 } fill="white" style={ styles.checkmark } />
                        ) : null}
                    </ButtonWithChildren>
                ) }
                keyExtractor={ (item) => item.value }
                ItemSeparatorComponent={ () => <PDView style={ styles.separator } /> }
                contentContainerStyle={ styles.list }
                style={ { flex: 1, overflow: 'visible' } }
            />
        </PDView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#F7F7F7',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    selectedButtonContainer: {
        flexDirection: 'row',
        backgroundColor: '#B21FF1',
        borderRadius: 24,
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingLeft: 16,
    },
    unselectedText: {
        color: '#262626',
        fontWeight: '600',
        fontSize: 16,
        alignSelf: 'flex-start',
    },
    selectedText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        alignSelf: 'flex-start',
    },
    checkmark: {
        marginRight: 12,
    },
    separator: {
        height: '1%',
    },
    list: {
        flex: 1,
    },
});
