
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SVG } from '~/assets/images';
import { Button } from '~/components/buttons/Button';
import { ButtonWithChildren } from '~/components/buttons/ButtonWithChildren';
import { KeyboardButton } from '~/components/buttons/KeyboardButton';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { useVolumeEstimator } from '~/screens/pool/editOrCreate/hooks/useVolumeEstimator';
import { DeviceSettings } from '~/models/DeviceSettings';
import { getDisplayForPoolValue, PoolUnit } from '~/models/Pool/PoolUnit';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';
import { useEntryPool } from '../hooks/useEntryPool';

export const EntryVolume = () => {
    const { pool, setPool } = useEntryPool();
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);
    const [volume, setVolume] = useState(() => {
        return VolumeUnitsUtil.getVolumeByUnit(pool?.gallons ?? 0, 'us', deviceSettings.units);
    });
    const [units, setUnits] = useState<PoolUnit>(deviceSettings.units);
    const dispatch = useThunkDispatch();
    const navigation = useNavigation<PDStackNavigationProps>();
    const { estimation, clear } = useVolumeEstimator();
    const keyboardAccessoryViewId = 'keyboardaccessoryidpooleditscreen2';

    const handleOnPressSaveButton = () => {
        let gallons = VolumeUnitsUtil.getUsGallonsByUnit(volume, units);
        setPool({ gallons });

        clear();
        navigation.goBack();
    };

    const handleTextChanged = (text: string) => {
        const input = Number(text);
        setVolume(input);
    };

    const handleUnitButtonPressed = () => {
        const nextUnit = VolumeUnitsUtil.getNextUnitValue(units);
        setUnits(nextUnit);
        updateDeviceSettingsUnit(nextUnit);
    };

    const updateDeviceSettingsUnit = (newUnits: PoolUnit) => {
        const newSettings: DeviceSettings = {
            ...deviceSettings,
            units: newUnits,
        };
        dispatch(updateDeviceSettings(newSettings));
        DeviceSettingsService.saveSettings(newSettings);
    };

    const handleEstimatorButtonPressed = () => {
        navigation.navigate('SelectShape');
    };

    const unitText = getDisplayForPoolValue(units) as string;
    const volumesFixed = estimation ?  Number(estimation).toFixed(0) : volume.toFixed(0);

    const getButtonDisableState = useCallback(
        () => {
            return  (VolumeUnitsUtil.getUsGallonsByUnit(volume, units) !== pool?.gallons) || estimation;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [volume, units, estimation]);

    return (
        <PDView>
            <PDView style={ styles.inputContainer }>
                <BorderInputWithLabel
                    value={ volumesFixed }
                    placeholder="Pool Volume"
                    label="Volume"
                    style={ styles.textInput }
                    containerStyles={ { flex: 1 } }
                    autoFocus
                    onChangeText={ handleTextChanged }
                    keyboardType="number-pad"
                    inputAccessoryViewID={ keyboardAccessoryViewId }
                    returnKeyType="done"
                    onSubmitEditing={ handleOnPressSaveButton }
                    enablesReturnKeyAutomatically
                />
                <PDView style={ { flex:1 } }>
                    <PDText type="bodyGreyBold" style={ styles.unit }>
                        unit
                    </PDText>
                    <Button
                        styles={ styles.unitButton }
                        textStyles={ styles.unitButtonText }
                        textColor="pink"
                        title={ unitText }
                        onPress={ handleUnitButtonPressed }
                    />
                </PDView>
            </PDView>
            <PDText type="bodyGreyBold" style={ styles.notSure }>
                not sure?
            </PDText>
            <ButtonWithChildren onPress={ handleEstimatorButtonPressed }>
                <PDView style={ styles.estimatorButtonContainer } bgColor="greyLight">
                    <SVG.IconEstimator width={ 16 } height={ 16 } fill="#000000" />
                    <PDText type="subHeading"> Use Volume Estimator</PDText>
                </PDView>
            </ButtonWithChildren>
            <KeyboardButton
                onPress={ handleOnPressSaveButton }
                disabled={ !getButtonDisableState() }
                bgColor={ getButtonDisableState() ? 'pink' : 'greyVeryLight' }
                textColor={ getButtonDisableState() ? 'white' : 'grey' }
                nativeID={ keyboardAccessoryViewId }
                activeOpacity={ getButtonDisableState() ? 0 : 1 }
                hitSlop={ { top: 5, left: 5, bottom: 5, right: 5 } }>
                Save
            </KeyboardButton>
        </PDView>
    );
};

const styles = StyleSheet.create({
    inputAccessoryView: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        flex: 1,
        borderColor: '#EDEDED',
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 6,
        marginRight: 12,
        minWidth: 100,
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
        paddingHorizontal: 12,
        color: '#FF0073',
    },
    unit: {
        color: '#737373',
    },
    unitButton: {
        paddingVertical: PDSpacing.xs,
        paddingHorizontal: 20,
        borderRadius: 24,
        borderColor: '#EDEDED',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
    },
    unitButtonText: {
        fontWeight: '600',
        fontSize: 16,
    },
    notSure: {
        color: '#737373',
        marginTop: PDSpacing.sm,
        marginBottom: PDSpacing.xs,
    },
    estimatorButtonContainer: {
        paddingVertical: PDSpacing.xs,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    saveButtonContainer: {
        borderRadius: 27.5,
        marginBottom: 24,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    saveButton: {
        borderRadius: 27.5,
        paddingVertical: PDSpacing.xs,
        paddingHorizontal: 155,
    },
    saveText: {
        fontWeight: '700',
        fontSize: 18,
        alignSelf: 'center',
    },
});
