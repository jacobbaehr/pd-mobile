import React from 'react';
import { FlatList } from 'react-native';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { Scoop } from '~/models/Scoop';
import { PDStackNavigationProps } from '~/navigator/shared';

import { useNavigation } from '@react-navigation/native';

import { useFetchScoops } from '../useScoops';
import { ScoopListItem } from './ScoopListItem';

export const ScoopsListScreen = () => {
    const scoops = useFetchScoops();
    const theme = useTheme();
    const navigation = useNavigation<PDStackNavigationProps>();

    const handleAddButtonPressed = () => {
        navigation.navigate('AddScoop');
    };

    const handleScoopItemPressed = ( scoop: Scoop)=> {
        navigation.navigate('ScoopDetails', {
            prevScoop: scoop,
        });
    };

    return (
        <PDSafeAreaView bgColor="white">
            <ScreenHeader
                hasAddButton
                hasBottomLine
                handlePressedAdd={ handleAddButtonPressed }
                textType="heading"
                color="pink">
                Scoops
            </ScreenHeader>
            <FlatList
                data={ scoops }
                keyExtractor={ (item) => item.guid }
                style={ [{ backgroundColor: theme.blurredPink }] }
                contentContainerStyle={ { paddingTop: PDSpacing.md } }
                renderItem={ ({ item }) => (
                    <ScoopListItem key={ item.guid } scoop={ item } handlePressedScoop={ handleScoopItemPressed }/>
                ) }
            />
        </PDSafeAreaView>
    );
};
