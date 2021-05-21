import React from 'react';
import { StyleSheet } from 'react-native';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';

interface Feature {
    id: number;
    icon: string;
    label: string;
}

const features: Feature[] = [
    {
        id: 0,
        icon: 'IconCharts',
        label: 'Charts and Trends',
    },
    {
        id: 1,
        icon: 'IconInfinitive',
        label: 'Unlimited Pools',
    },
    {
        id: 2,
        icon: 'IconHeart',
        label: 'Support a Small Team',
    },
];

export const SubscriptionFeatures = () => {
    return (
        <PDView>
            <PDText type="bodySemiBold" color="grey">
                BENEFITS
            </PDText>
            {features.map((feature: Feature) => {
                const Icon = SVG[feature.icon];
                return (
                    <PDView key={ feature.id } style={ styles.featureItemContainer }>
                        <Icon height={ 24 } width={ 24 } />
                        <PDView style={ styles.featureItemLabelContainer }>
                            <PDText type="bodyMedium" color="black">
                                {feature.label}
                            </PDText>
                        </PDView>
                    </PDView>
                );
            })}
        </PDView>
    );
};

const styles = StyleSheet.create({
    featureItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PDSpacing.xs,
    },
    featureItemLabelContainer: {
        marginLeft: PDSpacing.sm,
    },
});
