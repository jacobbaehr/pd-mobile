import * as React from 'react';
import {
    InputAccessoryView, Keyboard, LayoutAnimation, SectionListData, StyleSheet, View,
} from 'react-native';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { BoringButton } from '~/components/buttons/BoringButton';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PlatformSpecific } from '~/components/PlatformSpecific';
import { ServiceNonStickyHeader } from '~/components/services/ServiceNonStickyHeader';
import { ServiceStickyHeaderList } from '~/components/services/ServiceStickyHeaderList';
import { useLoadRecipeHook, useRealmPoolTargetRangesForPool } from '~/hooks/RealmPoolHook';
import { LogEntry } from '~/models/logs/LogEntry';
import { Pool } from '~/models/Pool';
import { DryChemicalUnits, Units, WetChemicalUnits } from '~/models/TreatmentUnits';
import { PDNavParams } from '~/navigator/shared';
import { dispatch, useTypedSelector } from '~/redux/AppState';
import { clearPickerState } from '~/redux/picker/Actions';
import { clearReadings } from '~/redux/readingEntries/Actions';
import { Database } from '~/repository/Database';
import { CalculationService } from '~/services/CalculationService';
import { Config } from '~/services/Config';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';
import { Haptic } from '~/services/HapticService';
import { RecipeService } from '~/services/RecipeService';
import { Converter } from '~/services/TreatmentUnitsService';
import { Util } from '~/services/Util';

import { useNavigation, useNavigationState } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TargetsHelper } from '../customTargets/TargetHelper';
import { PDPickerRouteProps } from '../picker/PickerScreen';
import { TreatmentListFooter } from './TreatmentListFooter';
import { TreatmentListHelpers, TreatmentState } from './TreatmentListHelpers';
import { TreatmentListItem } from './TreatmentListItem';
import { RealmUtil } from '~/services/RealmUtil';

