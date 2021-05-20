import { useEffect } from 'react';
import { PDSectionListProps } from '~/components/list/PDSectionList';
import { getDisplayForPoolValue } from '~/models/Pool/PoolUnit';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { ExportService } from '~/services/ExportService';

import { useNavigation } from '@react-navigation/native';

import { PoolUnit, PoolUnitOptions } from '../../models/Pool/PoolUnit';
import { useDeviceSettings } from '../../services/DeviceSettings/Hooks';

export const useSettings = () => {
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const popoverValue = useTypedSelector(state => state.popover);
    const { ds, updateDS } = useDeviceSettings();


    useEffect(() => {
        if (popoverValue && popoverValue !== ds.units) {
            const cb = async () => {
                console.log(popoverValue);
                await updateDS({ units: popoverValue as PoolUnit });
            };
            cb();

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popoverValue, ds.units]);

    const handleNavigationUnits = () =>{
        navigate('PopoverScreen', {
            title: 'Change Unit',
            color: 'orange',
            description: 'Your selection will be used globally across all unit selectors',
            items: PoolUnitOptions.map((item) => ({ name: item.display, value: item.value })),
            prevSelection: ds.units,
        });

    };
    const handleNavigationScoops = () =>{
        navigate('ScoopsList');

    };
    const handleNavigationSubscription = () =>{
        navigate('Subscription');
    };

    const handleExportData = async () => {
        try {
            await ExportService.generateAndShareCSV(null);
        } catch (e) {
            console.warn(e);
        }
    };


    const settingsSection : PDSectionListProps[] = [
        {
            title: 'basic information',
            data: [
                {
                    id: 'unit',
                    image: 'IconUnits',
                    label: 'Units:',
                    valueColor: 'orange',
                    value: getDisplayForPoolValue(ds.units),
                    onPress: handleNavigationUnits,
                },
                {
                    id: 'sccops',
                    image: 'IconScoop',
                    label: 'Scoops:',
                    valueColor: 'pink',
                    value: `${3} scoops`,
                    onPress: handleNavigationScoops,
                },
                {
                    id: 'pooldashPlus',
                    image: 'IconPooldashPlus',
                    label: 'Upgrade to:  ',
                    valueColor: 'teal',
                    value: 'Pooldash+',
                    onPress: handleNavigationSubscription,
                },
            ],
        },
        {
            title: 'additional actions',
            data: [
                {
                    id: 'exportData',
                    image: 'IconExportData',
                    label: 'Export Data',
                    valueColor: 'black',
                    onPress: handleExportData,
                },
                // {
                //     id: 'importData',
                //     image: 'IconImportData',
                //     label: 'Import data',
                //     valueColor: 'black',
                //     onPress: () => {},
                // },
            ],
        },
    ];

    return settingsSection;
};
