import * as React from 'react';
import { connect } from 'react-redux';
import { Keyboard, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { Pool } from '~/models/Pool';
import { saveNewPool, updatePool } from '~/redux/selectedPool/Actions';
import { dispatch, AppState } from '~/redux/AppState';
import { selectPool } from '~/redux/selectedPool/Actions';
import { Database } from '~/repository/Database';
import { PoolDetails } from '~/screens/editPool/PoolDetails';
import { PDPickerRouteProps } from '../picker/PickerScreen';
import { PickerState } from '~/redux/picker/PickerState';
import { updatePickerState } from '~/redux/picker/Actions';
import { WaterTypeValue, waterTypeOptions } from '~/models/Pool/WaterType';
import { DeviceSettings } from '~/models/DeviceSettings';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { Util } from '~/services/Util';

interface EditPoolScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'EditPool'>;
    selectedPool: Pool | null;
    pickerState: PickerState | null;
    deviceSettings: DeviceSettings;
}

const mapStateToProps = (state: AppState, ownProps: EditPoolScreenProps): EditPoolScreenProps => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool,
        pickerState: state.pickerState,
        deviceSettings: state.deviceSettings
    };
};

export const EditPoolComponent: React.FunctionComponent<EditPoolScreenProps> = (props: EditPoolScreenProps) => {

    const pool = props.selectedPool;
    const originalSelectedPoolName = pool?.name;
    const [name, updateName] = React.useState(pool?.name || '');
    const [type, updateType] = React.useState(pool?.waterType || 'salt_water');
    const [volumeText, updateVolumeText] = React.useState(`${pool?.gallons || ''}`);

    // This happens on every render... whatever.
    React.useEffect(() => {
        const { pickerState } = props;
        if (pickerState && pickerState.key === 'water_type' && pickerState.value !== null) {
            const selectedType = pickerState.value as WaterTypeValue;
            updateType(selectedType);
            dispatch(updatePickerState(null));
        }
    });

    const { navigate, goBack } = useNavigation();

    const handleDeletePoolPressed = async () => {
        if (pool === undefined || pool === null) {
            return;
        }
        Alert.alert(
            "Delete Pool?",
            "This will delete the pool & all of its history. This CANNOT be undone.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "DELETE",
                    onPress: handleDeleteConfirmed,
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    }

    const handleDeleteConfirmed = async () => {
        if (pool === undefined || pool === null) {
            return;
        }
        Database.deletePool(pool);
        dispatch(selectPool(null));
        navigate('PoolList');
    }

    const handleSaveButtonPressed = () => {
        let volume = Number(volumeText);
        // Validate or bail
        if (volume <= 0 || name.length === 0) {
            return;
        }

        // Always save gallons, so convert from liters if necessary
        let gallons = volume;
        if (props.deviceSettings.units === 'metric') {
            gallons = Util.litersToGallons(volume);
        }
        if (pool) {
            dispatch(updatePool(pool, (p) => {
                p.gallons = gallons;
                p.name = name;
                p.waterType = type;
            }));
        }
        else {
            const newPool = new Pool();
            newPool.gallons = gallons;
            newPool.name = name;
            newPool.waterType = type;
            dispatch(saveNewPool(newPool));
        }

        goBack();
    }

    const handlePressedTypeButton = () => {
        Keyboard.dismiss();
        const pickerProps: PDPickerRouteProps = {
            title: 'Water Type',
            subtitle: '',
            items: waterTypeOptions.map((wt) => ({ name: wt.display, value: wt.value })),
            pickerKey: 'water_type',
            prevSelection: type
        };
        navigate('PickerScreen', pickerProps);
    }

    const handlePressedUnitsButton = () => {
        // Switch the units around
        let deviceUnits = props.deviceSettings.units;
        if (deviceUnits === 'metric') {
            deviceUnits = 'us';
        } else {
            deviceUnits = 'metric';
        }

        // Save it & tell everybody to update accordingly
        const newSettings = {
            ...props.deviceSettings,
            units: deviceUnits
        };
        DeviceSettingsService.saveSettings(newSettings);
        dispatch(updateDeviceSettings(newSettings));
    }

    const deleteButtonAction = pool ? handleDeletePoolPressed : null;
    const volumeUnits = (props.deviceSettings.units === 'us') ? 'gallons' : 'liters';

    return (
        <PoolDetails
            originalPoolName={ originalSelectedPoolName ?? '' }
            name={ name }
            volumeText={ volumeText }
            volumeUnits={ volumeUnits }
            type={ type }
            goBack={ goBack }
            updateVolume={ updateVolumeText }
            updateName={ updateName }
            pressedTypeButton={ handlePressedTypeButton }
            pressedUnitsButton={ handlePressedUnitsButton }
            rightButtonAction={ deleteButtonAction }
            handleSavePoolPressed={ handleSaveButtonPressed } />
    );
}

export const EditPoolScreen = connect(mapStateToProps)(EditPoolComponent);