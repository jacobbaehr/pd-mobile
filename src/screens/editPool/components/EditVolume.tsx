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
                />
                <PDView>
                    <PDText type="default" style={ styles.unit }>
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
            <PDText type="default" style={ styles.notSure }>
                not sure?
            </PDText>
            <ButtonWithChildren onPress={ handleEstimatorButtonPressed }>
                <PDView style={ styles.estimatorButtonContainer }>
                    <SVG.IconEstimator width={ 16 } height={ 16 } fill="#000000" />
                    <PDText style={ styles.estimatorButtonText }> Use Volume Estimator</PDText>
                </PDView>
            </ButtonWithChildren>

            <InputAccessoryView nativeID={ keyboardAccessoryViewId }>
                <PDView style={ styles.inputAccessoryView }>
                    <PDView
                        bgColor={ buttonDisabled ? 'greyLight' : 'pink' }
                        opacity={ buttonDisabled ? 0.3 : 1 }
                        style={ styles.saveButtonContainer }>
                        <Button
                            textStyles={ styles.saveText }
                            textColor={ buttonDisabled ? 'black' : 'white' }
                            title="Save"
                            onPress={ handleOnPressSaveButton }
                            disabled={ buttonDisabled }
                        />
                    </PDView>
                </PDView>
            </InputAccessoryView>
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
        height: 40,
        width: 159,
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
        paddingLeft: 12,
        color: '#FF0073',
    },
    unit: {
        color: '#737373',
        fontWeight: '700',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    unitButton: {
        height: 40,
        width: 159,
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
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: PDSpacing.sm,
        marginBottom: PDSpacing.xs,
        textTransform: 'uppercase',
    },
    estimatorButtonContainer: {
        height: 40,
        width: 327,
        backgroundColor: '#EDEDED',
        borderRadius: 27.5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    estimatorButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700',
    },
    saveButtonContainer: {
        borderRadius: 27.5,
        height: 40,
        width: '90%',
        marginBottom: 24,
        justifyContent: 'center',
        opacity: 0.3,
        alignSelf: 'center',
    },
    saveText: {
        // color: '#000000',
        fontWeight: '700',
        fontSize: 18,

        alignSelf: 'center',
    },
});
