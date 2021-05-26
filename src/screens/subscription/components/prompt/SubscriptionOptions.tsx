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
                    👋 Hi, I'm John!
                </PDText>
                <PDText type="bodyRegular" color="grey" numberOfLines={ 0 } style={ { marginTop: PDSpacing.xs } }>
                    I was a lifeguard for 5 years. I hope you like this app!
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
