import React, { useState } from 'react';
import { PDView } from '~/components/PDView';
import { Button } from '~/components/buttons/Button';
import { FlatList, StyleSheet } from 'react-native';
import { wallTypeOptions } from '~/models/Pool/WallType';
import { SVG } from '~/assets/images';
import { useNavigation } from '@react-navigation/native';
import { PDStackNavigationProps } from '~/navigator/shared';
import { MenuItem } from '~/components/buttons/MenuItemButton';

export const EditWallType = () => {
    const navigation = useNavigation<PDStackNavigationProps>();

    //default for now is vinyl
    const [selected, setSelected] = useState('vinyl');

    const buttonSelected = (menuItem: MenuItem) => {
        setSelected(menuItem);

        setTimeout(() => {
            navigation.goBack();
        }, 300);
    };

    return (
        <PDView>
            <FlatList
                data={wallTypeOptions}
                renderItem={({ item }) => (
                    <PDView style={selected === item.value ? styles.selectedButtonContainer : styles.buttonContainer}>
                        <Button
                            textStyles={selected === item.value ? styles.selectedText : styles.unselectedText}
                            title={item.display}
                            onPress={() => {
                                buttonSelected(item.value);
                            }}
                        />
                        {selected === item.value ? (
                            <SVG.IconCheckmark width={24} height={24} fill="white" style={styles.checkmark} />
                        ) : null}
                    </PDView>
                )}
                keyExtractor={(item) => item.value}
                ItemSeparatorComponent={() => <PDView style={styles.separator} />}
                contentContainerStyle={styles.list}
            />
        </PDView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: 327,
        height: 48,
        backgroundColor: '#F7F7F7',
        borderRadius: 24,
        justifyContent: 'center',
    },
    selectedButtonContainer: {
        width: 327,
        height: 48,
        backgroundColor: '#B21FF1',
        borderRadius: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    unselectedText: {
        color: '#262626',
        fontWeight: '600',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: 16,
    },
    selectedText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: 16,
    },
    checkmark: {
        marginRight: 12,
    },
    separator: {
        height: '1%',
    },
    list: {
        alignSelf: 'center',
        height: '100%',
    },
});
