import { AnyAction } from 'redux';

export const UPDATE_VALID_SUBSCRIPTION = 'UPDATE_VALID_SUBSCRIPTION';

export interface UpdateValidSubscriptionAction extends AnyAction {
    hasValidSubscription: boolean;
}

export type HasValidSubscriptionActions = UpdateValidSubscriptionAction;

// Update whether or not the user has a valid subscription
export const updateValidSubscription = (hasValidSubscription: boolean): UpdateValidSubscriptionAction => {
    return {
        type: UPDATE_VALID_SUBSCRIPTION,
        hasValidSubscription
    };
};