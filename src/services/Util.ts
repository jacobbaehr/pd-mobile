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

    static deepCopy = <T>(target: T): T => {
        if (target === null) { return target; }

        if (target instanceof Date) {
            return new Date(target.getTime()) as any;
        }

        if (target instanceof Array) {
            const cp = [] as any[];
            (target as any[]).forEach((v) => { cp.push(v); });
            return cp.map((n: any) => Util.deepCopy<any>(n)) as any;
        }

        if (typeof target === 'object' && target !== {}) {
            const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
            Object.keys(cp).forEach(k => {
                cp[k] = Util.deepCopy<any>(cp[k]);
            });
            return cp as T;
        }

        return target;
    };

    static notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
        return value !== null && value !== undefined;
    }

    static removeSuffixIfPresent = (suffix: string, original: string): string => {
        if (original.length < suffix.length) {
            return original;
        }
        const candidate = original.substr(original.length - (suffix.length))
        if (candidate == suffix) {
            return original.substr(0, original.length - suffix.length);
        }
        return original;
    }
}