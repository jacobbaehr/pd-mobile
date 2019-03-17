import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { PDNavFluid } from 'navigator/Navigators';
import { hydrateUserAction } from 'redux/user/Actions';
import { CognitoService } from 'services/CognitoService';

export interface AppProps extends DispatchProp<any> {
}

export class AppComponent extends React.PureComponent<AppProps, {}> {
    /** */
    private cognitoService: CognitoService;

    constructor(props) {
        super(props);
        this.cognitoService = new CognitoService();
    }

    async componentDidMount() {
        const cognitoUser = await this.cognitoService.loadUserIfExists();
        const cognitoSession = await this.cognitoService.loadUserSessionIfExists(cognitoUser);
        const userEmail = await this.cognitoService.getUserAttribute('email', cognitoUser);

        const user = {
            email: userEmail.getValue(),
            auth: {
                cognitoUser,
                cognitoSession
            }
        };

        this.props.dispatch(hydrateUserAction(user));
    }

    render() {
        return (
            <PDNavFluid />
        );
    }
}

export const App = connect() (AppComponent);