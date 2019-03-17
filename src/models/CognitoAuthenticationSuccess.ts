import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

/** Object returned on successful authentication */
export interface CognitoAuthenticationSuccess {
    cognitoUser: CognitoUser;
    cognitoSession: CognitoUserSession;
}