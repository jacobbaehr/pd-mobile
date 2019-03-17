import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

export interface User {
    email: string;
    auth: {
        cognitoUser: CognitoUser;
        cognitoSession?: CognitoUserSession;
    };
}