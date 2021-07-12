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
                    I used to clean pools, and now I'm an engineer. I love working on Pooldash, and I'll keep improving it for years to come.
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
