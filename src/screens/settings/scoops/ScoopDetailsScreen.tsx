import * as React from 'react';
import { StyleSheet, SafeAreaView, View, Keyboard, TextInput, InputAccessoryView, Alert } from 'react-native';

import { PDText } from '~/components/PDText';
import { StackNavigationProp } from '@react-navigation/stack';
import { PDNavStackParamList } from '~/navigator/Navigators';
import { RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { dispatch, AppState } from '~/redux/AppState';
import { updatePickerState } from '~/redux/picker/Actions';
import { PickerState } from '~/redux/picker/PickerState';
import { Haptic } from '~/services/HapticService';
import { BoringButton } from '~/components/buttons/BoringButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Scoop } from '~/models/Scoop';
import { ChoosyButton } from '~/components/buttons/ChoosyButton';
import { Treatment, TreatmentType } from '~/models/recipe/Treatment';
import { ScoopService } from '~/services/ScoopService';
import { PDPickerRouteProps } from '~/screens/picker/PickerScreen';
import { connect } from 'react-redux';
import { Util } from '~/services/Util';
import { CycleButton } from '~/components/buttons/CycleButton';
import { Converter } from '~/services/TreatmentUnitsService';
import { Units, DryChemicalUnits, WetChemicalUnits } from '~/models/TreatmentUnits';
import { CloseButton } from '~/components/buttons/CloseButton';
import { DeviceSettings } from '~/models/DeviceSettings';
import { PlatformSpecific } from '~/components/PlatformSpecific';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import pluralize from 'pluralize';

export interface ScoopDetailsRouteProps {
    prevScoop: Scoop | null;
}

interface ScoopDetailsScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'ScoopDetails'>;
    route: RouteProp<PDNavStackParamList, 'ScoopDetails'>;
    pickerState: PickerState | null;
    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState, ownProps: ScoopDetailsScreenProps): ScoopDetailsScreenProps => {
    return {
        navigation: ownProps.navigation,
        route: ownProps.route,
        pickerState: state.pickerState,
        deviceSettings: state.deviceSettings,
    };
};

