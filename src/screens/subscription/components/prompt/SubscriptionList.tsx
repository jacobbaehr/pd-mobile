import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { PDButton } from '~/components/buttons/PDButton';
import { PDText } from '~/components/PDText';
import { PDSpacing, useTheme } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { ProductId } from '~/models/InAppPurchase';
import { Haptic } from '~/services/HapticService';
import { IAP } from '~/services/subscription/IAP';
import { useAvailablePackages } from '~/services/subscription/SubHooks';
import { SU } from '~/services/subscription/Util';

import { SubscriptionListItem } from './SubscriptionListItem';

export const SubscriptionList = () => {
    const packages = useAvailablePackages();
    const [selectedSku, setSelectedSku] = useState<ProductId | null>(null);
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    // Only set initial selection after that package has been loaded:
    useEffect(() => {
        if ((!selectedSku) && packages.length > 0) {
            const doesAnnualPackageExist = packages
                .filter(p => p.product.identifier === 'unlock_20')
                .length > 0;
            if (doesAnnualPackageExist) {
                setSelectedSku('unlock_20');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [packages.length]);

    const updateSubscription = (identifier: ProductId) => {
        setSelectedSku(identifier);
    };

    const handlePurchase = async () => {
        Haptic.medium();
        setIsLoading(true);
        const product = packages.find((item) => item.product.identifier === selectedSku)!;
        await IAP.purchasePackage(product);
        setIsLoading(false);
    };

    const handleRestore = async () => {
        Haptic.light();
        setIsLoading(true);
        await IAP.restoreLastPurchase();
        setIsLoading(false);
    };

    return (
        <PDView style={ { opacity: isLoading ? 0.6 : 1 } } pointerEvents={ isLoading ? 'none' : 'auto' }>
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
                <PDButton
                    onPress={ handlePurchase }
                    bgColor={ !selectedSku ? 'greyLight' : 'blue' }
                    textStyle={ { color: theme.white } }
                    touchableProps={ {
                        disabled: !selectedSku,
                    } }>
                    Subscribe {SU.getDisplayNameByCurrentSubscription(selectedSku)}
                </PDButton>
                <PDButton
                    onPress={ handleRestore }
                    touchableProps={ {
                        disabled: !selectedSku,
                    } }
                    bgColor="transparent"
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
