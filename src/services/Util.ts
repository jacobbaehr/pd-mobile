import base64 from 'react-native-base64';
import { DeviceSettings } from '~/models/DeviceSettings';

export class Util {
    static getDisplayVolume = (gallons: number, settings: DeviceSettings): string => {
        switch (settings.units) {
            case 'us':
                return `${Util.abbreviate(gallons)} Gallons`;
            case 'metric':
                const castingToLiter = Util.gallonsToLiters(gallons);
                return `${Util.abbreviate(castingToLiter)} Liters`;
        }
    };

    static gallonsToLiters = (gallons: number): number => {
        return gallons * 3.78541;
    };

    static litersToGallons = (liters: number): number => {
        return liters / 3.78541;
    };

    static deepCopy = <T>(target: T): T => {
        if (target === null) {
            return target;
        }

        if (target instanceof Date) {
            return new Date(target.getTime()) as any;
        }

        if (target instanceof Array) {
            const cp = [] as any[];
            (target as any[]).forEach((v) => {
                cp.push(v);
            });
            return cp.map((n: any) => Util.deepCopy<any>(n)) as any;
        }

        if (typeof target === 'object' && target !== {}) {
            const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
            Object.keys(cp).forEach((k) => {
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
        const candidate = original.substr(original.length - suffix.length);
        if (candidate === suffix) {
            return original.substr(0, original.length - suffix.length);
        }
        return original;
    };

    static removePrefixIfPresent = (prefix: string, original: string): string => {
        if (original.startsWith(prefix)) {
            return original.slice(prefix.length);
        }
        return original;
    };

    static getDisplayNameForTreatment = (t: { name: string; concentration?: number }): string => {
        if (t.concentration && t.concentration < 100) {
            return `${t.concentration.toFixed(0)}% ${t.name}`;
        } else {
            return t.name;
        }
    };

    static stringToBase64 = (input: string) => {
        const utf8 = unescape(encodeURIComponent(input));
        return base64.encode(utf8);
    };

    /// NOTE: this function is untested, be careful!
    static stringFromBase64UntestedArgh = (input: string) => {
        const unicode = base64.decode(input);
        return decodeURIComponent(escape(unicode));
    };

    static generateUUID = () => {
        return Math.random().toString(36).slice(2);
    };

    static firstOrNull<T>(list: T[]): T | null {
        if (list.length > 0) {
            return list[0];
        }
        return null;
    }

    /**
     *
     * The main reason for this function is about to integrate the Realms Objects or Collections
     * and redux, not update the store unless it is a POJO.
     *
     */
    static toPojo = <T>(fields: string[], rawEntity: T): T => {
        const parserEntity: T = {} as T;
        fields.forEach((field) => (parserEntity[field] = rawEntity[field]));
        return parserEntity;
    };

    static toArrayPojo = <T>(entityProps: string[], realmObjects: Realm.Collection<T>): T[] => {
        const parseData: T[] = [];

        realmObjects.forEach((ro) => {
            const poolPojo = Util.toPojo<T>(entityProps, ro);
            parseData.push(poolPojo);
        });

        return parseData;
    };

    static abbreviate = (volume: number): string => {
        if (volume < 1000) {
            return volume.toFixed(0);
        }
        return `${(volume / 1000).toFixed(0)}K`;
    };

    static generateTimestamp = () => {
        return new Date().getTime();
    };
}
