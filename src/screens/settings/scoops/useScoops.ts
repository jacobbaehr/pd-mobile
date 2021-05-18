import { Scoop } from '~/models/Scoop';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';

export const useFetchScoops = () : Scoop[] => {
    const { ds } = useDeviceSettings();

    return ds.scoops;
};
