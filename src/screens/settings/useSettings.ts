import { useEffect } from 'react';
import { PDSectionListProps } from '~/components/list/PDSectionList';
import { getDisplayForPoolValue } from '~/models/Pool/PoolUnit';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { ExportService } from '~/services/ExportService';

import { useNavigation } from '@react-navigation/native';

import { PoolUnit, PoolUnitOptions } from '~/models/Pool/PoolUnit';
import { useDeviceSettings } from '~/services/DeviceSettings/Hooks';
import pluralize from 'pluralize';
import { DS } from '~/services/DSUtil';

export const useSettings = () => {
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const popoverValue = useTypedSelector(state => state.popover);
    const { ds, updateDS } = useDeviceSettings();

    useEffect(() => {
        if (popoverValue && popoverValue !== ds.units) {
            const cb = async () => {
                await updateDS({ units: popoverValue as PoolUnit });
            };
            cb();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popoverValue, ds.units]);

    const handleNavigationUnits = () =>{
        navigate('PopoverScreen', {
            title: 'Volume Units',
            color: 'orange',
            description: 'This will affect how pool volume is displayed throughout the app.',
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
    const handleNavigatePoolDoctorImport = () => {
        navigate('PoolDoctorImport');
    };
    const handleNavigateThemeToggled = () => {
        navigate('ThemeToggleScreen');
    };

    const handleExportData = async () => {
        try {
            await ExportService.generateAndShareCSV(null);
        } catch (e) {
            console.warn(e);
        }
    };

    const numScoops = ds.scoops.length;
    const scoopsSubtitle = `${numScoops} ${pluralize('scoop', numScoops)}`;

    const isSubscribed = DS.isSubscriptionValid(ds, Date.now());

    const settingsSection : PDSectionListProps[] = [
        {
            title: 'measurements',
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
                    id: 'scoops',
                    image: 'IconScoop',
                    label: 'Scoops:',
                    valueColor: 'pink',
                    value: scoopsSubtitle,
                    onPress: handleNavigationScoops,
                },
            ],
        },
        {
            title: 'subscription',
            data: [
                {
                    id: 'pooldashPlus',
                    image: 'IconPooldashPlus',
                    label: isSubscribed ? 'Manage: ' : 'Upgrade to: ',
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
                {
                    id: 'importData',
                    image: 'IconImportData',
                    label: 'Import Pools',
                    valueColor: 'black',
                    onPress: handleNavigatePoolDoctorImport,
                },
            ],
        },
        {
            title: 'theme',
            data: [
                {
                    id: 'theme',
                    image: 'IconTheme',
                    label: 'Theme ',
                    valueColor: 'black',
                    onPress: handleNavigateThemeToggled,
                },
            ],
        },
    ];

    return settingsSection;
};
