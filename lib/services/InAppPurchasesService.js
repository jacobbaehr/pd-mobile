"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_config_1 = require("react-native-config");
const react_native_purchases_1 = require("react-native-purchases");
/**
 *
 */
class InAppPurchasesService {
    /**
     *
     * @param userId
     */
    static configureInAppPurchasesProvider(userId, onPurchaserInfoUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            yield react_native_purchases_1.default.setup(react_native_config_1.default.REVENUE_CAT_APP_KEY, userId);
            react_native_purchases_1.default.setDebugLogsEnabled(__DEV__);
            react_native_purchases_1.default.setAllowSharingStoreAccount(true);
            // Set up listener for payment info changes
            react_native_purchases_1.default.addPurchaserInfoUpdateListener(onPurchaserInfoUpdated);
        });
    }
    /**
     *
     */
    static hasExistingSubscription() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchaserInfo = yield react_native_purchases_1.default.getPurchaserInfo();
                console.warn('info - ', purchaserInfo);
                // Option 1: Check if user has access to entitlement (from RevenueCat dashboard)
                if (purchaserInfo.activeEntitlements && purchaserInfo.activeEntitlements.includes(react_native_config_1.default.PRO_SUBSCRIPTION_ENTITLEMENT_IDENTIFIER)
                    || purchaserInfo.activeSubscriptions && purchaserInfo.activeSubscriptions.includes(react_native_config_1.default.PRO_SUBSCRIPTION_PRODUCT_ID)) {
                    // Grant user "pro" access
                    return true;
                }
            }
            catch (e) {
                console.warn('Error fetching purchaser info - ', e);
                // Error fetching purchaser info
            }
            return false;
        });
    }
}
exports.InAppPurchasesService = InAppPurchasesService;
//# sourceMappingURL=InAppPurchasesService.js.map