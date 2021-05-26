import React from 'react';
import { StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDColor, PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { Haptic } from '~/services/HapticService';
import { RecipeService } from '~/services/RecipeService';

interface ChipButtonProps {
    recipeColor: PDColor;
    recipeKey: string | undefined | null;
    onPress: () => void;
}

export const ChipButton: React.FC<ChipButtonProps> = (props) => {
    const { recipeColor, recipeKey } = props;
    const theme = useTheme();

    const handlePressed = () => {
        Haptic.medium();
        props.onPress();
    };

    // TODO: don't load the recipe from disk just to display this button, add the recipeName to the pool.
    const recipe = useLoadRecipeHook(recipeKey ?? RecipeService.defaultRecipeKey);

    // TODO: simplify the colors
    const blurredName = recipeColor[0].toUpperCase() + recipeColor.slice(1);
    const backgroundColor = theme[`blurred${blurredName}`];
    const foregroundColor = theme[recipeColor];

    return (
        <TouchableScale onPress={ handlePressed } activeScale={ 0.95 } style={ { marginRight: 'auto' } }>
            <PDView style={ [styles.container, { backgroundColor, borderColor: `${foregroundColor}33` }] }>
                <PDView style={ { marginHorizontal: 4 } }>
                    <SVG.IconPlay width={ 15 } height={ 15 } fill={ foregroundColor } />
                </PDView>
                    <PDText type="buttonSmall" color={ recipeColor } numberOfLines={ 2 }>
                        {recipe?.name}
                    </PDText>
            </PDView>
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        padding: PDSpacing.xs,
        paddingRight: PDSpacing.sm,
        borderRadius: 48,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PDSpacing.xs,
        marginRight: 'auto',
    },
});
