import * as React from 'react';
import { View, StyleSheet } from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';

import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { FormulaMeta } from '~/models/recipe/FormulaMeta';

interface FormulaListItemProps {
    formula: FormulaMeta;
    onFormulaSelected: (formula: FormulaMeta) => void;
    isActiveFormula: boolean;
}

export const FormulaListItem: React.FC<FormulaListItemProps> = (props) => {

    const theme = useTheme();

    const handleButtonPressed = (): void => {
        props.onFormulaSelected(props.formula);
    };

    const recipe = props.formula;
    const borderStyles = props.isActiveFormula
        ? { borderColor: theme.colors.blue }
        : { borderColor: theme.colors.border };

    return (
        <TouchableScale style={ [styles.content, borderStyles] } onPress={ handleButtonPressed } activeScale={ 0.98 }>
            <View style={ { flex: 1 } }>
                <View style={ {  display: 'flex', flexDirection: 'row', marginBottom: PDSpacing.xs } }>
                    <PDText type="bodyBold" color="black">
                        {recipe.name}{'  '}
                    </PDText>
                    {
                        recipe.isOfficial && <SVG.IconBadge width={ 14 } height={ 14 } style={ { marginTop: 'auto', marginBottom: 'auto' } } />
                    }
                </View>
                {
                    !recipe.isOfficial &&
                        <PDText type="buttonSmall" color="red" style={ { marginBottom: PDSpacing.xs } }>
                            #{recipe.id}
                        </PDText>
                }
                <PDText type="tooltip" color="greyDark">
                    {recipe.desc}{' '}
                </PDText>
            </View>
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 24,
        marginVertical: 6,
        borderRadius: 8,
        borderWidth: 2,
        paddingVertical: PDSpacing.sm,
        paddingHorizontal: PDSpacing.md,
    },
});
