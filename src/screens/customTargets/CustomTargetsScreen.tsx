import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { Pool } from '~/models/Pool';
import { TargetRange } from '~/models/recipe/TargetRange';
import { AppState } from '~/redux/AppState';
import { RecipeService } from '~/services/RecipeService';

import CustomTargetsItem from './CustomTargetsItem';

export const CustomTargetsScreen : React.FC = () => {
    const selectedPool = useSelector<AppState>((state) => state.selectedPool) as Pool;
    const recipe = useLoadRecipeHook(selectedPool?.recipeKey || RecipeService.defaultFormulaKey);
    const theme = useTheme();
    const targets = recipe?.custom ?? [];

    return (
        <PDSafeAreaView forceInset={ { bottom: 'never' } } >
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
                style={ [styles.container , { backgroundColor: theme.colors.background }] }
                contentContainerStyle={ styles.content }
                automaticallyAdjustContentInsets
            />
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

