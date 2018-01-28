import * as React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from '../../components/Button';
import { RecipeListItem } from './RecipeListItem';
import { AppState } from '../../Redux/AppState';
import { Database } from '../../Models/Database';
import { Reading } from '../../Models/Reading';
import { Pool } from '../../Models/Pool';
import { Recipe } from '../../Models/Recipe/Recipe';

interface RecipeListScreenProps {
    navigation: NavigationScreenProp<{}, {}>;

    // The id of the selected pool
    selectedPoolId?: string;
}

const mapStateToProps = (state: AppState, ownProps: RecipeListScreenProps): RecipeListScreenProps => {
    return {
        navigation: ownProps.navigation,
        selectedPoolId: state.selectedPoolId
    }
}

interface RecipeListScreenState {
    initialLoadFinished: boolean;
}

class RecipeListScreenComponent extends React.Component<RecipeListScreenProps, {}> {
    pool: Pool;
    recipes: Realm.Results<Recipe>;

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
        if (this.props.selectedPoolId !== null && this.props.selectedPoolId !== undefined) {
            this.pool = Database.loadPool(this.props.selectedPoolId);
            this.props.navigation.setParams({ poolName: this.pool.name });
        }
        this.recipes = Database.loadRecipes();

        this.setState({ initialLoadFinished: true });
    }

    handleRecipeSelected = (recipe: Recipe): void => {
        // TODO: set pool selected recipe id, push readings screen
        // this.props.navigation.navigate('ReadingList');
    }

    render() {
        const recipes = (this.recipes === undefined) ? [] : this.recipes.map(p => p);
        return(
            <View style={styles.container}>
                    <SectionList
                        style={{flex:1}}
                        renderItem={({item}) => <RecipeListItem recipe={item} onRecipeSelected={this.handleRecipeSelected} />}
                        renderSectionHeader={({section}) => null }
                        sections={[
                            {data: recipes, title: 'Recipes'}
                        ]}
                        keyExtractor={item => (item as Recipe).objectId}
                    />
            </View>
        );
    }
}

export const RecipeListScreen = connect(mapStateToProps)(RecipeListScreenComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#070D14'
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
