import * as React from 'react';
import { View, StyleSheet } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import { PDText } from '~/components/PDText';
import { RecipeMeta } from '~/models/recipe/RecipeMeta';

interface RecipeListItemProps {
    recipe: RecipeMeta;
    onRecipeSelected: (recipe: RecipeMeta) => void;
}

export class RecipeListItem extends React.Component<RecipeListItemProps, {}> {
    private handleButtonPressed = (): void => {
        this.props.onRecipeSelected(this.props.recipe);
    };

    render() {
        const recipe = this.props.recipe;
        return (
            <TouchableScale style={ styles.content } onPress={ this.handleButtonPressed } activeScale={ 0.98 }>
                <View style={ { flex: 1 } }>
                    <PDText type="default" style={ styles.recipeNameText }>
                        {recipe.name}{' '}
                        <PDText type="default" style={ styles.recipeIdText }>
                            ({recipe.id})
                        </PDText>
                    </PDText>
                    <PDText type="default" style={ styles.recipeDescriptionText }>
                        {recipe.desc}{' '}
                    </PDText>
                </View>
            </TouchableScale>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 24,
        marginVertical: 6,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    recipeNameText: {
        color: '#009384',
        fontSize: 20,
        fontWeight: '700',
    },
    recipeIdText: {
        color: '#666666',
        fontSize: 16,
        fontWeight: '600',
    },
    recipeDescriptionText: {
        color: '#4C4C4C',
        fontSize: 16,
        fontWeight: '600',
    },
});
