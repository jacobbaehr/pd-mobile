import * as React from 'react';
import { View, Text, StyleSheet, Button, SectionList, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Recipe } from '../../models/recipe/Recipe';

interface RecipeListItemProps {
    recipe: Recipe;

    onRecipeSelected: (recipe: Recipe) => void;
}

export class RecipeListItem extends React.Component<RecipeListItemProps, {}> {

    private handleButtonPressed = (): void => {
        this.props.onRecipeSelected(this.props.recipe);
    }

    render() {
        const recipe = this.props.recipe;

        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={ styles.content }
                    onPress={this.handleButtonPressed}>
                    <View style={{flex: 1}}>
                        <Text style={styles.recipeNameText}>{ recipe.name }</Text>
                        <Text style={styles.recipeDescriptionText}>{ recipe.description } </Text>
                        <Icon name="chevron-right" style={styles.iconStyle}></Icon>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 70,
    },
    content: {
        flex: 1,
        backgroundColor: '#0B1520',
        margin: 2,
        borderRadius: 3,
        borderWidth: .1,
        borderColor: '#BCBCC2',
        padding: 2
    },
    recipeNameText: {
        color: 'white',
        fontSize: 17,
    },
    recipeDescriptionText: {
        color: 'white',
        fontSize: 10,
        justifyContent: 'flex-end',
        marginTop: 10
    },
    iconStyle: {
        color: '#B3B3B3',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 25,
        fontSize: 15
    }
});
