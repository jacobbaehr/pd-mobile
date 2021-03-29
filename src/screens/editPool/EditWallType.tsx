import React, { useState } from 'react';
import { PDView } from '~/components/PDView';
import { Button } from '~/components/buttons/Button';
import { FlatList, StyleSheet } from 'react-native';
import { wallTypeOptions, WallTypeValue } from '~/models/Pool/WallType';
import { SVG } from '~/assets/images';
import { useNavigation } from '@react-navigation/native';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { Pool } from '~/models/Pool';
import { updatePool } from '~/redux/selectedPool/Actions';

export const EditWallType = () => {
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const [wallType, setWallType] = useState(selectedPool.wallType ?? 'vinyl');

    const dispatch = useThunkDispatch();
    const navigation = useNavigation<PDStackNavigationProps>();

    const handleButtonSelected = (menuItem: WallTypeValue) => {
        setWallType(menuItem);

        const rawPool: Pool = {
            ...selectedPool,
            wallType: menuItem,
        };

        const existingPool = Pool.make(rawPool);
        dispatch(updatePool(existingPool));

        setTimeout(() => {
            navigation.goBack();
        }, 300);
    };

    return (
        <PDView>
            <FlatList
                data={wallTypeOptions}
                renderItem={({ item }) => (
                    <PDView style={wallType === item.value ? styles.selectedButtonContainer : styles.buttonContainer}>
                        <Button
                            textStyles={wallType === item.value ? styles.selectedText : styles.unselectedText}
                            title={item.display}
                            onPress={() => {
                                handleButtonSelected(item.value);
                            }}
                        />
                        {wallType === item.value ? (
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
