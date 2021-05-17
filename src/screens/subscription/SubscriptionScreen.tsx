import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScreenHeader } from '~/components/headers/ScreenHeader';
import { PDSafeAreaView } from '~/components/PDSafeAreaView';
import { PDSpacing, useTheme } from '~/components/PDTheme';

import { SubscriptionOptions } from './components/prompt/SubscriptionOptions';
import { SubscriptionSuccess } from './components/success/SubscriptionSucces';
import { usePurchaseState } from '../../services/subscription/SubHooks';
import { DS } from '~/services/DSUtil';

export const SubscriptionScreen: React.FC = () => {
    const theme = useTheme();

    const purchaseState = usePurchaseState();

    const d = purchaseState.details;
    const isActive = d && DS.isSubscriptionValid({ sub_exp: d.exp.getTime(), sub_will_renew: d.will_renew }, Date.now());
    const content = (isActive && d)     // the (&& d) portion is only necessary to make the type-checker happy.
        ? <SubscriptionSuccess { ...d } />
        :  <SubscriptionOptions />;

    return (
        <PDSafeAreaView bgColor="white">
            <ScreenHeader color="blue" textType="heading">
                Pooldash Plus
            </ScreenHeader>
            <ScrollView style={ [styles.content, { backgroundColor: theme.greyVeryLight } ] }>
                { content }
            </ScrollView>
        </PDSafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: PDSpacing.md,
        paddingTop: PDSpacing.lg,
    },
});
