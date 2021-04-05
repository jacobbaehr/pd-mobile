import * as React from 'react';
import { Alert, Keyboard } from 'react-native';
import { DeviceSettings } from '~/models/DeviceSettings';
import { Pool } from '~/models/Pool';
import { PoolUnit, PoolUnitOptions } from '~/models/Pool/PoolUnit';
import { wallTypeOptions, WallTypeValue } from '~/models/Pool/WallType';
import { waterTypeOptions, WaterTypeValue } from '~/models/Pool/WaterType';
import { dispatch, useThunkDispatch, useTypedSelector } from '~/redux/AppState';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { clearPickerState } from '~/redux/picker/Actions';
import { clearPool, saveNewPool, updatePool } from '~/redux/selectedPool/Actions';
import { Database } from '~/repository/Database';
import { PoolDetails } from '~/screens/editPool/PoolDetails';
import { ConversionUtil } from '~/services/ConversionsUtil';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { Haptic } from '~/services/HapticService';

import { useNavigation } from '@react-navigation/native';

import { PDPickerRouteProps } from '../picker/PickerScreen';

const getInitialVolumeText = (units: PoolUnit, gallons: number) => {
    if (units === 'us') {
        return gallons?.toFixed(0);
    } else if (units === 'imperial') {
        return ConversionUtil.usGallonsToImpGallon(gallons).toFixed(0);
    } else {
        return ConversionUtil.usGallonsToLiters(gallons).toFixed(0);
    }
};

export const CreatePoolScreen: React.FC = () => {
    const pool = useTypedSelector((state) => state.selectedPool);
    const deviceSettings = useTypedSelector((state) => state.deviceSettings);
    const pickerState = useTypedSelector((state) => state.pickerState);
    const originalSelectedPoolName = pool?.name;
    const [name, updateName] = React.useState(pool?.name || '');
    const [waterType, updateWaterType] = React.useState(pool?.waterType || 'salt_water');
    const [wallType, updateWallType] = React.useState(pool?.wallType || 'vinyl');
    const [unit, setUnit] = React.useState<PoolUnit>(deviceSettings.units);
    const [volumeText, updateVolumeText] = React.useState(
        getInitialVolumeText(deviceSettings.units, pool?.gallons ?? 0),
    );
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
        } else if (pickerState && pickerState.key === 'unit' && pickerState.value !== null) {
            const selectedType = pickerState.value as PoolUnit;
            setUnit(selectedType);
            updateDeviceSettingsUnits(selectedType);
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

    const getUSGallonsFromVolumeText = (): number => {
        // Always save gallons, so convert from liters if necessary
        let volume = +volumeText;
        let gallons = volume;
        if (unit === 'metric') {
            gallons = ConversionUtil.litersToUsGallons(volume);
        } else if (unit === 'imperial') {
            gallons = ConversionUtil.impGallonsToUsGallon(volume);
        }
        return gallons;
    };

    const handleSaveButtonPressed = () => {
        Haptic.light();
        let volume = +volumeText;
        // Validate or bail
        if (volume <= 0 || name.length === 0) {
            return;
        }

        // Always save gallons, so convert from liters if necessary
        const gallons = getUSGallonsFromVolumeText();

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

    const updateDeviceSettingsUnits = (selectedUnit: PoolUnit) => {
        const newSettings: DeviceSettings = {
            ...deviceSettings,
            units: selectedUnit,
        };
        dispatch(updateDeviceSettings(newSettings));
        DeviceSettingsService.saveSettings(newSettings);
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
        const pickerProps: PDPickerRouteProps = {
            title: 'Change Units',
            subtitle: '',
            items: PoolUnitOptions.map((pu) => ({ name: pu.display, value: pu.value })),
            pickerKey: 'unit',
            prevSelection: unit,
        };
        navigate('PickerScreen', pickerProps);
    };

    const deleteButtonAction = pool ? handleDeletePoolPressed : null;

    return (
        <PoolDetails
            originalPoolName={ originalSelectedPoolName ?? '' }
            name={ name }
            volumeText={ volumeText }
            poolUnit={ unit }
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
