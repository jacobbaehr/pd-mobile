import Purchases, { PurchasesOffering, PurchasesPackage, PurchaserInfo } from 'react-native-purchases';
import { Config } from './Config';

// On success, we return the date of subscription expiration
export type PurchaseStatus = 'not_bought' | 'loading' | 'unavailable' | 'cancelled' | 'error' | Date;
// TODO: consider differentiating expired vs other stuff

export class IAP {
    static configureOnLaunch = () => {
        Purchases.setDebugLogsEnabled(true);
        Purchases.setup(Config.revenueCatPublicKey);
    };

    static purchaseUnlock = async (): Promise<PurchaseStatus> => {
        const offering = await IAP.getCurrentOffering();

        const standardPackageList = offering.availablePackages.filter((p) => p.offeringIdentifier === 'standard');
        if (standardPackageList.length > 0) {
            // This is the package we want to buy!
            const p = standardPackageList[0];
            const result = await IAP.purchasePackage(p);
            return result;
        }
        return 'unavailable';
    };

    static restoreUnlock = async (): Promise<PurchaseStatus> => {
        try {
            console.log('baaaaaa');
            const purchaserInfo = await Purchases.restoreTransactions();
            console.log('boooooo');
            return IAP.getStatus(purchaserInfo);
        } catch (e) {
            if (e.userCancelled) {
                return 'cancelled';
            }
            return 'error';
        }
    };
    static getManagementURL = async (): Promise<string | null> => {
        const purchaserInfo = await Purchases.getPurchaserInfo();
        return purchaserInfo.managementURL;
    };

    static checkExpiration = async (): Promise<PurchaseStatus> => {
        try {
            const purchaserInfo = await Purchases.getPurchaserInfo();
            return IAP.getStatus(purchaserInfo);
        } catch (e) {
            console.error(e);
            return 'error';
        }
    };

    private static getCurrentOffering = async (): Promise<PurchasesOffering> => {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null) {
                console.log('Offerings: ', JSON.stringify(offerings.current));
                return offerings.current;
            } else {
                return Promise.reject('There are no purchases currently available');
            }
        } catch (e) {
            console.error(e);
            return Promise.reject('unable to retrive offerings');
        }
    };

    private static purchasePackage = async (p: PurchasesPackage): Promise<PurchaseStatus> => {
        try {
            const purchaseMade = await Purchases.purchasePackage(p);
            const result = IAP.getStatus(purchaseMade.purchaserInfo);
            console.log('buying...');
            console.log(JSON.stringify(result));
            if (result === 'not_bought') {
                return 'error';
            }
            return result;
        } catch (e) {
            if (!e.userCancelled) {
                console.error(e);
                return 'error';
            }
            return 'cancelled';
        }
    };

    private static getStatus = (purchaserInfo: PurchaserInfo): PurchaseStatus => {
        console.log('pi: ', JSON.stringify(purchaserInfo));
        if (typeof purchaserInfo.entitlements.active.unlock_20 !== 'undefined') {
            console.log('a');
            const entitlement = purchaserInfo.entitlements.active.unlock_20;
            if (entitlement.expirationDate === null) {
                console.log('b');
                return new Date('2120-01-01'); // I'll be dead by then, so this is someone else's problem.
            }
            console.log('c');
            return new Date(entitlement.expirationDate);
        }
        console.log('d');
        return 'not_bought';
    };
}