export const TreatmentListScreen: React.FC = () => {
    const readings = useTypedSelector((state) => state.readingEntries);
    const pool = useTypedSelector((state) => state.selectedPool) as Pool;
    const pickerState = useTypedSelector((state) => state.pickerState);
    const { ds, updateDS } = useDeviceSettings();
    const recipeKey = pool?.recipeKey || RecipeService.defaultFormulaKey;
    const [treatmentStates, setTreatmentStates] = React.useState<TreatmentState[]>([]);
    const [hasSelectedAnyTreatments, setHasSelectedAnyTreatments] = React.useState(false);
    const [notes, setNotes] = React.useState('');
    const { navigate } = useNavigation<StackNavigationProp<PDNavParams>>();
    // I hate this... it's dirty. We should move this into the picker screen maybe?
    const [concentrationTreatmentVar, updateConcentrationTreatment] = React.useState<string | null>(null);
    const recipe = useLoadRecipeHook(recipeKey);
    const targetRangeOverridesForPool = useRealmPoolTargetRangesForPool(pool.objectId);
    const navRoutes = useNavigationState(state => state.routeNames);

    const allScoops = ds.scoops;

    const keyboardAccessoryViewId = 'dedgumThisIsSomeReallyUniqueTextTreatmentListKeyboard';

    // This happens on every render... whatever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if (
            pickerState &&
            pickerState.key === 'chem_concentration' &&
            pickerState.value !== null &&
            concentrationTreatmentVar
        ) {
            const newConcentration = Math.min(Math.max(parseInt(pickerState.value, 10), 1), 100);

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

            dispatch(clearPickerState());
            updateConcentrationTreatment(null);

            if (didChange) {
                const newTreatments = Util.deepCopy(ds.treatments);
                newTreatments.concentrations[concentrationTreatmentVar] = newConcentration;
                // Don't await it, be bold:
                updateDS({ treatments: newTreatments });
            }
        }
    });

    if (!recipe) {
        return <View />;
    }

    const save = async () => {
        const shouldSaveAllTreatments = !hasSelectedAnyTreatments;

        /// setState hooks don't modify the value in the current context -- so to actually turn the treatment entries "on",
        /// we have to do it somewhat manually (yuck, I should clean this up).
        let finalTreatmentStates = Util.deepCopy(treatmentStates);
        if (shouldSaveAllTreatments) {
            finalTreatmentStates = finalTreatmentStates.map(x => ({ ...x, isOn: true }));

            /// This just updates the UI so the user can sort-of see everything being selected (for a fleeting moment, anyways)
            finalTreatmentStates.forEach(x => toggleTreatmentSelected(x.treatment.var));
        }

        const id = Util.generateUUID();
        const ts = Util.generateTimestamp();
        const tes = CalculationService.mapTreatmentStatesToTreatmentEntries(finalTreatmentStates);

        const readingEntries = RealmUtil.createReadingEntriesFromReadingValues(readings, recipe);
        console.log('recipe name: ' + recipe.name);
        const logEntry = LogEntry.make(id, pool.objectId, ts, readingEntries, tes, recipeKey, recipe.name, notes);

        await Database.saveNewLogEntry(logEntry);
        // Save the last-used units:
        const newTreatments = Util.deepCopy(ds.treatments);
        newTreatments.units = TreatmentListHelpers.getUpdatedLastUsedUnits(
            newTreatments.units,
            finalTreatmentStates,
        );
        updateDS({ treatments: newTreatments });
        dispatch(clearReadings());
        const navigateBackScreen = navRoutes.includes('PoolScreen') ? 'PoolScreen' : 'PoolList';
        navigate(navigateBackScreen);
    };

    const onMessage = (event: WebViewMessageEvent) => {
        const tes = CalculationService.getTreatmentEntriesFromWebviewMessage(event, recipe);

        const lastUnits = ds.treatments.units;
        const tss: TreatmentState[] = tes
            .map((te) => {
                const t = TreatmentListHelpers.getTreatmentFromRecipe(te.var, recipe);
                if (t === null) {
                    return null;
                }
                const defaultDecimalPlaces = 1;

                let ounces = te.ounces || 0;
                const baseConcentration = t.concentration || 100;
                const concentrationOverride = TreatmentListHelpers.getConcentrationForTreatment(t.var, ds);

                if (concentrationOverride) {
                    ounces = (ounces * baseConcentration) / concentrationOverride;
                }

                let units: Units = 'ounces';
                let value = ounces;
                const scoop = TreatmentListHelpers.getScoopForTreatment(t.var, allScoops);

                if (scoop) {
                    // If we have a saved scoop, start with that:
                    if (t.type === 'dryChemical') {
                        value = Converter.dry(value, 'ounces', 'scoops', scoop);
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

        setHasSelectedAnyTreatments(true);
        toggleTreatmentSelected(varName);
    };

    const toggleTreatmentSelected = (varName: string) => {
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
            TreatmentListHelpers.getConcentrationForTreatment(varName, ds) || t?.concentration || 100;
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

    const targets = TargetsHelper.resolveRangesForPool(recipe, pool.wallType, targetRangeOverridesForPool);
    const htmlString = CalculationService.getHtmlStringForLocalHermes(recipe, pool, readings, targets);

    const sections: SectionListData<TreatmentState>[] = [
        {
            data: [],
            isHeader: true,
        },
        {
            data: treatmentStates,
            isHeader: false,
        },
    ];

    let completed: TreatmentState[] = [];
    let countedTreatmentStates: TreatmentState[] = [];
    if (recipe) {
        countedTreatmentStates = treatmentStates.filter((ts) => ts.treatment.type !== 'calculation');
        completed = countedTreatmentStates.filter((ts) => ts.isOn);
    }

    return (
        <PDSafeAreaView bgColor="white">
            <ScreenHeader textType="heading" color="purple">Treatments</ScreenHeader>
            <KeyboardAwareSectionList
                style={ styles.sectionList }
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
                renderItem={ ({ item }) => (
                    <TreatmentListItem
                        treatmentState={ item }
                        onTextboxUpdated={ handleTextUpdated }
                        onTextboxFinished={ handleTextFinishedEditing }
                        handleUnitsButtonPressed={ handleUnitsButtonPressed }
                        handleIconPressed={ handleIconPressed }
                        handleTreatmentNameButtonPressed={ handleTreatmentNameButtonPressed }
                        inputAccessoryId={ keyboardAccessoryViewId }
                    />
                ) }
                sections={ sections }
                keyExtractor={ (item) => item.treatment.var }
                contentInsetAdjustmentBehavior="always"
                canCancelContentTouches
                stickySectionHeadersEnabled
                renderSectionHeader={ ({ section }) => {
                    if (section.isHeader) {
                        return <ServiceNonStickyHeader />;
                    } else {
                        return (
                            <ServiceStickyHeaderList
                                completedLength={ completed.length }
                                missingLength={ countedTreatmentStates.length }
                                color="purple"
                            />
                        );
                    }
                } }
                renderSectionFooter={ ({ section }) => {
                    if (section.isHeader) {
                        return <></>;
                    } else {
                        return <TreatmentListFooter text={ notes } updatedText={ setNotes } />;
                    }
                } }
            />
            <WebView containerStyle={ styles.webview } onMessage={ onMessage } source={ { html: htmlString } } androidHardwareAccelerationDisabled />
            <View style={ styles.bottomButtonContainer }>
                <BoringButton containerStyles={ styles.button } onPress={ save } title={ hasSelectedAnyTreatments ? 'Save' : 'Save All' } />
            </View>
            <PlatformSpecific include={ ['ios'] }>
                <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                    <View style={ styles.keyboardAccessoryContainer }>
                        <BoringButton
                            containerStyles={ styles.keyboardAccessoryButton }
                            textStyles={ styles.keyboardAccessoryButtonText }
                            onPress={ () => {
                                Keyboard.dismiss();
                                Haptic.light();
                            } }
                            title="Done Typing"
                        />
                    </View>
                </InputAccessoryView>
            </PlatformSpecific>
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionList: {
        flex: 1,
        backgroundColor: '#B21FF105',
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
