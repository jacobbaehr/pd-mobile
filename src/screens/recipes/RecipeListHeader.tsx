import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackButton } from '~/components/buttons/BackButton';
import { PDText } from '~/components/PDText';
import { PDStackNavigationProps } from '~/navigator/shared';

import { useNavigation } from '@react-navigation/native';

interface RecipeListHeaderProps {
    poolName: string;
}

export const RecipeListHeader: React.FC<RecipeListHeaderProps> = (props) => {
    const {  goBack  } = useNavigation<PDStackNavigationProps>();
    const { poolName } = props;

    const handlePressedBack = () => {
        goBack();
    };

    return (
        <View style={ styles.container }>
            <BackButton title={ poolName } onPress={ handlePressedBack } color={ 'recipesGreen' } />
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
