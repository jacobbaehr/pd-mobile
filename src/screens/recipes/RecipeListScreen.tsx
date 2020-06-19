import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { connect } from 'react-redux';
import { Color } from 'csstype';
import { FlatGrid } from 'react-native-super-grid';

import { Recipe } from '~/models/recipe/Recipe';
import { RecipeMeta } from '~/models/recipe/RecipeMeta';
import { Pool } from '~/models/Pool';
import { selectRecipe } from '~/redux/recipeKey/Actions';
import { dispatch, AppState } from '~/redux/AppState';
import { Database } from '~/repository/Database';
import { BackButton } from '~/components/buttons/BackButton';
import { PDGradientText } from '~/components/PDGradientText';
import { GradientButton } from '~/components/buttons/GradientButton';
import { RecipeService } from '~/services/RecipeService';
import { getRecipeKey } from '~/models/recipe/RecipeKey';
import { useNavigation } from '@react-navigation/native';

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

    const recipes: RecipeMeta[] = [];
    const { navigate, goBack } = useNavigation<StackNavigationProp<PDNavStackParamList, 'RecipeList'>>();

    const handleRecipeSelected = (recipe: Recipe): void => {
        Database.commitUpdates(() => {
            if (props.pool === null) {
                return;
            }
            // this.props.pool.recipeKey = getRecipeKey(recipe);
        });
        dispatch(selectRecipe(recipe));
        navigate('ReadingList');
    }

    const handleBackPressed = () => {
        goBack();
    }

    const getBackButtonTitle = (): string => {
        const pool = props.pool;
        if (pool !== null) {
            return pool.name;
        }
        return '';
    }

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } }>
            <BackButton
                title={ getBackButtonTitle() }
                onPress={ handleBackPressed } />
            <PDGradientText style={ styles.gradientText } colors={ gradientColors }>
                Recipes
            </PDGradientText>
            <View style={ styles.container }>
                <ScrollView style={ styles.scrollView }>
                    <GradientButton title={ 'Use Default' } onPress={ () => { } } />
                    <FlatGrid
                        itemDimension={ 130 }
                        items={ recipes }
                        renderItem={ ({ item }) => (<Text>{ item.name }: {item.id }</Text>) }
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export const RecipeListScreen = connect(mapStateToProps)(RecipeListScreenComponent);

const gradientColors: Color[] = ['#07A5FF', '#FF0073'];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    gradientText: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#005C9E',
        height: 45,
        margin: 15
    },
    editStyle: {
        margin: 5,
        marginRight: 10,
    },
    scrollView: {
        backgroundColor: '#F8F8F8'
    }
});
