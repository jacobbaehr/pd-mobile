import { AnyAction } from 'redux';
import { DeviceSettings } from '~/models/DeviceSettings';

export const UPDATE_DEVICE_SETTINGS = 'UPDATE_DEVICE_SETTINGS';

export interface UpdateDeviceSettingsAction extends AnyAction {
    deviceSettings: DeviceSettings;
}

export type UpdateDeviceSettingsActions = UpdateDeviceSettingsAction;

// Update whether or not the user has a valid subscription
export const updateDeviceSettings = (newSettings: DeviceSettings): UpdateDeviceSettingsAction => {
    return {
        type: UPDATE_DEVICE_SETTINGS,
        deviceSettings: newSettings
    };
};