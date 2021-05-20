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
                    I used to clean pools, and now I’m a software engineer. By subscribing, you'll help us build a great pool calculator for everybody!
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
