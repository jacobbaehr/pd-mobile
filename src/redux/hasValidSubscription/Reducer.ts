import { HasValidSubscriptionActions, UPDATE_VALID_SUBSCRIPTION } from './Actions';

/** */
export const hasValidSubscriptionReducer = (
    previousState: boolean = false,
    action: HasValidSubscriptionActions,
): boolean => {
    switch (action.type) {
        case UPDATE_VALID_SUBSCRIPTION:
            return action.hasValidSubscription;
        default:
            return previousState;
    }
};
