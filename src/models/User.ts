import { CognitoUser } from 'amazon-cognito-identity-js';

export interface User {
    email: string;
    cognitoUser: CognitoUser;
}