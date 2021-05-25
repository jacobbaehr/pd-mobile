import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { useDispatch } from 'react-redux';
import { SearchInput } from '~/components/inputs/SearchInput';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useRealmPoolsHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { PDStackNavigationProps } from '~/navigator/shared';
import { selectPool } from '~/redux/selectedPool/Actions';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';

import { ChipButton } from './ChipButton';
import { PoolListFooter } from './PoolListFooter';
import { SearchHeader } from './SearchHeader';

export const PoolListScreen = () => {
    const pools = useRealmPoolsHook();
    const { ds } = useDeviceSettings();
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const dispatch = useDispatch();

    const handleItemPressed = (item: Pool) => {
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


    const isEmpty = pools.length === 0;

    const renderItem = ({ item }: { item: Pool }) => {
        const volume = VolumeUnitsUtil.getDisplayVolume(item.gallons, ds);
        const cb = () => handleItemPressed(item);
        const cb2 = () => handleChipPressed(item);
        return (
            <TouchableScale onPress={ cb }>
                <PDView bgColor="white" style={ styles.containerItem }>
                    <PDText type="bodyBold" numberOfLines={ 3 }>{item.name}</PDText>
                    <PDText type="bodyMedium" color="grey">
                        {item.waterType} - {volume }
                    </PDText>
                    <ChipButton onPress={ cb2 } recipeKey={ item.recipeKey } />
                </PDView>
            </TouchableScale>
        );
    };

    return (
        <PDSafeAreaView bgColor="white" forceInset={ { bottom: 'never' } }>
            <SearchHeader>
                <SearchInput />
            </SearchHeader>
            <FlatList
                style={ styles.container }
                contentContainerStyle={ styles.content }
                data={ pools }
                renderItem={ renderItem }
                ListFooterComponent={ () => (
                    <PoolListFooter isEmpty={ isEmpty } handlePressedUpgrade={ handleUpgradePressed }
                    />
                ) }
                keyExtractor-={ (item: Pool) => item.objectId }
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
        paddingVertical: PDSpacing.sm,
        paddingHorizontal: PDSpacing.lg,
        borderWidth: 2,
        borderRadius: 24,
        borderColor: '#EDEDED',
        marginBottom: PDSpacing.xs,
    },
});
