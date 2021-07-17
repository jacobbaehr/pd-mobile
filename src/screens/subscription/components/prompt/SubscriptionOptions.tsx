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
                <PDText type="bodyRegular" color="greyDark" numberOfLines={ 0 } style={ { marginTop: PDSpacing.xs } }>
                    I used to clean pools, and now I'm an engineer. If you like Pooldash, please help me keep it ad-free by subscribing!
                </PDText>
            </PDView>
            <HR/>
                <SubscriptionFeatures showTitle={ true }/>
            <HR/>
                <SubscriptionList/>
            <HR />
        </>
    );
};
