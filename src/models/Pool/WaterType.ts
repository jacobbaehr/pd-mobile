import { DisplayValueOption } from '../Util';

export type WaterTypeValue = 'chlorine' | 'salt_water' | 'bromine' | 'copper' | 'ozone';

export const waterTypeOptions: DisplayValueOption<WaterTypeValue>[] = [
    {
        display: 'Chlorine',
        value: 'chlorine',
    },
    {
        display: 'Salt Water',
        value: 'salt_water',
    },
    {
        display: 'Bromine',
        value: 'bromine',
    },
    {
        display: 'Copper',
        value: 'copper',
    },
    {
        display: 'Ozone',
        value: 'ozone',
    },
];

export const getDisplayForWaterType = (value: WaterTypeValue): string | null => {
    for (let i = 0; i < waterTypeOptions.length; i++) {
        if (waterTypeOptions[i].value === value) {
            return waterTypeOptions[i].display;
        }
    }
    return null;
};
