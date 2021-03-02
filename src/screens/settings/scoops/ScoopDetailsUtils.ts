import { DeviceSettings } from '~/models/DeviceSettings';
import { Treatment } from '~/models/recipe/Treatment';
import { Scoop } from '~/models/Scoop';
import { Util } from '~/services/Util';

export const getTreatmentWithVar = (treatments: Treatment[], varName: string): Treatment | null => {
    const filteredList = treatments.filter((t) => t.var === varName);
    if (filteredList.length) {
        return filteredList[0];
    } else {
        return null;
    }
};

export const mapScoopDeviceSettings = (deviceSetting: DeviceSettings, scoop: Scoop, type: 'edit' | 'create') => {
    const newDeviceSetting = Util.deepCopy(deviceSetting);
    if (type === 'create') {
        newDeviceSetting.scoops.push(scoop);
    } else {
        const index = newDeviceSetting.scoops.findIndex((sc) => sc.var === scoop.var);
        if (index >= 0) {
            newDeviceSetting.scoops[index] = scoop;
        }
    }
    return newDeviceSetting;
};
