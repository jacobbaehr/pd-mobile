import AsyncStorage from "@react-native-community/async-storage";
import { DeviceSettings } from "~/models/DeviceSettings";

const DEVICE_SETTINGS_KEY = 'pd_device_settings_0';

export class DeviceSettingsService {

    static getDefaultSettings = (): DeviceSettings => {
        return {
            units: 'us',
            night_mode: 'system'
        };
    }

    static getSettings = async (): Promise<DeviceSettings> => {
        const asString = await AsyncStorage.getItem(DEVICE_SETTINGS_KEY);
        if (!asString) {
            return DeviceSettingsService.getDefaultSettings();
        }
        const ds = JSON.parse(asString) as DeviceSettings;
        return ds;
    }

    static saveSettings = async (settings: DeviceSettings): Promise<void> => {
        const asString = JSON.stringify(settings);
        await AsyncStorage.setItem(DEVICE_SETTINGS_KEY, asString);
    }
}