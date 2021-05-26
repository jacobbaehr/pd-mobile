import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { useDispatch } from 'react-redux';
import { SearchInput } from '~/components/inputs/SearchInput';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { Pool } from '~/models/Pool';
import { PDStackNavigationProps } from '~/navigator/shared';
import { selectPool } from '~/redux/selectedPool/Actions';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';
import { RecipeService } from '~/services/RecipeService';
import { RS } from '~/services/RecipeUtil';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';

import { ChipButton } from './ChipButton';
import { PoolListFooter } from './PoolListFooter';
import { SearchHeader } from './SearchHeader';
import { usePoolSearch } from './usePoolSearch';
import { getDisplayForWaterType } from '~/models/Pool/WaterType';
import { Haptic } from '~/services/HapticService';

export const PoolListScreen = () => {
    const { ds } = useDeviceSettings();
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const dispatch = useDispatch();
    const [keyboard, setKeyboard] = useState<string>('');
    const pools = usePoolSearch(keyboard);

    const handleItemPressed = (item: Pool) => {
        Haptic.light();
        dispatch(selectPool(item));
        navigate('PoolScreen');
    };

    const handleChipPressed = (item: Pool) => {
        dispatch(selectPool(item));
        navigate('ReadingList');
    };

    const handleUpgradePressed = () => {
        navigate('Subscription');
    };

    const handleKeyboardChanged = useCallback(
        (newText: string) => {
            setKeyboard(newText);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [keyboard],
    );

    const handleSeeAllPressed = () => {
        setKeyboard('');
    };

    const isEmpty = pools.length === 0;

    const renderItem = ({ item }: { item: Pool }) => {
        const volume = VolumeUnitsUtil.getAbbreviatedDisplayVolume(item.gallons, ds);
        const recipeColor = RS.getRecipeColor(item.recipeKey ?? RecipeService.defaultRecipeKey);
        return (
            <TouchableScale onPress={ () => handleItemPressed(item) } activeScale={ 0.97 }>
                <PDView bgColor="white" style={ styles.containerItem }>
                    <PDText type="bodyBold" numberOfLines={ 3 }>
                        {item.name}
                    </PDText>
                    <PDText type="bodyMedium" color="grey">
                        { getDisplayForWaterType(item.waterType) }, {volume}
                    </PDText>
                    <ChipButton onPress={ () => handleChipPressed(item) } recipeColor={ recipeColor } recipeKey={ item.recipeKey }/>
                </PDView>
            </TouchableScale>
        );
    };

    return (
        <PDSafeAreaView bgColor="white" forceInset={ { bottom: 'never' } }>
            <SearchHeader>
                <SearchInput value={ keyboard } onChangeText={ handleKeyboardChanged } />
            </SearchHeader>
            <FlatList
                style={ styles.container }
                contentContainerStyle={ styles.content }
                keyExtractor-={ (item: Pool, index: number) => item.objectId  + index }
                keyboardShouldPersistTaps={ 'handled' }
                keyboardDismissMode={ 'interactive' }
                data={ pools }
                renderItem={ renderItem }
                ListFooterComponent={ () => {
                    if (pools.length === 0 && keyboard) {
                        return (
                            <TouchableOpacity onPress={ handleSeeAllPressed } hitSlop={ { left: 5, top: 5, right: 5, bottom: 5 } }>
                                <PDText type="bodySemiBold" color="blue" textAlign="center" style={ { textDecorationLine: 'underline' } }>See all pools</PDText>
                            </TouchableOpacity>
                        );
                    }
                    return <PoolListFooter isEmpty={ isEmpty } handlePressedUpgrade={ handleUpgradePressed } />;
                } }
                ListEmptyComponent={ () => {
                    if (pools.length === 0 && keyboard) {
                        return (
                            <PDView>
                                <PDText style={ styles.emptyText }>🤷‍♂️🤷‍♀️</PDText>
                            </PDView>
                        );
                    }
                    return null;
                } }
            />
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
    },
    content: {
        marginHorizontal: PDSpacing.sm,
        marginTop: PDSpacing.sm,
    },
    containerItem: {
        paddingTop: PDSpacing.sm,
        paddingBottom: PDSpacing.md,
        paddingHorizontal: PDSpacing.lg,
        borderWidth: 2,
        borderRadius: 24,
        borderColor: '#EDEDED',
        marginBottom: PDSpacing.xs,
    },
    emptyText: {
        fontSize: 72,
        textAlign: 'center',
    },
});
