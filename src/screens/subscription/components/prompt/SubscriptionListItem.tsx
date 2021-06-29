import React from 'react';
import { StyleSheet } from 'react-native';
import { PurchasesProduct } from 'react-native-purchases';
import TouchableScale from 'react-native-touchable-scale';
import { SVG } from '~/assets/images';
import { PDText } from '~/components/PDText';
import { PDSpacing } from '~/components/PDTheme';
import { PDView } from '~/components/PDView';
import { ProductId, Products } from '~/models/InAppPurchase';
import { Haptic } from '~/services/HapticService';
import { Util } from '~/services/Util';

interface SubscriptionListItemProps {
    product: PurchasesProduct;
    selected?: boolean;
    updateSelection?: (identifier: ProductId) => void;
}


export const SubscriptionListItem: React.FC<SubscriptionListItemProps> = (props) => {
    const { product, selected, updateSelection } = props;
    const Icon = SVG[selected ? 'IconCircleCheck' : 'IconEmptyCircle'];

    const compactStyles = Util.excludeFalsy([styles.container, selected && styles.active]);

    const handleSelection = () => {
        Haptic.light();
        updateSelection!(product.identifier as ProductId);
    };

    if (!product) {
        return null;
    }

    return (
        <TouchableScale onPress={ handleSelection } activeScale={ 0.98 }>
            <PDView bgColor="white" style={ compactStyles }>
                <PDView>
                    <PDText type="bodySemiBold" color="black">
                        {product.title}
                    </PDText>
                    <PDText type="bodyRegular" color="greyDark">
                        {product.price_string} per {product.identifier === Products.MONTHLY ? 'month' : 'year'}
                    </PDText>
                </PDView>
                <PDView>{selected ? <Icon height={ 24 } width={ 24 } color="green" /> : null}</PDView>
            </PDView>
        </TouchableScale>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#EDEDED',
        borderRadius: 18,
        marginBottom: PDSpacing.xs,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: PDSpacing.sm,
        paddingHorizontal: PDSpacing.md,
    },
    content: {
        marginVertical: PDSpacing.sm,
    },
    active: {
        borderColor: '#00B25C',
        backgroundColor: '#00B25C05',
    },
});
