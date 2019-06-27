import { CognitoUser } from 'amazon-cognito-identity-js';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { PDNav } from 'navigator/Navigators';
import { updateValidSubscription } from 'redux/hasValidSubscription/Actions';
import { hydrateUserAction } from 'redux/user/Actions';
import { CognitoService } from 'services/CognitoService';
import { InAppPurchasesService, PurchaserInfo } from 'services/InAppPurchasesService';

export interface AppProps extends DispatchProp<any> {}

export class AppComponent extends React.PureComponent<AppProps, {}> {
    /** */
    private cognitoService: CognitoService;

    constructor(props: AppProps) {
        super(props);
        this.cognitoService = new CognitoService();
    }

    async componentDidMount() {
        const cognitoUser = await this.cognitoService.loadUserIfExists();
        if (cognitoUser) {
            const cognitoSession = await this.cognitoService.loadUserSessionIfExists(cognitoUser);
            const userEmail = await this.cognitoService.getUserAttribute('email', cognitoUser);
            const userFirstName = await this.cognitoService.getUserAttribute('given_name', cognitoUser);
            const userLastName = await this.cognitoService.getUserAttribute('family_name', cognitoUser);
            const user = {
                email: userEmail.getValue(),
                firstName: userFirstName.getValue(),
                lastName: userLastName.getValue(),
                auth: {
                    cognitoUser,
                    cognitoSession
                }
            };
            console.warn('loading user - ', user);
            this.props.dispatch(hydrateUserAction(user));

            this.configureIAP(cognitoUser);
        }
    }

    private configureIAP = async (user: CognitoUser) => {
        // Setup IAP configuration
        await InAppPurchasesService.configureInAppPurchasesProvider(user.getUsername(), (info: PurchaserInfo) => {
            // handle any changes to purchaserInfo
            console.warn('user purchase info updated', info);
            if (info.activeEntitlements.length !== 0) {
                this.props.dispatch(updateValidSubscription(true));
            }
        });

        // Check for existing subscription
        const hasExisting = await InAppPurchasesService.hasExistingSubscription();
        console.warn('user has existing - ', hasExisting);
        this.props.dispatch(updateValidSubscription(hasExisting));
    }

    render() {
        return (

            <PDNav />
        );
    }
}

export const App = connect() (AppComponent);