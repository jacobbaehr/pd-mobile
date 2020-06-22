import * as React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';

import { RecipeMeta } from '~/models/recipe/RecipeMeta';
import { Pool } from '~/models/Pool';
import { dispatch, AppState } from '~/redux/AppState';
import { Database } from '~/repository/Database';
import { RecipeAPI } from '~/services/gql/RecipeAPI';

import { useNavigation } from '@react-navigation/native';
import { RecipeListHeader } from './RecipeListHeader';
import { RecipeListItem } from './RecipeListItem';
import { PDText } from '~/components/PDText';
import { useRecipeHook } from '../poolList/hooks/RealmPoolHook';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { RecipeService, RS } from '~/services/RecipeService';
import { getRecipeKey } from '~/models/recipe/RecipeKey';

interface RecipeListScreenProps {
    // The selected pool
    pool: Pool | null;
}

const mapStateToProps = (state: AppState, ownProps: RecipeListScreenProps): RecipeListScreenProps => {
    return {
        pool: state.selectedPool
    };
};

const RecipeListScreenComponent: React.FunctionComponent<RecipeListScreenProps> = (props) => {

    const { data, loading, error } = RecipeAPI.useRecipeList();
    const { navigate, goBack } = useNavigation<StackNavigationProp<PDNavStackParamList, 'RecipeList'>>();
    const currentRecipe = useRecipeHook(props.pool?.recipeKey || RecipeService.defaultRecipeKey);

    const handleRecipeSelected = (recipe: RecipeMeta): void => {
        Database.commitUpdates(() => {
            if (props.pool === null) {
                return;
            }
        });
        const key = RS.getKey(recipe);
        navigate('RecipeDetails', { recipeKey: key });
    }

    const currentMeta: RecipeMeta = {
        name: currentRecipe?.name || 'loading...',
        ts: currentRecipe?.ts || 0,
        id: currentRecipe?.id || '',
        desc: currentRecipe?.description || ''
    }

    const handleBackPressed = () => {
        goBack();
    }

    if (props.pool === null) {
        return <></>;
    }

    const sections = [
        {
            title: 'Current',
            data: [currentMeta]
        }, {
            title: 'Community Recipes',
            data: data?.listRecipes || []
        }
    ];

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } } forceInset={ { bottom: 'never' } }>
            <RecipeListHeader handleBackPress={ handleBackPressed } pool={ props.pool } />
            <SectionList
                style={ styles.scrollView }
                sections={ sections }
                renderItem={ ({ item }) => <RecipeListItem recipe={ item } onRecipeSelected={ handleRecipeSelected } key={ item.id } /> }
                renderSectionHeader={ ({ section: { title } }) => <PDText style={ styles.sectionTitle }>{ title }</PDText> }
                contentInset={ { bottom: 34 } }
                stickySectionHeadersEnabled={ false }
            />
        </SafeAreaView>
    );
}

export const RecipeListScreen = connect(mapStateToProps)(RecipeListScreenComponent);

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#F2F9F9'
    },
    sectionTitle: {
        marginTop: 12,
        marginLeft: 16,
        fontSize: 28,
        fontWeight: '700',
        color: 'black'
    }
});
