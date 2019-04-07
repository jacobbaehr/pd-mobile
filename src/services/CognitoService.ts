import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession } from 'amazon-cognito-identity-js';
import Config from 'react-native-config';

import { CognitoAuthenticationSuccess } from 'models/CognitoAuthenticationSuccess';

/**
 * Service class used to interact with AWS Cognito Identity Pool. This class can be used to register,
 * login, and retrieve valid user information from persistent storage
 */
export class CognitoService {
    /** Cognito user pool information containing the identity pool for the application */
    private userPool: CognitoUserPool;

    constructor() {
        this.userPool = new CognitoUserPool({
            UserPoolId: Config.AWS_USER_POOL_ID,
            ClientId: Config.AWS_USER_POOL_CLIENT_ID
        });
    }

    /**
     * Load the user from Async and authenticate the session
     */
    public async loadUserIfExists(): Promise<CognitoUser> {
        try {
            return await this.loadUserFromStorage();
        } catch (error) {
            console.warn('ERROR loadUserIfExists', error);
        }
    }

    /**
     * Load the user session from persistent storage
     * @param user current user object
     * @returns valid user session if it exists
     */
    public async loadUserSessionIfExists(user: CognitoUser): Promise<CognitoUserSession> {
        try {
            return await this.getSessionAsync(user);
        } catch (error) {
            console.warn(`ERROR loadUserSessionIfExists - ${error}`);
            return null;
        }
    }

    /**
     * Sign user in using the provided credentials
     * @param username username of user to sign in (email)
     * @param password user's password
     * @returns valid CognitoSession
     */
    public async authenticateUser(email: string, password: string): Promise<CognitoAuthenticationSuccess> {
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: this.userPool
        });

        try {
            const session: CognitoUserSession = await this.authenticateUserAsync(cognitoUser, authDetails);
            return {
                cognitoSession: session,
                cognitoUser
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Register the user with the provided information
     * @param firstName first name of user (GivenName attribute)
     * @param lastName last name of user (FamilyName attribute)
     * @param email email of user
     * @param password user's password
     * @returns valid Cognito User
     */
    public async registerUser(firstName: string, lastName: string, email: string, password: string): Promise<CognitoUser> {
        const attributeGivenName = new CognitoUserAttribute({
            Name: 'given_name',
            Value: firstName
        });
        const attributeFamilyName = new CognitoUserAttribute({
            Name: 'family_name',
            Value: lastName
        });
        const attributeList = [attributeGivenName, attributeFamilyName];

        try {
            return await this.registerUserAsync(email, password, attributeList);
        } catch (error) {
            console.warn('error while registering user! ', error);
            return null;
        }
    }

    /**
     * Confirm user registration with the verification code
     * @param verificationCode given verification code
     * @param email user email to confirm
     * @returns whether or not the confirmation was successful
     */
    public async confirmRegistration(verificationCode: string, email: string): Promise<boolean> {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: this.userPool
        });

        try {
            return await this.confirmRegistrationAsync(cognitoUser, verificationCode);
        } catch (e) {
            console.warn('ERROR confirmRegistration: ', e);
            return false;
        }
    }

    /**
     * Get all user attributes from Cognito user object
     * @param cognitoUser cognito user object
     * @returns array of user attributes
     */
    public async getUserAttributes(cognitoUser: CognitoUser): Promise<CognitoUserAttribute[]> {
        let attributes: CognitoUserAttribute[] = null;
        try {
            attributes = await this.getUserAttributesAsync(cognitoUser);
        } catch (error) {
            console.warn('ERROR getUserAttributes: ', error);
        }
        return attributes;
    }

    /**
     * Get single attribute from the user
     * @param attributeName name of attribute
     * @param cognitoUser user object
     * @returns single user attribute with the given name
     */
    public async getUserAttribute(attributeName: string, cognitoUser: CognitoUser): Promise<CognitoUserAttribute> {
        try {
            const attributeList = await this.getUserAttributesAsync(cognitoUser);
            const matchingAttribute = attributeList.filter(a => a.Name === attributeName)[0];

            if (matchingAttribute) {
                return matchingAttribute;
            } else {
                return null;
            }
        } catch (error) {
            console.warn('error getting user attributes', error);
            return null;
        }
    }

    /**
     * Logout user by invalidating their session
     * @param user CognitoUser object to logout
     */
    public signOutUser(user: CognitoUser): void {
        user.signOut();
    }

    private loadUserFromStorage (): Promise<CognitoUser> {
        return new Promise((resolve, reject) => {
            (this.userPool as any).storage.sync((err, result) => {
                if (result === 'SUCCESS') {
                    const user = this.userPool.getCurrentUser();
                    resolve(user);
                } else {
                    reject(`Error while syncing storage - ${err}. Returned result - ${result}`);
                }
              });
        });
    }

    private async getSessionAsync(user: CognitoUser): Promise<any> {
        return new Promise((resolve, reject) => {
            user.getSession((error, session) => {
                if (error) {
                    reject(`ERROR getSessionAsync: ${error}`);
                }
                resolve(session);
            });
        });
    }

    private async authenticateUserAsync(cognitoUser: CognitoUser, authDetails: AuthenticationDetails): Promise<any> {
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authDetails, {
                onSuccess: (authSession: CognitoUserSession) => {
                    // user has finished registration and is now logged in
                    resolve(authSession);
                },
                onFailure: (error) => {
                    console.warn('error while authenticating user!', error);
                    reject(null);
                },
                mfaRequired: (codeDeliveryDetails) => {
                    console.warn('MFA required!', codeDeliveryDetails);
                    reject(null);
                }
            });
        });
    }

    private registerUserAsync(email: string, password: string, attributeList: CognitoUserAttribute[]): Promise<CognitoUser> {
        return new Promise((resolve, reject) => {
            this.userPool.signUp(email, password, attributeList, null, (error: any, result: any) => {
                if (error) {
                    console.warn('error signing up!!!', error);
                    reject(null);
                    return;
                }
                console.log('successfully registered user!!', result.user);
                resolve(result.user);
            });
        });
    }

    private confirmRegistrationAsync(cognitoUser: CognitoUser, verificationCode: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(verificationCode, true, (err: any, result) => {
                if (err) {
                    console.log('Error at confirmRegistration ', err);
                    reject(false);
                    return;
                }
                console.log('result', result);
                resolve(true);
            });
        });
    }

    private async getUserAttributesAsync(cognitoUser: CognitoUser): Promise<any> {
        return new Promise((resolve, reject) => {
            cognitoUser.getUserAttributes((error, userAttributes: CognitoUserAttribute[]) => {
                if (error) {
                    console.warn('ERROR getUserAttributesAsync: ', error, 'user attributes - ', userAttributes);
                    reject(null);
                    return;
                }
                resolve(userAttributes);
            });
        });
    }
}