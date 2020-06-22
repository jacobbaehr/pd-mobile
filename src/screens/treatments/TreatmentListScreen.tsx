import * as React from 'react';
import { StyleSheet, View, SafeAreaView, InputAccessoryView, Keyboard, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { ReadingEntry } from '~/models/logs/ReadingEntry';
import { Pool } from '~/models/Pool';
import { AppState, dispatch } from '~/redux/AppState';
import { Database } from '~/repository/Database';
import { CalculationService } from '~/services/CalculationService';
import { LogEntry } from '~/models/logs/LogEntry';
import { RecipeKey } from '~/models/recipe/RecipeKey';
import { useNavigation } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { TreatmentListHeader } from './TreatmentListHeader';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import { BoringButton } from '~/components/buttons/BoringButton';
import { Haptic } from '~/services/HapticService';
import { TreatmentListItem } from './TreatmentListItem';
import { Util } from '~/services/Util';
import { DryChemicalUnits, Converter } from './TreatmentUnits';
import { PDPickerRouteProps } from '../picker/PickerScreen';
import { DeviceSettings } from '~/models/DeviceSettings';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { PickerState } from '~/redux/picker/PickerState';
import { updatePickerState } from '~/redux/picker/Actions';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { TreatmentListHelpers, TreatmentState } from './TreatmentListHelpers';
import { useRecipeHook } from '../poolList/hooks/RealmPoolHook';
import { RecipeService } from '~/services/RecipeService';

interface TreatmentListScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'TreatmentList'>;
    readings: ReadingEntry[];
    pool: Pool;
    pickerState: PickerState | null;
}

const mapStateToProps = (state: AppState, ownProps: TreatmentListScreenProps): TreatmentListScreenProps => {
    return {
        navigation: ownProps.navigation,
        readings: state.readingEntries,
        pool: state.selectedPool!,
        pickerState: state.pickerState
    };
};

