import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    auth: {
        cognitoUser: CognitoUser;
        cognitoSession?: CognitoUserSession;
    };
}