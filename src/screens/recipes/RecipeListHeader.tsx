import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { PDText } from '~/components/PDText';
import { BackButton } from '~/components/buttons/BackButton';
import { Pool } from '~/models/Pool';

interface RecipeListHeaderProps {
    handleBackPress: () => void;
    pool: Pool;
}

export const RecipeListHeader: React.FunctionComponent<RecipeListHeaderProps> = (props) => {
    return (
        <View style={ styles.container }>
            <BackButton title={ props.pool.name } onPress={ props.handleBackPress } color={ 'recipesGreen' } />
            <PDText type="default" style={ styles.gradientText }>
                Change Recipe
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
        marginBottom: 7,
    },
});
