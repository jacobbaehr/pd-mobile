import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackButton } from '~/components/buttons/BackButton';
import { PDText } from '~/components/PDText';
import { Pool } from '~/models/Pool';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';

import { useNavigation } from '@react-navigation/native';

export const RecipeListHeader: React.FC = () => {
    const {  goBack  } = useNavigation<PDStackNavigationProps>();
    const pool = useTypedSelector(state => state.selectedPool) as Pool;

    const handlePressedBack = () => {
        goBack();
    };

    return (
        <View style={ styles.container }>
            <BackButton title={ pool.name } onPress={ handlePressedBack } color={ 'recipesGreen' } />
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
