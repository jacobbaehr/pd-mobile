import * as React from 'react';
import { Alert, Linking, SectionList, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { PDText } from '~/components/PDText';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { FormulaMeta } from '~/models/recipe/FormulaMeta';
import { PDNavParams } from '~/navigator/shared';
import { Config } from '~/services/Config';
import { FormulaAPI } from '~/services/gql/FormulaAPI';
import { RecipeService } from '~/services/RecipeService';
import { RS } from '~/services/RecipeUtil';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useEntryPool } from '../pool/editOrCreate/hooks/useEntryPool';
import { RecipeListHeader } from './RecipeListHeader';
import { RecipeListItem } from './RecipeListItem';

export interface RecipeListNavParams {
    poolName?: string;
    prevScreen: 'ReadingList' | 'EditOrCreatePoolScreen' | 'PoolScreen';
}

export const RecipeListScreen: React.FC = () => {
    const { data } = FormulaAPI.useFormulaList();
    const { navigate } = useNavigation<StackNavigationProp<PDNavParams, 'RecipeList'>>();

    const { pool } = useEntryPool();

    const currentRecipe = useLoadRecipeHook(pool?.recipeKey || RecipeService.defaultFormulaKey);
    const { params } = useRoute<RouteProp<PDNavParams, 'RecipeList'>>();

    const handleUpdatePressed = () => {
        Linking.openURL(Config.appStoreListing);
    };

    const promptUpdate = () => {
        Alert.alert(
            'Update Required',
            'This recipe requires a newer app version. Update now?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Update',
                    onPress: handleUpdatePressed,
                    style: 'default',
                },
            ],
            { cancelable: true },
        );
    };

    const handleRecipeSelected = (recipe: FormulaMeta): void => {
        if (RS.needUpdateToUseRecipe(recipe, Config.version)) {
            promptUpdate();
        } else {
            const key = RS.getKey(recipe);
            navigate('RecipeDetails', { recipeKey: key, prevScreen: params.prevScreen });
        }
    };

    const currentMeta: FormulaMeta = {
        name: currentRecipe?.name || 'loading...',
        ts: currentRecipe?.ts || 0,
        id: currentRecipe?.id || '',
        desc: currentRecipe?.description || '',
        appVersion: currentRecipe?.appVersion || '1.0.0',
    };

    const sections = [
        {
            title: 'Current',
            data: [currentMeta],
        },
        {
            title: 'Community Recipes',
            data: data?.listFormulas || [],
        },
    ];

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } } forceInset={ { bottom: 'never' } }>
            <RecipeListHeader poolName={ pool.name ?? 'Back' }/>
            <SectionList
                style={ styles.scrollView }
                sections={ sections }
                renderItem={ ({ item }) => (
                    <RecipeListItem formula={ item } onFormulaSelected={ handleRecipeSelected } key={ item.id } />
                ) }
                renderSectionHeader={ ({ section: { title } }) => (
                    <PDText type="default" style={ styles.sectionTitle }>
                        {title}
                    </PDText>
                ) }
                contentInset={ { bottom: 34 } }
                stickySectionHeadersEnabled={ false }
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#F2F9F9',
    },
    sectionTitle: {
        marginTop: 12,
        marginLeft: 16,
        fontSize: 28,
        fontWeight: '700',
        color: 'black',
    },
});