const TreatmentListScreenComponent: React.FunctionComponent<TreatmentListScreenProps> = (props) => {
    const recipeKey = props.pool.recipeKey || RecipeService.defaultRecipeKey;
    const [treatmentStates, setTreatmentStates] = React.useState<TreatmentState[]>([]);
    const [deviceSettings, setDeviceSettings] = React.useState<DeviceSettings | null>(null);
    const { popToTop, goBack, navigate } = useNavigation<StackNavigationProp<PDNavStackParamList>>();
    // I hate this... it's dirty. We should move this into the picker screen maybe?
    const [concentrationTreatmentVar, updateConcentrationTreatment] = React.useState<string | null>(null);
    const recipe = useRecipeHook(recipeKey);

    const keyboardAccessoryViewId = 'dedgumThisIsSomeReallyUniqueTextTreatmentListKeyboard';

    React.useEffect(() => {
        const loadSettings = async () => {
            const ds = await DeviceSettingsService.getSettings();
            setDeviceSettings(ds);
        };
        loadSettings();
    }, []);

    // This happens on every render... whatever.
    React.useEffect(() => {
        const { pickerState } = props;
        if (pickerState && pickerState.key === 'chem_concentration' && pickerState.value !== null && concentrationTreatmentVar) {
            const newConcentration = Math.min(Math.max(parseInt(pickerState.value), 1), 100);

            const treatmentModification = (ts: TreatmentState) => {
                const newOunces = ts.ounces * ts.concentration / newConcentration;
                const newValue = Converter.dryOunces(newOunces, ts.units);
                ts.ounces = newOunces;
                ts.value = newValue.toFixed(ts.decimalPlaces);
                ts.concentration = newConcentration;
                return true;
            }
            const didChange = TreatmentListHelpers.updateTreatmentState(concentrationTreatmentVar, treatmentModification, treatmentStates, setTreatmentStates);

            dispatch(updatePickerState(null));
            updateConcentrationTreatment(null);

            if (didChange && deviceSettings) {
                const ds = Util.deepCopy(deviceSettings);
                ds.treatments.concentrations[concentrationTreatmentVar] = newConcentration;
                // Surely I'm over-complicating this:
                setDeviceSettings(ds);
                TreatmentListHelpers.persistDeviceSettingsAsync(ds);
                dispatch((updateDeviceSettings(ds)));
            }
        }
    });

    if (!recipe) {
        return <View></View>;
    }

    const htmlString = CalculationService.getHtmlStringForLocalHermes(recipe, props.pool, props.readings);

    const save = async () => {
        const id = Math.random().toString(36).slice(2);
        const ts = new Date().getTime();

        const tes = CalculationService.mapTreatmentStatesToTreatmentEntries(treatmentStates);
        console.log('treatments: ', JSON.stringify(tes));

        const logEntry = LogEntry.make(id, props.pool.objectId, ts, props.readings, tes, recipeKey);

        await Database.saveNewLogEntry(logEntry);
        popToTop();
    }

    const onMessage = (event: WebViewMessageEvent) => {
        const tes = CalculationService.getTreatmentEntriesFromWebviewMessage(event, recipe);

        const tss: TreatmentState[] = tes.map(te => {
            const t = TreatmentListHelpers.getTreatmentFromRecipe(te.var, recipe);
            if (t === null) {
                return null;
            }
            const defaultDecimalPlaces = 1;

            let ounces = te.ounces || 0;
            const baseConcentration = t.concentration || 100;
            const concentrationOverride = TreatmentListHelpers.getConcentrationForTreatment(t.var, deviceSettings);

            if (concentrationOverride) {
                ounces = ounces * baseConcentration / concentrationOverride;
            }

            return {
                treatment: t,
                isOn: false,
                value: ounces.toFixed(defaultDecimalPlaces),
                units: 'ounces' as DryChemicalUnits,
                ounces,
                decimalPlaces: defaultDecimalPlaces,
                concentration: concentrationOverride || baseConcentration
            }
        }).filter(Util.notEmpty);

        setTreatmentStates(tss);
    }

    const handleIconPressed = (varName: string) => {
        Haptic.heavy();

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

        const modification = (ts: TreatmentState) => {
            ts.isOn = !ts.isOn;
            if (ts.isOn && !ts.value) {
                ts.value = '0';
            }
            return true;
        }
        TreatmentListHelpers.updateTreatmentState(varName, modification, treatmentStates, setTreatmentStates);
    }

    const handleUnitsButtonPressed = (varName: string) => {
        console.log('kaboom');
        Haptic.light();

        const modification = (ts: TreatmentState) => {
            const newUnits = Converter.nextDry(ts.units);
            const newValue = Converter.dryOunces(ts.ounces, newUnits);

            ts.units = newUnits;
            ts.value = newValue.toFixed(ts.decimalPlaces);
            return true;
        }
        TreatmentListHelpers.updateTreatmentState(varName, modification, treatmentStates, setTreatmentStates);
    }

    const handleTextUpdated = (varName: string, newText: string) => {
        const modification = (ts: TreatmentState) => {
            let newOunces = 0;
            if (newText.length > 0) {
                let newValue = parseFloat(newText);
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                newOunces = Converter.dry(newValue, ts.units, 'ounces');
            }
            if (ts.ounces !== newOunces) {
                ts.ounces = newOunces;
                return true;
            }
            return false;
        };
        TreatmentListHelpers.updateTreatmentState(varName, modification, treatmentStates, setTreatmentStates);
    }

    const handleTextFinishedEditing = (varName: string, newText: string) => {
        const modification = (ts: TreatmentState) => {
            let newOunces = 0;
            if (newText.length > 0) {
                let newValue = parseFloat(newText);
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                newOunces = Converter.dry(newValue, ts.units, 'ounces');
            }

            const decimalHalves = newText.split('.');
            let newDecimalPlaces = 1;
            if (decimalHalves.length > 1) {
                newDecimalPlaces = Math.max(decimalHalves[1].length, 1);
            }
            ts.decimalPlaces = newDecimalPlaces;
            ts.value = Converter.dry(newOunces, 'ounces', ts.units).toFixed(newDecimalPlaces);
            return true;
        };
        TreatmentListHelpers.updateTreatmentState(varName, modification, treatmentStates, setTreatmentStates);
    }

    const handleTreatmentNameButtonPressed = (varName: string) => {

        const t = TreatmentListHelpers.getTreatmentFromRecipe(varName, recipe);
        const concentration = TreatmentListHelpers.getConcentrationForTreatment(varName, deviceSettings) || t?.concentration || 100;
        updateConcentrationTreatment(varName);

        Keyboard.dismiss();
        const pickerProps: PDPickerRouteProps = {
            title: `Concentration %`,
            subtitle: t?.name || '',
            pickerKey: 'chem_concentration',
            prevSelection: concentration.toFixed(0)
        };
        navigate('PickerScreen', pickerProps);
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
                        handleTreatmentNameButtonPressed={ handleTreatmentNameButtonPressed }
                        inputAccessoryId={ keyboardAccessoryViewId } /> }
                    sections={ sections }
                    keyExtractor={ (item) => item.treatment.var }
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
