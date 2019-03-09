import * as React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { Recipe } from 'models/recipe/Recipe';
import { Pool } from 'models/Pool';
import { selectRecipe } from 'redux/recipeId/Actions';
import { dispatch, AppState } from 'redux/AppState';
import { Database } from 'repository/Database';

import { RecipeListItem } from './RecipeListItem';
import { BackButton } from 'components/buttons/BackButton';
import { PDGradientText } from 'components/PDGradientText';
import { Color } from 'csstype';

interface RecipeListScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    // The selected pool
    pool?: Pool;
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
    recipes!: Recipe[];

    constructor(props: RecipeListScreenProps) {
        super(props);

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

    componentDidMount() {
        // Fetch pool from persistent storage
        if (this.props.pool !== null && this.props.pool !== undefined) {
            this.props.navigation.setParams({ poolName: this.props.pool.name });
        }
        // this.recipes = Database.loadRecipes();
        this.recipes = [];

        this.setState({ initialLoadFinished: true });
    }

    handleRecipeSelected = (recipe: Recipe): void => {
        Database.commitUpdates(() => {
            if (this.props.pool === undefined) {
                return;
            }
            this.props.pool.recipeId = recipe.objectId;
        });
        dispatch(selectRecipe(recipe));
        this.props.navigation.navigate('ReadingList');
    }

    handleBackPressed = () => {
        this.props.navigation.goBack();
    }

    getBackButtonTitle = (): string => {
        const pool = this.props.pool;
        if (pool !== undefined) {
            return pool.name;
        }
        return '';
    }

    render() {
        const recipes = (this.recipes === undefined) ? [] : this.recipes.map(p => p);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} forceInset={{ bottom: 'never' }}>
                <BackButton
                    title={this.getBackButtonTitle()}
                    onPress={this.handleBackPressed} />
                <PDGradientText style={styles.gradientText} colors={gradientColors}>
                    Recipes
                </PDGradientText>
                <View style={styles.container}>
                    <SectionList
                        style={{ flex: 1 }}
                        renderItem={({ item }) => <RecipeListItem recipe={item} onRecipeSelected={this.handleRecipeSelected} />}
                        renderSectionHeader={({ section }) => null}
                        sections={[
                            { data: recipes, title: 'Recipes' }
                        ]}
                        keyExtractor={item => (item as Recipe).objectId} />
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
    }
});
