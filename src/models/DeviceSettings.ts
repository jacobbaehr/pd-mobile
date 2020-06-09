export interface DeviceSettings {
    units: 'metric' | 'us';
    night_mode: 'dark' | 'light' | 'system';
    treatments: {
        concentrations: { [varName: string]: number }
    };
}
