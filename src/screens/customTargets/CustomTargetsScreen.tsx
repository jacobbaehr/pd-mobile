import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { TargetRange } from '~/models/recipe/TargetRange';
import { AppState } from '~/redux/AppState';
import { RecipeService } from '~/services/RecipeService';

import CustomTargetsItem from './CustomTargetsItem';

export const CustomTargetsScreen : React.FC = () => {
    const selectedPool = useSelector<AppState>((state) => state.selectedPool) as Pool;
    const recipe = useLoadRecipeHook(selectedPool?.recipeKey || RecipeService.defaultFormulaKey);

    const targets = recipe?.custom ?? [];

    return (
        <SafeAreaView forceInset={ { bottom: 'never' } } style={ styles.safeArea }>
            <ScreenHeader textType="heading" color="blue">
                Custom Targets
            </ScreenHeader>
            <KeyboardAwareFlatList
                keyboardDismissMode={ 'interactive' }
                keyboardShouldPersistTaps={ 'handled' }
                data={ targets }
                renderItem={ ({ item }: { item: TargetRange }) => <CustomTargetsItem tr={ item } /> }
                keyExtractor={ (item: TargetRange) => item.var }
                ListHeaderComponent={ () => (
                    <PDText type="subHeading" color="greyDarker" style={ styles.recipeName }>
                        {recipe?.name}
                    </PDText>
                ) }
                style={ styles.container }
                contentContainerStyle={ styles.content }
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

