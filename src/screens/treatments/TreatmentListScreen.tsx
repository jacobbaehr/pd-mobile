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
import { useNavigation } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { TreatmentListHeader } from './TreatmentListHeader';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import { BoringButton } from '~/components/buttons/BoringButton';
import { Haptic } from '~/services/HapticService';
import { TreatmentListItem } from './TreatmentListItem';
import { Util } from '~/services/Util';
import { Converter } from '../../services/TreatmentUnitsService';
import { PDPickerRouteProps } from '../picker/PickerScreen';
import { DeviceSettings } from '~/models/DeviceSettings';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { PickerState } from '~/redux/picker/PickerState';
import { updatePickerState } from '~/redux/picker/Actions';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { TreatmentListHelpers, TreatmentState } from './TreatmentListHelpers';
import { useRecipeHook } from '../poolList/hooks/RealmPoolHook';
import { RecipeService } from '~/services/RecipeService';
import { PlatformSpecific } from '~/components/PlatformSpecific';
import { Config } from '~/services/Config';
import { TreatmentListFooter } from './TreatmentListFooter';
import { DryChemicalUnits, WetChemicalUnits, Units } from '~/models/TreatmentUnits';
import { EffectiveTargetRange } from '~/models/recipe/TargetRange';

interface TreatmentListScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'TreatmentList'>;
    readings: ReadingEntry[];
    pool: Pool;
    pickerState: PickerState | null;
    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState, ownProps: TreatmentListScreenProps): TreatmentListScreenProps => {
    return {
        navigation: ownProps.navigation,
        readings: state.readingEntries,
        pool: state.selectedPool!,
        pickerState: state.pickerState,
        deviceSettings: state.deviceSettings,
    };
};

