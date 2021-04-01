import * as React from 'react';
import { Alert, Keyboard } from 'react-native';
import { DeviceSettings } from '~/models/DeviceSettings';
import { Pool } from '~/models/Pool';
import { wallTypeOptions, WallTypeValue } from '~/models/Pool/WallType';
import { waterTypeOptions, WaterTypeValue } from '~/models/Pool/WaterType';
import { dispatch, useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { clearPickerState } from '~/redux/picker/Actions';
import { clearPool, saveNewPool, updatePool } from '~/redux/selectedPool/Actions';
import { Database } from '~/repository/Database';
import { PoolDetails } from '~/screens/editPool/PoolDetails';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { Haptic } from '~/services/HapticService';
import { Util } from '~/services/Util';

import { useNavigation } from '@react-navigation/native';

import { PDPickerRouteProps } from '../picker/PickerScreen';

export const EditPoolScreen: React.FC = () => {
    const pool = useTypedSelector((state) => state.selectedPool);
    const deviceSettings = useTypedSelector((state) => state.deviceSettings) as DeviceSettings;
    const pickerState = useTypedSelector((state) => state.pickerState);
    const originalSelectedPoolName = pool?.name;
    const [name, updateName] = React.useState(pool?.name || '');
    const [waterType, updateWaterType] = React.useState(pool?.waterType || 'salt_water');
    const [wallType, updateWallType] = React.useState(pool?.wallType || 'vinyl');
    const [volumeText, updateVolumeText] = React.useState(getInitialVolumeText(deviceSettings.units, pool?.gallons));
    const dispatchThunk = useThunkDispatch();

    // This happens on every render... whatever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if (pickerState && pickerState.key === 'water_type' && pickerState.value !== null) {
            const selectedType = pickerState.value as WaterTypeValue;
            updateWaterType(selectedType);
            dispatch(clearPickerState());
        } else if (pickerState && pickerState.key === 'wall_type' && pickerState.value !== null) {
            const selectedType = pickerState.value as WallTypeValue;
            updateWallType(selectedType);
            dispatch(clearPickerState());
        }
    });

    const { navigate, goBack } = useNavigation();

    const handleDeletePoolPressed = async () => {
        if (pool === undefined || pool === null) {
            return;
        }
        Alert.alert(
            'Delete Pool?',
            'This will delete the pool & all of its history. This CANNOT be undone.',
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
        if (pool === undefined || pool === null) {
            return;
        }
        Database.deletePool(pool);
        dispatch(clearPool());
        navigate('PoolList');
    };

    const handleSaveButtonPressed = () => {
        Haptic.light();
        let volume = +volumeText;
        // Validate or bail
        if (volume <= 0 || name.length === 0) {
            return;
        }

        // Always save gallons, so convert from liters if necessary
        let gallons = volume;
        if (deviceSettings.units === 'metric') {
            gallons = Util.litersToGallons(volume);
        }
        if (pool) {
            dispatchThunk(
                updatePool({
                    objectId: pool.objectId,
                    name,
                    wallType,
                    waterType,
                    gallons,
                }),
            );
        } else {
            const newPool = Pool.make({ name, gallons, waterType, wallType });
            dispatchThunk(saveNewPool(newPool));
        }

        goBack();
    };

    const handlePressedWaterTypeButton = () => {
        Keyboard.dismiss();
        const pickerProps: PDPickerRouteProps = {
            title: 'Water Type',
            subtitle: '',
            items: waterTypeOptions.map((wt) => ({ name: wt.display, value: wt.value })),
            pickerKey: 'water_type',
            prevSelection: waterType,
        };
        navigate('PickerScreen', pickerProps);
    };

    const handlePressedWallTypeButton = () => {
        Keyboard.dismiss();
        const pickerProps: PDPickerRouteProps = {
            title: 'Wall Type',
            subtitle: '',
            items: wallTypeOptions.map((wt) => ({ name: wt.display, value: wt.value })),
            pickerKey: 'wall_type',
            prevSelection: wallType,
        };
        navigate('PickerScreen', pickerProps);
    };

    const handlePressedUnitsButton = () => {
        // Switch the units around
        let deviceUnits = deviceSettings.units;
        if (deviceUnits === 'metric') {
            deviceUnits = 'us';
        } else {
            deviceUnits = 'metric';
        }

        // Save it & tell everybody to update accordingly
        const newSettings = {
            ...deviceSettings,
            units: deviceUnits,
        };
        DeviceSettingsService.saveSettings(newSettings);
        dispatch(updateDeviceSettings(newSettings));
    };

    const deleteButtonAction = pool ? handleDeletePoolPressed : null;

    const volumeUnits = deviceSettings.units === 'us' ? 'gallons' : 'liters';

    return (
        <PoolDetails
            originalPoolName={ originalSelectedPoolName ?? '' }
            name={ name }
            volumeText={ volumeText }
            volumeUnits={ volumeUnits }
            waterType={ waterType }
            wallType={ wallType }
            goBack={ goBack }
            updateVolume={ updateVolumeText }
            updateName={ updateName }
            pressedWaterTypeButton={ handlePressedWaterTypeButton }
            pressedWallTypeButton={ handlePressedWallTypeButton }
            pressedUnitsButton={ handlePressedUnitsButton }
            rightButtonAction={ deleteButtonAction }
            handleSavePoolPressed={ handleSaveButtonPressed }
        />
    );
};

const getInitialVolumeText = (units: string, pool: number | undefined) => {
    if (units === 'us') {
        return `${pool?.toFixed(0) || ''}`;
    } else {
        if (pool !== undefined) {
            const liters = Util.gallonsToLiters(pool).toFixed(0);
            return `${liters}`;
        } else {
            return '';
        }
    }
};
