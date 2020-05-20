import { UpdateDeviceSettingsActions, UPDATE_DEVICE_SETTINGS } from './Actions';
import { DeviceSettings } from '~/models/DeviceSettings';
import { DeviceSettingsService } from '~/services/DeviceSettingsService';

/** */
export const deviceSettingsReducer = (previousState: DeviceSettings | null = null, action: UpdateDeviceSettingsActions): DeviceSettings => {
    switch (action.type) {
        case UPDATE_DEVICE_SETTINGS:
            return action.deviceSettings;
        default:
            return previousState || DeviceSettingsService.getDefaultSettings();
    }
};
