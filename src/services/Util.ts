import { DeviceSettings } from "~/models/DeviceSettings";

export class Util {
    static getDisplayVolume = (gallons: number, settings: DeviceSettings): string => {
        switch (settings.units) {
            case 'us':
                return `${gallons.toLocaleString(undefined, { maximumFractionDigits: 0 })} Gallons`;
            case 'metric':
                return `${Util.gallonsToLiters(gallons).toLocaleString(undefined, { maximumFractionDigits: 0 })} Liters`;
        }
    }

    static gallonsToLiters = (gallons: number): number => {
        return gallons * 3.78541;
    }

    static litersToGallons = (liters: number): number => {
        return liters / 3.78541;
    }
}
