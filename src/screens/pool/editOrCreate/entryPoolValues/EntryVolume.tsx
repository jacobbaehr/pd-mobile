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
import { getDisplayForPoolValue, PoolUnit } from '~/models/Pool/PoolUnit';
import { PDStackNavigationProps } from '~/navigator/shared';
import { VolumeUnitsUtil } from '~/services/VolumeUnitsUtil';

import { useNavigation } from '@react-navigation/native';

import { useEntryPool } from '../hooks/useEntryPool';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';

export const EntryVolume = () => {
    const { pool, setPool } = useEntryPool();
    const { ds, updateDS } = useDeviceSettings();
    const [volume, setVolume] = useState(() => {
        return VolumeUnitsUtil.getVolumeByUnit(pool?.gallons ?? 0, 'us', ds.units);
    });
    const [units, setUnits] = useState<PoolUnit>(ds.units);
    const navigation = useNavigation<PDStackNavigationProps>();
    const { estimation, clear } = useVolumeEstimator();

    const keyboardAccessoryViewId = 'keyboardaccessoryidpooleditscreen2';

    const handleOnPressSaveButton = () => {
        let gallons = VolumeUnitsUtil.getUsGallonsByUnit(volume, units);
        setPool({ gallons });
        clear();
        navigation.goBack();
    };

    const handleTextChanged = useCallback((text: string) => {
        setVolume(+text);
    }, []);

    const handleUnitButtonPressed = () => {
        const nextUnit = VolumeUnitsUtil.getNextUnitValue(units);
        setUnits(nextUnit);
        updateDeviceSettingsUnit(nextUnit);
    };

    const updateDeviceSettingsUnit = (newUnits: PoolUnit) => {
        updateDS({ units: newUnits });
    };

    const handleEstimatorButtonPressed = () => {
        navigation.navigate('SelectShape');
    };

    const unitText = getDisplayForPoolValue(units);
    const volumesFixed = estimation ? Number(estimation).toFixed(0) : volume.toFixed(0);

    const hasVolumeChanged = VolumeUnitsUtil.getUsGallonsByUnit(volume, units) !== pool?.gallons || estimation;

    return (
        <>
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
                <PDView style={ { flex: 1 } }>
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
                disabled={ !hasVolumeChanged }
                bgColor={ hasVolumeChanged ? 'pink' : 'greyVeryLight' }
                textColor={ hasVolumeChanged ? 'white' : 'grey' }
                nativeID={ keyboardAccessoryViewId }
                activeOpacity={ hasVolumeChanged ? 0 : 1 }
                hitSlop={ { top: 5, left: 5, bottom: 5, right: 5 } }>
                Save
            </KeyboardButton>
        </>
    );
};

const styles = StyleSheet.create({
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
});
