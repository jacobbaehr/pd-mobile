import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { PDText } from '~/components/PDText';
import { BackButton } from '~/components/buttons/BackButton';
import { RecipeMeta } from '~/models/recipe/RecipeMeta';

interface RecipeScreenHeaderProps {
    meta: RecipeMeta;
    handleBackPress: () => void;
}

export const RecipeScreenHeader: React.FunctionComponent<RecipeScreenHeaderProps> = (props) => {
    return (
        <View style={styles.container}>
            <BackButton title={'Recipes'} onPress={props.handleBackPress} color={'recipesGreen'} />
            <PDText type="default" style={styles.gradientText}>
                {props.meta.name}
            </PDText>
            <PDText type="default" style={styles.detailsText}>
                {props.meta.id}
            </PDText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    gradientText: {
        color: '#009384',
        fontSize: 28,
        fontWeight: '700',
        marginTop: 3,
    },
    detailsText: {
        color: 'rgba(0,0,0,.6)',
        fontWeight: '600',
        fontSize: 18,
        marginVertical: 7,
    },
});
