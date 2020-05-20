export type WaterTypeValue = 'chlorine' | 'salt_water' | 'bromine' | 'copper' | 'ozone';

interface WaterTypeOption {
    display: string;
    value: WaterTypeValue;
}

export const waterTypeOptions: WaterTypeOption[] = [
    {
        display: 'Chlorine',
        value: 'chlorine'
    },
    {
        display: 'Salt Water',
        value: 'salt_water'
    },
    {
        display: 'Bromine',
        value: 'bromine'
    },
    {
        display: 'Copper',
        value: 'copper'
    },
    {
        display: 'Ozone',
        value: 'ozone'
    }
];

export const getDisplayForWaterType = (value: string): string | null => {
    for (let i = 0; i < waterTypeOptions.length; i++) {
        if (waterTypeOptions[i].value === value) {
            return waterTypeOptions[i].display;
        }
    }
    return null;
}