import * as React from 'react';
import { HR } from '~/components/Hr';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { SubscriptionFeatures } from '../shared/SubscriptionFeatures';
import { SubscriptionList } from './SubscriptionList';

export const SubscriptionOptions: React.FC = () => {
    return (
        <>
            <PDView>
                <PDText type="subHeading">
                    Upgrade
                </PDText>
                <PDText type="bodyRegular" color="grey" numberOfLines={ 4 } style={ { marginTop: PDSpacing.xs } }>
                    I used to clean pools, but now I’m a software engineer. I hope this app makes your day a little better!
                </PDText>
            </PDView>
            <HR/>
                <SubscriptionFeatures/>
            <HR/>
                <SubscriptionList/>
            <HR />
        </>
    );
};
