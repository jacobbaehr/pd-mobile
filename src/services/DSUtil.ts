import { DeviceSettings } from "~/models/DeviceSettings";

export class DS {
    static isSubscriptionValid = (ds: DeviceSettings, now: number): boolean => {
        if (ds.sub_exp === null) {
            return false;
        }
        return ds.sub_exp > now;
    }
}