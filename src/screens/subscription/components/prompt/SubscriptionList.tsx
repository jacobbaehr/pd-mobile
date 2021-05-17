import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { PDButton } from '~/components/buttons/PDButton';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { ProductId } from '~/models/InAppPurchase';
import { IAP } from '~/services/subscription/IAP';

import { SU } from '~/services/subscription/Util';
import { SubscriptionListItem } from './SubscriptionListItem';
import { useAvailablePackages } from '~/services/subscription/SubHooks';

export const SubscriptionList = () => {
    const packages = useAvailablePackages();
    const [selectedSku, setSelectedSku] = useState<ProductId | null>(null);
    const theme = useTheme();

    const updateSubscription = (identifier: ProductId) => {
        setSelectedSku(identifier);
    };

    const handlePurchase = async () => {
        const product = packages.find((item) => item.product.identifier === selectedSku)!;
        await IAP.purchasePackage(product);
    };

    const handleRestore = async () => {
        await IAP.restoreLastPurchase();
    };

    return (
        <PDView>
            <PDText type="subHeading" color="black">
                Subscription Options
            </PDText>
            <PDView style={ styles.content }>
                {packages.map((p) => (
                    <SubscriptionListItem
                        key={ p.product.identifier }
                        product={ p.product }
                        selected={ selectedSku === p.product.identifier }
                        updateSelection={ updateSubscription }
                    />
                ))}
            </PDView>
            <PDView>
                <PDButton onPress={ handlePurchase } bgColor={ !selectedSku ? 'greyLight' : 'blue' } textStyle={ { color: theme.white } } touchableProps={ {
                    disabled: !selectedSku,
                } }>
                    Subscribe {SU.getDisplayNameByCurrentSubscription(selectedSku)}
                </PDButton>
                <PDButton
                    onPress={ handleRestore }
                    touchableProps={ {
                        disabled:  !selectedSku,
                    } }
                    textType="tooltip"
                    textStyle={ { color: theme.grey, fontWeight: 'bold' } }>
                    Restore Purchases
                </PDButton>
            </PDView>
        </PDView>
    );
};

const styles = StyleSheet.create({
    content: {
        marginVertical: PDSpacing.sm,
    },
});
