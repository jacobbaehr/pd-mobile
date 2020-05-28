import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { ReadingEntry } from '~/models/logs/ReadingEntry';
import { TreatmentEntry } from '~/models/logs/TreatmentEntry';
import { Recipe } from '~/models/recipe/Recipe';
import { Pool } from '~/models/Pool';
import { AppState } from '~/redux/AppState';
import { Database } from '~/repository/Database';
import { CalculationService, CalculationResult } from '~/services/CalculationService';
import { GradientButton } from '~/components/buttons/GradientButton';
import { LogEntry } from '~/models/logs/LogEntry';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { useNavigation } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { ResultsHeader } from './ResultsHeader';

interface ResultsScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'Results'>;
    readings: ReadingEntry[];
    recipeKey: RecipeKey;
    pool: Pool;
}

interface ResultsScreenState {
    treatmentEntries: TreatmentEntry[];
    recipe?: Recipe
}

const mapStateToProps = (state: AppState, ownProps: ResultsScreenProps): ResultsScreenProps => {
    return {
        navigation: ownProps.navigation,
        readings: state.readingEntries,
        recipeKey: state.recipeKey!,
        pool: state.selectedPool!
    };
};

const ResultsScreenComponent: React.FunctionComponent<ResultsScreenProps> = (props) => {
    const [treatmentEntries, setTreatmentEntries] = React.useState<TreatmentEntry[]>([]);
    const [recipe, setRecipe] = React.useState<Recipe | null>(null);

    const { popToTop, goBack } = useNavigation<StackNavigationProp<PDNavStackParamList>>();

    React.useEffect(() => {
        try {
            const loadRecipe = async () => {
                const recipe = await RecipeRepo.loadLocalRecipeWithKey(props.recipeKey);
                setRecipe(recipe);
            }
            loadRecipe();
        } catch (e) {
            console.error(e);
        }
    }, []);

    if (!recipe) {
        return <View></View>;
    }

    const htmlString = CalculationService.getHtmlStringForLocalHermes(recipe, props.pool, props.readings);
    let treatmentString = '';
    treatmentEntries.forEach(treatmentEntry => {
        treatmentString += `\nAdd ${treatmentEntry.recommended} ounces of ${treatmentEntry.treatmentName}`;
    });

    const save = async () => {
        // const id = Math.random().toString(36).slice(2);
        // const ts = new Date().getTime();
        // const logEntry = LogEntry.make(id, props.pool.objectId, ts, props.readings, treatmentEntries, props.recipeKey);
        // console.log(logEntry);
        // await Database.saveNewLogEntry(logEntry);

        popToTop();
    }

    const onMessage = (event: WebViewMessageEvent) => {
        console.log('Got a message!');
        console.log(event.nativeEvent.data);
        const results = JSON.parse(event.nativeEvent.data) as CalculationResult[];
        const treatmentEntries: TreatmentEntry[] = [];
        results.forEach(tv => {
            const correspondingTreatments = recipe.treatments.filter(t => t.variableName === tv.variable);
            if (correspondingTreatments.length > 0) {
                const correspondingTreatment = correspondingTreatments[0];
                // It's tedious to coerce null -> undefined while respecting 0 as a real number
                const value = (tv.value === null) ? undefined : tv.value;
                treatmentEntries.push({
                    variableName: tv.variable,
                    recommended: value,
                    treatmentName: correspondingTreatment.name,
                    referenceId: correspondingTreatment.referenceId
                });
            }
        });
        setTreatmentEntries(treatmentEntries);
    }

    const handleBackPress = () => {
        // TODO: confirm if anything has been recorded.
        goBack();
    }

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } }>
            <ResultsHeader handleBackPress={ handleBackPress } pool={ props.pool } percentComplete={ 0 } />
            <View style={ styles.container }>
                <WebView
                    onMessage={ onMessage }
                    source={ { html: htmlString } }
                />
                <Text style={ styles.text }>
                    { treatmentString }
                </Text>
                <GradientButton title={ 'save' } onPress={ save } containerStyles={ styles.button } />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    },
    text: {
        margin: 15,
        justifyContent: 'center',
        color: 'black'
    },
    button: {
        marginHorizontal: 15,
        height: 100
    }
});

export const ResultsScreen = connect(mapStateToProps)(ResultsScreenComponent);
