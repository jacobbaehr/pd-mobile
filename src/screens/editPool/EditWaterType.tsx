import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { PDView } from '~/components/PDView';
import { Button } from '~/components/buttons/Button';
import { waterTypeOptions, WaterTypeValue } from '~/models/Pool/WaterType';
import { SVG } from '~/assets/images';
import { lightTheme } from '~/components/PDTheme';
import { useNavigation } from '@react-navigation/native';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { Pool } from '~/models/Pool';
import { updatePool } from '~/redux/selectedPool/Actions';

export const EditWaterType = () => {
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const [waterType, setWaterType] = useState(selectedPool.waterType ?? 'chlorine');
    const dispatch = useThunkDispatch();
    const navigation = useNavigation<PDStackNavigationProps>();

    const handleButtonSelected = (menuItem: WaterTypeValue) => {
        setWaterType(menuItem);

        const rawPool: Pool = {
            ...selectedPool,
            waterType: menuItem,
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
                data={ waterTypeOptions }
                renderItem={ ({ item }) => (
                    <PDView style={ waterType === item.value ? styles.selectedButtonContainer : styles.buttonContainer }>
                        <Button
                            textStyles={ waterType === item.value ? styles.selectedText : styles.unselectedText }
                            title={ item.display }
                            onPress={ () => {
                                handleButtonSelected(item.value);
                            } }
                        />
                        {waterType === item.value ? (
                            <SVG.IconCheckmark width={ 24 } height={ 24 } fill="white" style={ styles.checkmark } />
                        ) : null}
                    </PDView>
                ) }
                keyExtractor={ (item) => item.value }
                ItemSeparatorComponent={ () => <PDView style={ styles.separator } /> }
                contentContainerStyle={ styles.list }
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
        backgroundColor: lightTheme.green,
        borderRadius: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    unselectedText: {
        color: lightTheme.greyDarker,
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
