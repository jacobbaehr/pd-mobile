import { format } from 'date-fns';
import * as React from 'react';
import {
    Linking, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, View,
} from 'react-native';
import { BoringButton } from '~/components/buttons/BoringButton';
import { PDText } from '~/components/PDText';
import { useLoadRecipeHook } from '~/hooks/RealmPoolHook';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { PDCardNavigatorParams } from '~/navigator/PDCardNavigator';
import { PDStackNavigationProps } from '~/navigator/shared';
import { dispatch } from '~/redux/AppState';
import { updateSelectedRecipe } from '~/redux/selectedRecipe/Actions';
import { Config } from '~/services/Config';
import { RS } from '~/services/RecipeUtil';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { RecipeScreenHeader } from './RecipeScreenHeader';

export interface RecipeDetailsNavParams {
    recipeKey: RecipeKey;
    prevScreen: 'ReadingList' | 'EditOrCreatePoolScreen' | 'PoolScreen';
}

export const RecipeScreen: React.FC = () => {
    const { navigate, goBack } = useNavigation<PDStackNavigationProps>();
    const { params } = useRoute<RouteProp<PDCardNavigatorParams, 'RecipeDetails'>>();

    const recipe = useLoadRecipeHook(params.recipeKey);
    const [isWebButtonPressed, setIsWebButtonPressed] = React.useState(false);

    if (!recipe) {
        return <></>;
    }

    const meta = RS.toMeta(recipe);

    const handleBackPressed = (): void => {
        goBack();
    };

    const handleSelectRecipePressed = () => {
        dispatch(updateSelectedRecipe(params.recipeKey));
        navigate(params.prevScreen);
    };

    const handleViewDetailsPressed = () => {
        Linking.openURL(`${Config.web_app_url}/recipe/${meta.id}/edit`);
    };

    const webButtonStyles = isWebButtonPressed ? styles.recipeLinkPressed : styles.recipeLinkNormal;

    const readingList = recipe.readings.map((r) => (
        <PDText type="default" style={ styles.textBody } key={ `r:${recipe.readings.indexOf(r)}` }>
            • {r.name}
        </PDText>
    ));
    const treatmentList = recipe.treatments.map((t) => (
        <PDText type="default" style={ styles.textBody } key={ `t:${recipe.treatments.indexOf(t)}` }>
            • {t.name}
        </PDText>
    ));
    const updatedText = format(recipe.ts, '• MMM d, y') + format(recipe.ts, '  //  h:mma').toLowerCase();

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } }>
            <View style={ styles.container }>
                <RecipeScreenHeader handleBackPress={ handleBackPressed } meta={ meta } />
                <ScrollView style={ styles.scrollView } contentInset={ { top: 12, bottom: 12 } }>
                    <PDText type="default" style={ styles.textTitle }>
                        Description
                    </PDText>
                    <PDText type="default" style={ styles.textBody }>
                        {recipe.description}
                    </PDText>
                    <PDText type="default" style={ styles.textTitle }>
                        Readings
                    </PDText>
                    {readingList}
                    <PDText type="default" style={ styles.textTitle }>
                        Treatments
                    </PDText>
                    {treatmentList}
                    <PDText type="default" style={ styles.textTitle }>
                        Last Updated
                    </PDText>
                    <PDText type="default" style={ styles.textBody }>
                        {updatedText}
                    </PDText>
                    <PDText type="default" style={ styles.recipeNameIntroText }>
                        Want to see the calculations?
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
                    containerStyles={ styles.button }
                    onPress={ handleSelectRecipePressed }
                    title="Use this formula"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F2F9F9',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#009384',
        margin: 12,
        marginBottom: 24,
    },
    textBody: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 24,
        marginRight: 16,
        marginBottom: 3,
    },
    textBodyTop: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 24,
        marginTop: 16,
        marginRight: 16,
    },
    textTitle: {
        fontSize: 22,
        fontWeight: '700',
        margin: 16,
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
