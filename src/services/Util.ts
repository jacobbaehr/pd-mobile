import { Pool } from "~/models/Pool";
import { DeviceSettings } from "~/models/DeviceSettings";

export class Util {
    static getDisplayVolume = (pool: Pool, settings: DeviceSettings): string => {
        switch (settings.units) {
            case 'us':
                return `${pool.gallons} Gallons`;
            case 'metric':
                return `${Util.gallonsToLiters(pool.gallons).toFixed(0)} Liters`;
        }
    }

    static gallonsToLiters = (gallons: number): number => {
        return gallons * 3.78541;
    }

    static litersToGallons = (liters: number): number => {
        return liters / 3.78541;
    }
}
