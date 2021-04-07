import React, { useState } from 'react';
import { InputAccessoryView, StyleSheet } from 'react-native';
import { SVG } from '~/assets/images';
import { Button } from '~/components/buttons/Button';
import { ButtonWithChildren } from '~/components/buttons/ButtonWithChildren';
import BorderInputWithLabel from '~/components/inputs/BorderInputWithLabel';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { DeviceSettings } from '~/models/DeviceSettings';
import { Pool } from '~/models/Pool';
import { getDisplayForPoolValue, PoolUnit } from '~/models/Pool/PoolUnit';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { updatePool } from '~/redux/selectedPool/Actions';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';
import { PlatformSpecific } from '~/components/PlatformSpecific';

export const EditVolume = () => {
    const selectedPool = useTypedSelector((state) => state.selectedPool) as Pool;
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);
    const [volume, setVolume] = useState(selectedPool.gallons);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [units, setUnits] = useState<PoolUnit>(deviceSettings.units);
    const dispatch = useThunkDispatch();
    const navigation = useNavigation<PDStackNavigationProps>();
    console.log('device unit', deviceSettings.units);

    const keyboardAccessoryViewId = 'keyboardaccessoryidpooleditscreen2';

    const handleOnPressSaveButton = () => {
        const existingPool: Pool = Pool.make({
            ...selectedPool,
            gallons: VolumeUnitsUtil.getUsGallonsByUnit(volume, units),
        });

        dispatch(updatePool(existingPool));

        const newSettings: DeviceSettings = {
            ...deviceSettings,
            units,
        };
        dispatch(updateDeviceSettings(newSettings));
        DeviceSettingsService.saveSettings(newSettings);

        navigation.goBack();
    };

    const handleTextChanged = (text: string) => {
        const input = Number(text);
        setVolume(input);
        setButtonDisabled(!input);
    };

    const handleUnitButtonPressed = () => {
        setButtonDisabled(false);
        const nextUnit: PoolUnit = VolumeUnitsUtil.getNextUnitValue(units);
        // Volume must be on Gallons for the conversion
        const value: number = VolumeUnitsUtil.getVolumeByUnit(volume, units, nextUnit);

        setUnits(nextUnit);
        setVolume(value);
    };

    const handleEstimatorButtonPressed = () => {
        navigation.push('PDVolumesNavigator');
    };

    const unitText = getDisplayForPoolValue(units) as string;
    return (
        <PDView>
            <PDView style={ styles.inputContainer }>
                <BorderInputWithLabel
                    value={ volume.toFixed(0) }
                    placeholder="Pool Volume"
                    label="Volume"
                    style={ styles.textInput }
                    onChangeText={ handleTextChanged }
                    autoFocus
                    keyboardType="number-pad"
                    inputAccessoryViewID={ keyboardAccessoryViewId }
                    returnKeyType="done"
                    onSubmitEditing={ handleOnPressSaveButton }
                    enablesReturnKeyAutomatically
                />
                <PDView>
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
                <PDView style={ styles.estimatorButtonContainer }>
                    <SVG.IconEstimator width={ 16 } height={ 16 } fill="#000000" />
                    <PDText type="subHeading"> Use Volume Estimator</PDText>
                </PDView>
            </ButtonWithChildren>
            <PlatformSpecific include={ ['ios'] }>
            <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                <PDView style={ styles.inputAccessoryView }>
                    <PDView
                        bgColor={ 'pink' }
                        opacity={ buttonDisabled ? 0 : 1 }
                        style={ styles.saveButtonContainer }>
                        <Button
                            textStyles={ styles.saveText }
                            textColor={ buttonDisabled ? 'black' : 'white' }
                            title="Save"
                            onPress={ handleOnPressSaveButton }
                            disabled={ buttonDisabled }
                            styles={ styles.saveButton }
                        />
                    </PDView>
                </PDView>
            </InputAccessoryView>
            </PlatformSpecific>
        </PDView>
    );
};

const styles = StyleSheet.create({
    inputAccessoryView: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    textInput: {
        borderColor: '#EDEDED',
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 6,
        width: 165,
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
        paddingLeft: 12,
        color: '#FF0073',
    },
    unit: {
        color: '#737373',
    },
    unitButton: {
        paddingVertical: PDSpacing.xs,
        paddingHorizontal: 60,
        borderRadius: 24,
        borderColor: '#EDEDED',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingHorizontal: 75,
        paddingVertical: PDSpacing.xs,
        backgroundColor: '#EDEDED',
        borderRadius: 27.5,
        alignSelf: 'center',
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
