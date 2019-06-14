import API from '@aws-amplify/api';
import Config from 'react-native-config';
import aws4 from 'aws4';

import { BaseApiManager, NetworkRequestResponse, HttpRequestTypes } from "./BaseApiManager";
import { CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoService } from 'services/CognitoService';


export abstract class AuthenticedApiManager extends BaseApiManager {
    protected tokenResolver: () => string;

    constructor(baseUrl: string, tokenResolver: () => string, user: CognitoUser) {
        super(baseUrl);

        this.tokenResolver = tokenResolver;
        this.configureAmplify(user);
    }

    private configureAmplify(user: CognitoUser) {
        API.configure({
            Auth: {
                // REQUIRED - Amazon Cognito Identity Pool ID
                identityPoolId: Config.AWS_IDENTITY_POOL_ID,
                // REQUIRED - Amazon Cognito Region
                region: Config.AWS_REGION, 
                // OPTIONAL - Amazon Cognito User Pool ID
                userPoolId: Config.AWS_USER_POOL_ID, 
                // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
                userPoolWebClientId: Config.AWS_USER_POOL_CLIENT_ID
            },
            API: {
                endpoints: [
                    {
                        name: "API",
                        endpoint: `https://${Config.API_ENDPOINT}`,                        
                        // custom_header: async () => {
                        //     const cs = new CognitoService();
                        //     const session = await cs.loadUserSessionIfExists(user);

                        //     console.warn('tokenStuff: ', session.getIdToken().getJwtToken());
                            
                        //     return { Authorization: session.getIdToken().getJwtToken() };
                        // }
                    }
                ]
            }
        });
    }

    public async req() {
        try {
            console.warn('requesting...');
            const bob = await API.get('API', `/pools/39d/logs`, {});
            console.warn(bob);
            return bob;
        } catch (e) {
            console.warn('here');
            console.warn(e);
        }
    }

    /**
     * Make API request with the given config, appends AUTHORIZATION header
     * @param method type of request to send
     * @param endpoint endpoint of url to send request to
     * @param headers headers to add to request
     * @param urlParams query parameters for request
     * @param requestBody body of request
     */
    public async makeRequest<ResponseType> (
        method: HttpRequestTypes,
        headers: { [key: string]: string | number } = {},
        endpoint?: string,
        urlParams?: { [key: string]: any },
        requestBody?: { [key: string]: any }
        ): Promise<NetworkRequestResponse<ResponseType>> {
            const headersPlusAuthorization = {
                ...headers,
                authorization: this.tokenResolver()
            };

            return super.makeRequest<ResponseType>(
                method,
                headersPlusAuthorization, 
                endpoint, 
                urlParams, 
                requestBody);
        }
}
