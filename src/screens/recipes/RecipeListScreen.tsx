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

interface RecipeListScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'RecipeList'>;

    // The selected pool
    pool: Pool | null;
}

const mapStateToProps = (state: AppState, ownProps: RecipeListScreenProps): RecipeListScreenProps => {
    return {
        navigation: ownProps.navigation,
        pool: state.selectedPool
    };
};

interface RecipeListScreenState {
    initialLoadFinished: boolean;
}

class RecipeListScreenComponent extends React.Component<RecipeListScreenProps, RecipeListScreenState> {
    recipes!: RecipeMeta[];
    recipeService: RecipeService;

    constructor(props: RecipeListScreenProps) {
        super(props);

        this.recipeService = new RecipeService();
        this.state = {
            initialLoadFinished: false
        };
    }

    static navigationOptions = (navigation: any) => {
        const { state } = navigation;
        if (state === undefined) {
            return {};
        }
        const selectedPoolName = state.params.poolName;
        return { title: selectedPoolName };
    }

    async componentDidMount() {
        // Fetch pool from persistent storage
        if (this.props.pool !== null && this.props.pool !== undefined) {
            this.props.navigation.setParams({ poolName: this.props.pool.name });
        }
        this.recipes = await RecipeService.fetchRecipeList();

        this.setState({ initialLoadFinished: true });
    }

    handleRecipeSelected = (recipe: Recipe): void => {
        Database.commitUpdates(() => {
            if (this.props.pool === null) {
                return;
            }
            // this.props.pool.recipeKey = getRecipeKey(recipe);
        });
        dispatch(selectRecipe(recipe));
        this.props.navigation.navigate('ReadingList');
    }

    handleBackPressed = () => {
        this.props.navigation.goBack();
    }

    getBackButtonTitle = (): string => {
        const pool = this.props.pool;
        if (pool !== null) {
            return pool.name;
        }
        return '';
    }

    render() {
        const recipes = (this.recipes === undefined) ? [] : this.recipes.map(p => p);

        return (
            <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } }>
                <BackButton
                    title={ this.getBackButtonTitle() }
                    onPress={ this.handleBackPressed } />
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
