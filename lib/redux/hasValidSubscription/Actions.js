"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_VALID_SUBSCRIPTION = 'UPDATE_VALID_SUBSCRIPTION';
// Update whether or not the user has a valid subscription
exports.updateValidSubscription = (hasValidSubscription) => {
    return {
        type: exports.UPDATE_VALID_SUBSCRIPTION,
        hasValidSubscription
    };
};
//# sourceMappingURL=Actions.js.map