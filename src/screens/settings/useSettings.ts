import { PDSectionListProps } from '~/components/list/PDSectionList';
import { getDisplayForPoolValue } from '~/models/Pool/PoolUnit';
import { PDStackNavigationProps } from '~/navigator/shared';
import { useTypedSelector } from '~/redux/AppState';
import { ExportService } from '~/services/ExportService';

import { useNavigation } from '@react-navigation/native';

export const useSettings = () => {
    const { navigate } = useNavigation<PDStackNavigationProps>();
    const ds = useTypedSelector((state) => state.deviceSettings);

    const handleNavigationUnits = () =>{

    };
    const handleNavigationScoops = () =>{

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
