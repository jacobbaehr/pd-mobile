import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { TargetRange } from '~/models/recipe/TargetRange';
import { PDCardNavigatorParams } from '~/navigator/PDCardNavigator';
import { AppState } from '~/redux/AppState';
import { RecipeService } from '~/services/RecipeService';

import { RouteProp, useRoute } from '@react-navigation/native';

import { useRecipeHook } from '../poolList/hooks/RealmPoolHook';
import CustomTargetsHeader from './CustomTargetsHeader';
import CustomTargetsItem from './CustomTargetsItem';
import { PDSpacing } from '~/components/PDTheme';

const CustomTargetsScreen = () => {
    const selectedPool = useSelector<AppState>((state) => state.selectedPool) as Pool;
    const recipe = useRecipeHook(selectedPool?.recipeKey || RecipeService.defaultRecipeKey);
    const { params } = useRoute<RouteProp<PDCardNavigatorParams, 'CustomTargets'>>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomTargetsHeader />
            <FlatList
                data={params?.customTargets || ([] as TargetRange[])}
                renderItem={({ item }) => <CustomTargetsItem {...item} />}
                keyExtractor={(item: TargetRange) => item.var}
                ListHeaderComponent={() => (
                    <PDText type="subHeading" color="greyDarker" style={styles.recipeName}>
                        {recipe?.name}
                    </PDText>
                )}
                style={styles.container}
                contentContainerStyle={styles.content}
                automaticallyAdjustContentInsets
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    content: {
        paddingHorizontal: 18,
        paddingTop: 18,
        marginBottom: 18,
    },
    recipeName: {
        marginBottom: PDSpacing.sm,
    },
});

export default CustomTargetsScreen;
