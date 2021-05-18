import React from 'react';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSectionList } from '~/components/list/PDSectionList';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';

import { useSettings } from './useSettings';

export const SettingsScreen = () => {
    const settingsSections = useSettings();

    return (
        <PDSafeAreaView bgColor="white">
            <ScreenHeader color="blue" textType="heading">
                Settings
            </ScreenHeader>
            <PDSectionList sections={ settingsSections } />
        </PDSafeAreaView>
    );
};

