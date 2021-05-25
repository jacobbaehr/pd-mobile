import React from 'react';
import { StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDColor, PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { RecipeService } from '~/services/RecipeService';

interface ChipButtonProps {
    // color: PDColor;
    recipeKey: string | undefined | null;
    onPress: () => void;
}

export const ChipButton: React.FC<ChipButtonProps> = (props) => {
    const { onPress, recipeKey } = props;
    const theme = useTheme();

    const getRandomColor = (): PDColor => {
        const colors: PDColor[] = ['blue', 'pink', 'green', 'orange', 'teal', 'purple'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor;
    };

    const randomNameColor = getRandomColor();
    const recipe = useLoadRecipeHook(recipeKey ?? RecipeService.defaultRecipeKey);
    const blurredName = randomNameColor[0].toUpperCase() + randomNameColor.slice(1);
    const backgroundColor = theme[`blurred${blurredName}`];
    const randomColor = theme[randomNameColor];
    return (
        <TouchableScale onPress={ onPress }>
            <PDView style={ [styles.container, { backgroundColor, borderColor: randomColor, maxWidth: '70%' }] }>
                <PDView style={ { marginHorizontal: 4 } }>
                    <SVG.IconPlay width={ 15 } height={ 15 } fill={ randomColor } />
                </PDView>
                    <PDText type="bodySemiBold" color={ randomNameColor } numberOfLines={ 2 }>
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
        borderRadius: 48,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: PDSpacing.sm,
    },
});
