import { format } from 'date-fns';
import * as React from 'react';
import {
    Linking, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, View,
} from 'react-native';
import { BoringButton } from '~/components/buttons/BoringButton';
import { PDText } from '~/components/PDText';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { FormulaKey } from '~/models/recipe/FormulaKey';
import { PDCardNavigatorParams } from '~/navigator/PDCardNavigator';
import { PDStackNavigationProps } from '~/navigator/shared';
import { dispatch } from '~/redux/AppState';
import { updateSelectedRecipe } from '~/redux/selectedRecipe/Actions';
import { Config } from '~/services/Config/AppConfig';
import { RS } from '~/services/RecipeUtil';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { SVG } from '~/assets/images';
import { PDView } from '~/components/PDView';
import { useContrastStatusBar } from '~/hooks/useStatusBar';

export interface FormulaDetailsNavParams {
    formulaKey: FormulaKey;
    prevScreen: 'ReadingList' | 'EditOrCreatePoolScreen' | 'PoolScreen';
}

export const FormulaScreen: React.FC = () => {
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const { params } = useRoute<RouteProp<PDCardNavigatorParams, 'FormulaDetails'>>();

    const formula = useLoadRecipeHook(params.formulaKey);
    const [isWebButtonPressed, setIsWebButtonPressed] = React.useState(false);

    const theme = useTheme();
    useContrastStatusBar();

    if (!formula) {
        return <></>;
    }

    const isOfficial = RS.isOfficial(formula);

    const meta = RS.toMeta(formula);

    const handleSelectFormulaPressed = () => {
        dispatch(updateSelectedRecipe(params.formulaKey));
        navigate(params.prevScreen);
    };

    const handleViewDetailsPressed = () => {
        Linking.openURL(`${Config.web_app_url}/formula/${meta.id}/edit`);
    };

    const webButtonStyles = isWebButtonPressed ? styles.recipeLinkPressed : styles.recipeLinkNormal;

    const readingList = formula.readings.map((r) => (
        <PDText type="content" style={ styles.textBody } key={ `r:${formula.readings.indexOf(r)}` }>
            • {r.name}
        </PDText>
    ));
    const treatmentList = formula.treatments.map((t) => (
        <PDText type="content" style={ styles.textBody } key={ `t:${formula.treatments.indexOf(t)}` }>
            • {t.name}
        </PDText>
    ));
    const updatedText = format(formula.ts, '• MMM d, y') + format(formula.ts, '  //  h:mma').toLowerCase();

    const bottomBorderStyle = { borderBottomColor: theme.colors.border, borderBottomWidth: 2 };
    const scrollViewStyle = { backgroundColor: theme.colors.blurredOrange };

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } }>
            <PDView style={ styles.container }>
                <ScreenHeader color="orange" hasBackButton hasBottomLine={ false }>Formula Details</ScreenHeader>
                <PDView style={ [styles.titleContainer, bottomBorderStyle] }>
                    <PDView style={ {  display: 'flex', flexDirection: 'row', marginBottom: PDSpacing.xs } }>
                        <PDText type="heading" color="black">
                            {formula.name}{'  '}
                        </PDText>
                        {
                            isOfficial && <SVG.IconBadge width={ 20 } height={ 20 } style={ { marginTop: 'auto', marginBottom: 'auto' } } />
                        }
                    </PDView>
                    {
                        !isOfficial &&
                            <PDText type="buttonSmall" color="red" style={ { marginBottom: PDSpacing.xs } }>
                                #{formula.id}
                            </PDText>
                    }
                </PDView>
                {/* <RecipeScreenHeader handleBackPress={ handleBackPressed } meta={ meta } /> */}
                <ScrollView style={ [bottomBorderStyle, scrollViewStyle] } contentInset={ { top: 12, bottom: 12 } }>
                    <PDText type="content" style={ styles.textBody }>
                        {formula.description}
                    </PDText>
                    <PDText type="subHeading" color="greyDark" style={ styles.textTitle }>
                        Readings
                    </PDText>
                    {readingList}
                    <PDText type="subHeading" color="greyDark" style={ styles.textTitle }>
                        Treatments
                    </PDText>
                    {treatmentList}
                    <PDText type="subHeading" color="greyDark" style={ styles.textTitle }>
                        Last Updated
                    </PDText>
                    <PDText type="content" style={ styles.textBody }>
                        {updatedText}
                    </PDText>
                    <PDText type="subHeading" color="greyDark" style={ styles.textTitle }>
                        View calculations
                    </PDText>
                    <View style={ styles.topRow }>
                        <TouchableHighlight
                            onPressIn={ () => setIsWebButtonPressed(true) }
                            onPressOut={ () => setIsWebButtonPressed(false) }
                            onPress={ handleViewDetailsPressed }>
                            <PDText type="default" style={ webButtonStyles }>
                                Open in your browser
                            </PDText>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <BoringButton
                    containerStyles={ [styles.button, { backgroundColor: theme.colors.orange }] }
                    onPress={ handleSelectFormulaPressed }
                    title="Use formula"
                />
            </PDView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    titleContainer: {
        paddingLeft: PDSpacing.md,
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#009384',
        margin: 12,
        marginBottom: 24,
    },
    textTitle: {
        margin: PDSpacing.sm,
    },
    textBody: {
        marginLeft: PDSpacing.md,
        marginBottom: 3,
    },
    topRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 24,
    },
    changeRecipeIntro: {
        color: 'rgba(0,0,0,.6)',
        fontSize: 18,
    },
    recipeLinkPressed: {
        backgroundColor: 'transparent',
        color: '#3910E8',
        fontSize: 18,
    },
    recipeLinkNormal: {
        backgroundColor: 'transparent',
        color: '#3910E8',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    recipeNameIntroText: {
        marginTop: 16,
        color: 'rgba(0,0,0,.6)',
        fontSize: 18,
        marginLeft: 24,
    },
    recipeNameText: {
        color: 'rgba(0,0,0,.6)',
        fontWeight: '700',
        fontSize: 18,
    },
    recipeDescriptionText: {
        color: 'rgba(0,0,0,.6)',
        fontSize: 18,
        marginTop: 12,
    },
});
