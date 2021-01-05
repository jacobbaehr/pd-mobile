import { DeviceSettings } from "~/models/DeviceSettings";
import base64 from 'react-native-base64';

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

    static removePrefixIfPresent = (prefix: string, original: string): string => {
        if (original.startsWith(prefix)) {
            return original.slice(prefix.length);
        }
        return original;
    }

    static getDisplayNameForTreatment = (t: { name: string, concentration?: number }): string => {
        if (t.concentration && t.concentration < 100) {
            return `${t.concentration.toFixed(0)}% ${t.name}`;
        } else {
            return t.name;
        }
    }

    static stringToBase64 = (input: string) => {
        const utf8 = unescape(encodeURIComponent(input));
        return base64.encode(utf8);
    }

    /// NOTE: this function is untested, be careful!
    static stringFromBase64UntestedArgh = (input: string) => {
        const unicode = base64.decode(input);
        return decodeURIComponent(escape(unicode));
    }
}
