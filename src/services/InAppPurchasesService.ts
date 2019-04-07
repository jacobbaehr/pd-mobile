import Config from 'react-native-config';
import Purchases from 'react-native-purchases';

export interface PurchaserInfo {
    latestExpirationDate: Date;
    activeSubscriptions: any[];
    allExpirationDates: { [key: string]: Date };
    allPurchasedProductIdentifiers: string[];
    expirationsForActiveEntitlements: { [key: string]: Date };
    activeEntitlements: string[];
    purchaseDatesForActiveEntitlements: { [key: string]: Date };
}

/**
 *
 */
export class InAppPurchasesService {
    /**
     *
     * @param userId
     */
    public static async configureInAppPurchasesProvider (userId: string, onPurchaserInfoUpdated: (info: PurchaserInfo) => void): Promise<void> {
        await Purchases.setup(Config.REVENUE_CAT_APP_KEY, userId);
        Purchases.setDebugLogsEnabled(__DEV__);
        Purchases.setAllowSharingStoreAccount(true);

        // Set up listener for payment info changes
        Purchases.addPurchaserInfoUpdateListener(onPurchaserInfoUpdated);
    }

    /**
     *
     */
    public static async hasExistingSubscription (): Promise<boolean> {
        try {
            const purchaserInfo = await Purchases.getPurchaserInfo();
            console.warn('info - ', purchaserInfo);
                // Option 1: Check if user has access to entitlement (from RevenueCat dashboard)
            if (purchaserInfo.activeEntitlements && purchaserInfo.activeEntitlements.includes(Config.PRO_SUBSCRIPTION_ENTITLEMENT_IDENTIFIER)
                || purchaserInfo.activeSubscriptions && purchaserInfo.activeSubscriptions.includes(Config.PRO_SUBSCRIPTION_PRODUCT_ID)) {
                // Grant user "pro" access
                return true;
            }
        } catch (e) {
            console.warn('Error fetching purchaser info - ', e);
            // Error fetching purchaser info
        }
        return false;
    }
}