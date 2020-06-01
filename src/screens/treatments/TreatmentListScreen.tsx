import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, InputAccessoryView, Keyboard, LayoutAnimation } from 'react-native';
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
import { LogEntry } from '~/models/logs/LogEntry';
import { RecipeRepo } from '~/repository/RecipeRepo';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { useNavigation } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { TreatmentListHeader } from './TreatmentListHeader';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import { BoringButton } from '~/components/buttons/BoringButton';
import { Haptic } from '~/services/HapticService';
import { TreatmentListItem, TreatmentState } from './TreatmentListItem';
import { Treatment } from '~/models/recipe/Treatment';
import { Util } from '~/services/Util';
import { DryChemicalUnits, Converter } from './TreatmentUnits';

interface TreatmentListScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'TreatmentList'>;
    readings: ReadingEntry[];
    recipeKey: RecipeKey;
    pool: Pool;
}

const mapStateToProps = (state: AppState, ownProps: TreatmentListScreenProps): TreatmentListScreenProps => {
    return {
        navigation: ownProps.navigation,
        readings: state.readingEntries,
        recipeKey: state.recipeKey!,
        pool: state.selectedPool!
    };
};

const TreatmentListScreenComponent: React.FunctionComponent<TreatmentListScreenProps> = (props) => {
    const [recipe, setRecipe] = React.useState<Recipe | null>(null);
    const [treatmentStates, setTreatmentStates] = React.useState<TreatmentState[]>([]);

    const { popToTop, goBack } = useNavigation<StackNavigationProp<PDNavStackParamList>>();

    const keyboardAccessoryViewId = 'dedgumThisIsSomeReallyUniqueTextTreatmentListKeyboard';

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
        const tes: TreatmentEntry[] = [];
        results.forEach(tv => {
            const correspondingTreatments = recipe.treatments.filter(t => t.variableName === tv.variable);
            if (correspondingTreatments.length > 0) {
                const correspondingTreatment = correspondingTreatments[0];
                // It's tedious to coerce null -> undefined while respecting 0 as a real number
                const value = (tv.value === null) ? undefined : tv.value;
                tes.push({
                    variableName: tv.variable,
                    recommended: value,
                    treatmentName: correspondingTreatment.name,
                    referenceId: correspondingTreatment.referenceId
                });
            }
        });
        console.log("local entries: ", tes);

        const tss: TreatmentState[] = tes.map(te => {
            const t = getTreatmentFromRecipe(te.variableName, recipe);
            if (t === null) {
                return null;
            }
            return {
                treatment: t,
                isOn: false,
                value: te.recommended?.toFixed(1),
                units: 'ounces' as DryChemicalUnits,
                ounces: te.recommended || 0
            }
        }).filter(Util.notEmpty);

        setTreatmentStates(tss);
    }

    const handleIconPressed = (varName: string) => {
        Haptic.light();
        const tss = Util.deepCopy(treatmentStates);
        tss.forEach((ts) => {
            if (ts.treatment.variableName === varName) {
                ts.isOn = !ts.isOn;
                if (ts.isOn && !ts.value) {
                    ts.value = '0';
                }
            }
        });
        // Animate the progress bar change here:
        const springAnimationProperties = {
            type: LayoutAnimation.Types.keyboard,
            property: LayoutAnimation.Properties.scaleXY,
        };
        const animationConfig = {
            duration: 250, // how long the animation will take	
            create: undefined,
            update: springAnimationProperties,
            delete: undefined
        };
        LayoutAnimation.configureNext(animationConfig);
        setTreatmentStates(tss);
    }

    const handleUnitsButtonPressed = (varName: string) => {
        console.log('kaboom');
        Haptic.light();
        const tss = Util.deepCopy(treatmentStates);
        tss.forEach((ts) => {
            if (ts.treatment.variableName === varName) {
                const newUnits = Converter.nextDry(ts.units);
                const newValue = Converter.dryOunces(ts.ounces, newUnits);

                ts.units = newUnits;
                ts.value = newValue.toFixed(1);
            }
        });

        setTreatmentStates(tss);
    }

    const handleTextUpdated = (varName: string, newText: string) => {
        console.log('kaboooooooooooo');
        const tss = Util.deepCopy(treatmentStates);
        let didChange = false;
        tss.forEach((ts) => {
            if (ts.treatment.variableName === varName) {
                let newOunces = 0;
                if (newText.length > 0) {
                    let newValue = parseFloat(newText);
                    if (isNaN(newValue)) {
                        newValue = 0;
                    }
                    newOunces = Converter.dry(newValue, ts.units, 'ounces');
                }
                if (ts.ounces !== newOunces) {
                    console.log('CHANGING!!!!!');
                    ts.ounces = newOunces;
                    didChange = true;
                }
            }
        });
        if (didChange) {
            setTreatmentStates(tss);
        }
    }

    const handleTextFinishedEditing = (varName: string, newText: string) => {
        const tss = Util.deepCopy(treatmentStates);
        tss.forEach((ts) => {
            if (ts.treatment.variableName === varName) {
                let newOunces = 0;
                if (newText.length > 0) {
                    let newValue = parseFloat(newText);
                    if (isNaN(newValue)) {
                        newValue = 0;
                    }
                    newOunces = Converter.dry(newValue, ts.units, 'ounces');
                }
                ts.value = Converter.dry(newOunces, 'ounces', ts.units).toFixed(1);
            }
        });
        setTreatmentStates(tss);
    }

    const handleBackPress = () => {
        goBack();
    }

    const sections = [{ title: 'booga', data: treatmentStates }];

    let progress = 0;
    if (recipe) {
        const completed = treatmentStates.filter(ts => ts.isOn);
        progress = (treatmentStates.length == 0)
            ? 0
            : (completed.length / treatmentStates.length);
    }

    return (
        <SafeAreaView style={ { display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'white' } }>
            <TreatmentListHeader handleBackPress={ handleBackPress } pool={ props.pool } percentComplete={ progress } />
            <View style={ styles.container }>
                <KeyboardAwareSectionList
                    style={ styles.sectionList }
                    keyboardDismissMode={ 'interactive' }
                    keyboardShouldPersistTaps={ 'handled' }
                    renderItem={ ({ item }) => <TreatmentListItem
                        treatmentState={ item }
                        onTextboxUpdated={ handleTextUpdated }
                        onTextboxFinished={ handleTextFinishedEditing }
                        handleUnitsButtonPressed={ handleUnitsButtonPressed }
                        handleIconPressed={ handleIconPressed }
                        inputAccessoryId={ keyboardAccessoryViewId } /> }
                    sections={ sections }
                    keyExtractor={ (item) => item.treatment.variableName }
                    contentInsetAdjustmentBehavior={ 'always' }
                    stickySectionHeadersEnabled={ false }
                    canCancelContentTouches={ true }
                // renderSectionFooter={ () => <TreatmentListFooter recipe={ recipe || null } /> }
                />
                <WebView
                    containerStyle={ styles.webview }
                    onMessage={ onMessage }
                    source={ { html: htmlString } }
                />
                <BoringButton
                    containerStyles={ styles.button }
                    onPress={ save }
                    title="Save"
                />
            </View>
            <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                <View style={ styles.keyboardAccessoryContainer }>
                    <BoringButton
                        containerStyles={ styles.keyboardAccessoryButton }
                        textStyles={ styles.keyboardAccessoryButtonText }
                        onPress={ () => { Keyboard.dismiss(); Haptic.light(); } }
                        title="Done Typing"
                    />
                </View>
            </InputAccessoryView>
        </SafeAreaView>
    );
}

const getTreatmentFromRecipe = (treatmentVarName: string, recipe: Recipe): Treatment | null => {
    for (let i = 0; i < recipe.treatments.length; i++) {
        const t = recipe.treatments[i];
        if (t.variableName === treatmentVarName) {
            return t;
        }
    }
    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    sectionList: {
        flex: 1,
        backgroundColor: '#F5F3FF',
        paddingTop: 12,
    },
    webview: {
        backgroundColor: 'red',
        height: 1,
        flex: 0
    },
    text: {
        margin: 15,
        justifyContent: 'center',
        color: 'black'
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#B700F8',
        margin: 12,
        marginBottom: 24
    },
    keyboardAccessoryContainer: {
        backgroundColor: '#F8F8F8',
        padding: 12,
    },
    keyboardAccessoryButton: {
        backgroundColor: 'rgba(57, 16, 232, 0.6)',
        marginHorizontal: 24
    },
    keyboardAccessoryButtonText: {
        color: 'white',
        fontSize: 18
    }
});

export const TreatmentListScreen = connect(mapStateToProps)(TreatmentListScreenComponent);