const TreatmentListScreenComponent: React.FunctionComponent<TreatmentListScreenProps> = (props) => {
    const recipeKey = props.pool.recipeKey || RecipeService.defaultRecipeKey;
    const [treatmentStates, setTreatmentStates] = React.useState<TreatmentState[]>([]);
    const [notes, setNotes] = React.useState('');
    const { goBack, navigate } = useNavigation<StackNavigationProp<PDNavStackParamList>>();
    // I hate this... it's dirty. We should move this into the picker screen maybe?
    const [concentrationTreatmentVar, updateConcentrationTreatment] = React.useState<string | null>(null);
    const recipe = useRecipeHook(recipeKey);

    const deviceSettings = props.deviceSettings;
    const allScoops = deviceSettings.scoops;

    const keyboardAccessoryViewId = 'dedgumThisIsSomeReallyUniqueTextTreatmentListKeyboard';

    // This happens on every render... whatever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        const { pickerState } = props;
        if (
            pickerState &&
            pickerState.key === 'chem_concentration' &&
            pickerState.value !== null &&
            concentrationTreatmentVar
        ) {
            const newConcentration = Math.min(Math.max(parseInt(pickerState.value), 1), 100);

            const treatmentModification = (ts: TreatmentState) => {
                const newOunces = (ts.ounces * ts.concentration) / newConcentration;
                let newValue = newOunces;
                const scoop = TreatmentListHelpers.getScoopForTreatment(ts.treatment.var, allScoops);
                if (ts.treatment.type === 'dryChemical') {
                    newValue = Converter.dryOunces(newOunces, ts.units as DryChemicalUnits, scoop);
                } else if (ts.treatment.type === 'liquidChemical') {
                    newValue = Converter.wetOunces(newOunces, ts.units as WetChemicalUnits, scoop);
                }

                ts.ounces = newOunces;
                ts.value = newValue.toFixed(ts.decimalPlaces);
                ts.concentration = newConcentration;
                return true;
            };
            const didChange = TreatmentListHelpers.updateTreatmentState(
                concentrationTreatmentVar,
                treatmentModification,
                treatmentStates,
                setTreatmentStates,
            );

            dispatch(updatePickerState(null));
            updateConcentrationTreatment(null);

            if (didChange) {
                const ds = Util.deepCopy(deviceSettings);
                ds.treatments.concentrations[concentrationTreatmentVar] = newConcentration;
                // Don't await it, be bold:
                DeviceSettingsService.saveSettings(ds);

                dispatch(updateDeviceSettings(ds));
            }
        }
    });

    if (!recipe) {
        return <View />;
    }
    // TODO: get the effective values for the pool / recipe combo here:
    const targets: EffectiveTargetRange[] = [];
    const htmlString = CalculationService.getHtmlStringForLocalHermes(recipe, props.pool, props.readings, targets);

    const save = async () => {
        const id = Math.random().toString(36).slice(2);
        const ts = new Date().getTime();

        const tes = CalculationService.mapTreatmentStatesToTreatmentEntries(treatmentStates);
        console.log('treatments: ', JSON.stringify(tes));
        console.log('notes: ', notes);

        const logEntry = LogEntry.make(id, props.pool.objectId, ts, props.readings, tes, recipeKey, notes);
        console.log('Log: ', JSON.stringify(logEntry));
        await Database.saveNewLogEntry(logEntry);

        // Save the last-used units:
        const newDeviceSettings = Util.deepCopy(deviceSettings);
        newDeviceSettings.treatments.units = TreatmentListHelpers.getUpdatedLastUsedUnits(
            newDeviceSettings.treatments.units,
            treatmentStates,
        );
        dispatch(updateDeviceSettings(newDeviceSettings));
        await DeviceSettingsService.saveSettings(newDeviceSettings);

        navigate('PoolScreen');
    };

    const onMessage = (event: WebViewMessageEvent) => {
        const tes = CalculationService.getTreatmentEntriesFromWebviewMessage(event, recipe);

        const lastUnits = deviceSettings.treatments.units;
        const tss: TreatmentState[] = tes
            .map((te) => {
                const t = TreatmentListHelpers.getTreatmentFromRecipe(te.var, recipe);
                if (t === null) {
                    return null;
                }
                const defaultDecimalPlaces = 1;

                let ounces = te.ounces || 0;
                const baseConcentration = t.concentration || 100;
                const concentrationOverride = TreatmentListHelpers.getConcentrationForTreatment(t.var, deviceSettings);

                if (concentrationOverride) {
                    ounces = (ounces * baseConcentration) / concentrationOverride;
                }

                let units: Units = 'ounces';
                let value = ounces;
                const scoop = TreatmentListHelpers.getScoopForTreatment(t.var, allScoops);
                console.log('a');

                if (scoop) {
                    console.log('b');
                    // If we have a saved scoop, start with that:
                    units = 'scoops';
                    if (t.type === 'dryChemical') {
                        console.log('c');
                        value = Converter.dry(value, 'ounces', 'scoops', scoop);
                        console.log('value: ' + value);
                        console.log(JSON.stringify(scoop));
                    } else if (t.type === 'liquidChemical') {
                        value = Converter.wet(value, 'ounces', 'scoops', scoop);
                    }
                } else if (lastUnits[t.var]) {
                    // Otherwise, try to start w/ the same units as last time
                    units = lastUnits[t.var] as Units;
                    if (units === 'scoops' && !scoop) {
                        /// If the scoop has been deleted
                        units = 'ounces';
                    }
                    if (t.type === 'dryChemical') {
                        value = Converter.dry(value, 'ounces', units as DryChemicalUnits, scoop);
                    } else if (t.type === 'liquidChemical') {
                        value = Converter.wet(value, 'ounces', units as WetChemicalUnits, scoop);
                    }
                }

                return {
                    treatment: t,
                    isOn: t.type === 'calculation',
                    value: value.toFixed(defaultDecimalPlaces),
                    units: units as Units,
                    ounces,
                    decimalPlaces: defaultDecimalPlaces,
                    concentration: concentrationOverride || baseConcentration,
                };
            })
            .filter(Util.notEmpty);

        setTreatmentStates(tss);
    };

    const handleIconPressed = (varName: string) => {
        Haptic.heavy();

        // Animate the progress bar change here:
        const springAnimationProperties = {
            type: Config.isIos ? LayoutAnimation.Types.keyboard : LayoutAnimation.Types.easeOut,
            property: LayoutAnimation.Properties.scaleXY,
        };
        const animationConfig = {
            duration: 250, // how long the animation will take
            create: undefined,
            update: springAnimationProperties,
            delete: undefined,
        };
        LayoutAnimation.configureNext(animationConfig);

        const modification = (ts: TreatmentState) => {
            ts.isOn = !ts.isOn;
            if (ts.isOn && !ts.value) {
                ts.value = '0';
            }
            return true;
        };
        TreatmentListHelpers.updateTreatmentState(varName, modification, treatmentStates, setTreatmentStates);
    };

    const handleUnitsButtonPressed = (varName: string) => {
        Haptic.light();

        const modification = (ts: TreatmentState) => {
            let newValue = ts.ounces;
            let newUnits = ts.units;
            const scoop = TreatmentListHelpers.getScoopForTreatment(ts.treatment.var, allScoops);

            if (ts.treatment.type === 'dryChemical') {
                newUnits = Converter.nextDry(ts.units as DryChemicalUnits, scoop);
                newValue = Converter.dryOunces(ts.ounces, newUnits, scoop);
            } else if (ts.treatment.type === 'liquidChemical') {
                newUnits = Converter.nextWet(ts.units as WetChemicalUnits, scoop);
                newValue = Converter.wetOunces(ts.ounces, newUnits, scoop);
            }

            ts.units = newUnits;
            ts.value = newValue.toFixed(ts.decimalPlaces);
            return true;
        };
        TreatmentListHelpers.updateTreatmentState(varName, modification, treatmentStates, setTreatmentStates);
    };

    const handleTextUpdated = (varName: string, newText: string) => {
        const modification = (ts: TreatmentState) => {
            let newOunces = 0;
            if (newText.length > 0) {
                let newValue = parseFloat(newText);
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                const scoop = TreatmentListHelpers.getScoopForTreatment(ts.treatment.var, allScoops);

                if (ts.treatment.type === 'dryChemical') {
                    newOunces = Converter.dry(newValue, ts.units as DryChemicalUnits, 'ounces', scoop);
                } else if (ts.treatment.type === 'liquidChemical') {
                    newOunces = Converter.wet(newValue, ts.units as WetChemicalUnits, 'ounces', scoop);
                } else if (ts.treatment.type === 'calculation') {
                    newOunces = newValue;
                }
            }
            if (ts.ounces !== newOunces) {
                ts.ounces = newOunces;
                return true;
            }
            return false;
        };
        TreatmentListHelpers.updateTreatmentState(varName, modification, treatmentStates, setTreatmentStates);
    };

    const handleTextFinishedEditing = (varName: string, newText: string) => {
        const modification = (ts: TreatmentState) => {
            let newOunces = 0;
            if (newText.length > 0) {
                let newValue = parseFloat(newText);
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                const scoop = TreatmentListHelpers.getScoopForTreatment(ts.treatment.var, allScoops);

                if (ts.treatment.type === 'dryChemical') {
                    newOunces = Converter.dry(newValue, ts.units as DryChemicalUnits, 'ounces', scoop);
                } else if (ts.treatment.type === 'liquidChemical') {
                    newOunces = Converter.wet(newValue, ts.units as WetChemicalUnits, 'ounces', scoop);
                } else if (ts.treatment.type === 'calculation') {
                    newOunces = newValue;
                }
            }

            const decimalHalves = newText.split('.');
            let newDecimalPlaces = 1;
            if (decimalHalves.length > 1) {
                newDecimalPlaces = Math.max(decimalHalves[1].length, 1);
            }
            ts.decimalPlaces = newDecimalPlaces;
            const scoop = TreatmentListHelpers.getScoopForTreatment(ts.treatment.var, allScoops);

            if (ts.treatment.type === 'dryChemical') {
                ts.value = Converter.dry(newOunces, 'ounces', ts.units as DryChemicalUnits, scoop).toFixed(
                    newDecimalPlaces,
                );
            } else if (ts.treatment.type === 'liquidChemical') {
                ts.value = Converter.wet(newOunces, 'ounces', ts.units as WetChemicalUnits, scoop).toFixed(
                    newDecimalPlaces,
                );
            } else if (ts.treatment.type === 'calculation') {
                ts.value = newText;
            }
            return true;
        };
        TreatmentListHelpers.updateTreatmentState(varName, modification, treatmentStates, setTreatmentStates);
    };

    const handleTreatmentNameButtonPressed = (varName: string) => {
        const t = TreatmentListHelpers.getTreatmentFromRecipe(varName, recipe);
        const concentration =
            TreatmentListHelpers.getConcentrationForTreatment(varName, deviceSettings) || t?.concentration || 100;
        updateConcentrationTreatment(varName);

        Keyboard.dismiss();
        const pickerProps: PDPickerRouteProps = {
            title: 'Concentration %',
            subtitle: t?.name || '',
            pickerKey: 'chem_concentration',
            prevSelection: concentration.toFixed(0),
        };
        navigate('PickerScreen', pickerProps);
    };

    const handleBackPress = () => {
        goBack();
    };

    const sections = [{ title: 'booga', data: treatmentStates }];
    let progress = 0;
    if (recipe) {
        const countedTreatmentStates = treatmentStates.filter((ts) => ts.treatment.type !== 'calculation');
        const completed = countedTreatmentStates.filter((ts) => ts.isOn);
        progress = countedTreatmentStates.length == 0 ? 0 : completed.length / countedTreatmentStates.length;
    }

    return (
        <SafeAreaView style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
            <TreatmentListHeader handleBackPress={handleBackPress} pool={props.pool} percentComplete={progress} />
            <View style={styles.container}>
                <KeyboardAwareSectionList
                    style={styles.sectionList}
                    keyboardDismissMode={'interactive'}
                    keyboardShouldPersistTaps={'handled'}
                    renderItem={({ item }) => (
                        <TreatmentListItem
                            treatmentState={item}
                            onTextboxUpdated={handleTextUpdated}
                            onTextboxFinished={handleTextFinishedEditing}
                            handleUnitsButtonPressed={handleUnitsButtonPressed}
                            handleIconPressed={handleIconPressed}
                            handleTreatmentNameButtonPressed={handleTreatmentNameButtonPressed}
                            inputAccessoryId={keyboardAccessoryViewId}
                        />
                    )}
                    sections={sections}
                    keyExtractor={(item) => item.treatment.var}
                    contentInsetAdjustmentBehavior={'always'}
                    stickySectionHeadersEnabled={false}
                    canCancelContentTouches={true}
                    renderSectionFooter={() => <TreatmentListFooter text={notes} updatedText={setNotes} />}
                />
                <WebView containerStyle={styles.webview} onMessage={onMessage} source={{ html: htmlString }} />
                <View style={styles.bottomButtonContainer}>
                    <BoringButton containerStyles={styles.button} onPress={save} title="Save" />
                </View>
            </View>
            <PlatformSpecific include={['ios']}>
                <InputAccessoryView nativeID={keyboardAccessoryViewId}>
                    <View style={styles.keyboardAccessoryContainer}>
                        <BoringButton
                            containerStyles={styles.keyboardAccessoryButton}
                            textStyles={styles.keyboardAccessoryButtonText}
                            onPress={() => {
                                Keyboard.dismiss();
                                Haptic.light();
                            }}
                            title="Done Typing"
                        />
                    </View>
                </InputAccessoryView>
            </PlatformSpecific>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    sectionList: {
        flex: 1,
        backgroundColor: '#F5F3FF',
        paddingTop: 12,
    },
    webview: {
        backgroundColor: 'red',
        height: 1,
        flex: 0,
    },
    text: {
        margin: 15,
        justifyContent: 'center',
        color: 'black',
    },
    bottomButtonContainer: {
        backgroundColor: 'white',
        borderTopColor: '#F0F0F0',
        borderTopWidth: 2,
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#B700F8',
        margin: 12,
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 28,
        marginTop: 6,
        marginBottom: 4,
        marginLeft: 16,
    },
    keyboardAccessoryContainer: {
        backgroundColor: '#F8F8F8',
        padding: 12,
    },
    keyboardAccessoryButton: {
        backgroundColor: 'rgba(57, 16, 232, 0.6)',
        marginHorizontal: 24,
    },
    keyboardAccessoryButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export const TreatmentListScreen = connect(mapStateToProps)(TreatmentListScreenComponent);