const ScoopDetailsScreenComponent: React.FunctionComponent<ScoopDetailsScreenProps> = (
    props: ScoopDetailsScreenProps,
) => {
    const { prevScoop } = props.route.params;

    const { goBack, navigate } = useNavigation();
    const [treatments, setTreatments] = React.useState<Treatment[]>([]);
    const [textValue, setTextValue] = React.useState(prevScoop?.displayValue || '1');
    const [treatment, setTreatment] = React.useState<Treatment | null>(null);
    const [isSelectingInitialTreatment, setIsSelectingInitialTreatment] = React.useState(false);
    const type = treatment?.type || 'dryChemical';

    const [units, setUnits] = React.useState<Units>(getUnits(type, prevScoop?.displayUnits));
    const headerTitle = prevScoop ? 'Edit Scoop' : 'Add Scoop';

    const keyboardAccessoryViewId = 'dedgumThisIsSomeReallyUniqueTextScoopDetailsKeyboard';

    // Complex thing to load all the treatments async:
    React.useEffect(() => {
        const loadAllTreatments = async () => {
            let allTreatments = await ScoopService.getAllTreatments();

            // Each treatment can only have a single scoop... for now:
            allTreatments = allTreatments.filter((t) => {
                return (
                    props.deviceSettings.scoops.findIndex((s) => s.var === t.var) < 0 ||
                    (prevScoop && prevScoop.var === t.var)
                );
            });
            setTreatments(allTreatments);

            if (prevScoop) {
                const listContainingOnlyActiveTreatment = allTreatments.filter((t) => t.var === prevScoop.var);
                if (listContainingOnlyActiveTreatment.length > 0) {
                    setTreatment(listContainingOnlyActiveTreatment[0]);
                }
            } else {
                // Pass the param directly to circumvent the weird state / refresh logic of hooks
                showChemPicker(allTreatments);
                setIsSelectingInitialTreatment(true);
            }
        };
        loadAllTreatments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle selection of a treatment
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        const { pickerState } = props;
        if (pickerState && pickerState.key === 'scoop_chem' && pickerState.value !== null) {
            setIsSelectingInitialTreatment(false);
            const treatmentVar = pickerState.value;
            const newTreatment = getTreatmentWithVar(treatmentVar);
            if (!newTreatment) {
                dispatch(updatePickerState(null));
                return;
            }
            setTreatment(getTreatmentWithVar(treatmentVar));
            // We don't _need_ to pass prevScoop stuff here, but heck, why not?
            setUnits(getUnits(newTreatment.type, prevScoop?.displayUnits));
            dispatch(updatePickerState(null));
        }
    });

    useFocusEffect(() => {
        console.log('booooooo');
        if (props.pickerState && props.pickerState.key === 'nothing' && isSelectingInitialTreatment) {
            // Hacky, awful special-case to handle the user pressing the "+" button on the settings screen
            // and immediately pressing the x button on chem-selection. In that case, we just dismiss this
            // screen as well. TODO: handle this somewhere else.
            goBack();
        }
    });

    const handleClosePressed = () => {
        Haptic.medium();
        goBack();
    };

    const showChemPicker = (treatmentList: Treatment[]) => {
        Keyboard.dismiss();
        const pickerProps: PDPickerRouteProps = {
            title: headerTitle,
            subtitle: 'Select Chemical',
            items: treatmentList.map((t) => ({
                name: Util.getDisplayNameForTreatment(t),
                value: t.var,
            })),
            pickerKey: 'scoop_chem',
            prevSelection: treatment?.var || prevScoop?.var,
        };
        navigate('PickerScreen', pickerProps);
    };

    const getTreatmentWithVar = (varName: string): Treatment | null => {
        const filteredList = treatments.filter((t) => t.var === varName);
        if (filteredList.length) {
            return filteredList[0];
        } else {
            return null;
        }
    };

    // const handleDeletePressed = (value: string) => {
    //     const pickerState: PickerState = {
    //         key: pickerKey,
    //         value
    //     };
    //     dispatch(updatePickerState(pickerState));
    //     goBack();
    // };

    const handleTextboxUpdated = (newValue: string) => {
        console.log('booooooga');
        setTextValue(newValue);
    };

    // TODO: John: never used
    // const handleTextboxDismissed = (newValue: string) => {
    //     // Range enforcer:
    //     let finalValue = newValue ? parseInt(newValue) : 1;
    //     finalValue = Math.max(Math.min(finalValue, 100), 1);

    //     setTextValue(finalValue.toFixed(0));
    // };

    const handleSavePressed = async () => {
        Keyboard.dismiss();
        // Early exit, just in-case something wonky happened:
        if (!treatment) {
            return;
        }

        // We're going to modify this copy:
        const newDeviceSettings = Util.deepCopy(props.deviceSettings);

        let ounces = 0;
        if (type === 'dryChemical') {
            ounces = Converter.dry(+textValue, units as DryChemicalUnits, 'ounces', null);
        } else if (type === 'liquidChemical') {
            ounces = Converter.wet(+textValue, units as WetChemicalUnits, 'ounces', null);
        }
        const newScoop: Scoop = {
            var: treatment.var,
            type: treatment.type,
            displayUnits: units,
            displayValue: textValue,
            chemName: treatment.name,
            ounces,
            guid: Math.random().toString(36).slice(2),
        };

        if (prevScoop) {
            const index = newDeviceSettings.scoops.findIndex((s) => s.var === prevScoop.var);
            if (index >= 0) {
                newDeviceSettings.scoops[index] = newScoop;
            }
        } else {
            newDeviceSettings.scoops.push(newScoop);
        }
        console.log('Scoop: ' + JSON.stringify(newScoop));
        await DeviceSettingsService.saveSettings(newDeviceSettings);
        dispatch(updateDeviceSettings(newDeviceSettings));
        goBack();
    };

    const handleUnitsPressed = () => {
        let newUnits = units;
        if (type === 'dryChemical') {
            newUnits = Converter.nextDry(units as DryChemicalUnits, null);
        } else {
            newUnits = Converter.nextWet(units as WetChemicalUnits, null);
        }
        setUnits(newUnits);
    };

    let chemButtonTitle = 'choose';
    if (treatment) {
        chemButtonTitle = Util.getDisplayNameForTreatment(treatment);
    } else if (prevScoop) {
        chemButtonTitle = prevScoop.chemName;
    }

    const handleDeletePressed = () => {
        Alert.alert(
            'Delete scoop?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'DELETE',
                    onPress: handleDeleteConfirmed,
                    style: 'destructive',
                },
            ],
            { cancelable: true },
        );
    };

    const handleDeleteConfirmed = async () => {
        // We're going to modify this copy:
        const newDeviceSettings = Util.deepCopy(props.deviceSettings);

        newDeviceSettings.scoops = newDeviceSettings.scoops.filter((s) => s.var !== treatment?.var);

        await DeviceSettingsService.saveSettings(newDeviceSettings);
        dispatch(updateDeviceSettings(newDeviceSettings));
        goBack();
    };

    const getDeleteButtonOrNull = () => {
        if (!prevScoop) {
            return null;
        }

        return <BoringButton containerStyles={styles.deleteButton} onPress={handleDeletePressed} title="Delete" />;
    };

    return (
        <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <PDText style={styles.title}>{headerTitle}</PDText>
                </View>
                <CloseButton onPress={handleClosePressed} containerStyle={styles.closeButton} />
            </View>
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#F4F7FF' }}>
                <PDText style={styles.sectionTitle}>Chemical</PDText>
                <ChoosyButton
                    title={chemButtonTitle}
                    onPress={() => showChemPicker(treatments)}
                    styles={styles.chemButton}
                    textStyles={styles.chemButtonText}
                />
                <PDText style={styles.sectionTitle}>Size</PDText>
                <View style={styles.bubbleContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleTextboxUpdated}
                        keyboardType={'decimal-pad'}
                        inputAccessoryViewID={keyboardAccessoryViewId}
                        clearTextOnFocus={true}
                        value={textValue}
                    />
                    <CycleButton
                        title={pluralize(units, +(textValue || '0'))}
                        onPress={handleUnitsPressed}
                        styles={styles.unitsButton}
                        textStyles={styles.unitsText}
                    />
                </View>
            </KeyboardAwareScrollView>
            <View style={{ backgroundColor: 'white' }}>
                <BoringButton containerStyles={styles.saveButton} onPress={handleSavePressed} title="Save" />
                {getDeleteButtonOrNull()}
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

export const ScoopDetailsScreen = connect(mapStateToProps)(ScoopDetailsScreenComponent);

const getUnits = (type: TreatmentType, s?: string): Units => {
    if (type === 'dryChemical') {
        return Converter.dryFromString(s);
    } else {
        // <Ricky Bobby voice> If you ain't dry, you're wet.
        return Converter.wetFromString(s);
    }
};

const styles = StyleSheet.create({
    header: {
        marginTop: 24,
        paddingBottom: 12,
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 2,
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    closeButton: {
        marginLeft: 'auto',
        marginRight: 16,
    },
    title: {
        marginLeft: 12,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    titleBottom: {
        color: '#1E6BFF',
        marginBottom: 12,
    },
    saveButton: {
        alignSelf: 'stretch',
        backgroundColor: '#1E6BFF',
        margin: 12,
        marginBottom: 24,
    },
    deleteButton: {
        alignSelf: 'stretch',
        backgroundColor: '#FF4C4C',
        margin: 12,
        marginBottom: 24,
        marginTop: -6,
    },
    textInput: {
        minWidth: 60,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderColor: '#F8F8F8',
        borderRadius: 6,
        color: '#1E6BFF',
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 2,
    },
    sectionTitle: {
        marginTop: 12,
        marginLeft: 16,
        fontSize: 28,
        fontWeight: '700',
        color: 'black',
    },
    chemButton: {
        marginBottom: 12,
        alignSelf: 'flex-start',
        marginTop: 5,
        backgroundColor: 'white',
        marginLeft: 24,
    },
    chemButtonText: {
        fontSize: 20,
    },
    bubbleContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        borderColor: '#F0F0F0',
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 24,
        marginHorizontal: 24,
        display: 'flex',
        flexDirection: 'row',
    },
    unitsButton: {
        marginLeft: 9,
        marginRight: 'auto',
    },
    unitsText: {
        fontSize: 22,
        fontWeight: '600',
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
