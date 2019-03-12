import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

/**
 *
 */
export class CognitoService {
    /** */
    private userPool: CognitoUserPool;
    /** */
    private cognitoUser: CognitoUser;

    constructor() {
        // TODO: pull out user pool ID and client ID to RN config
        this.userPool = new CognitoUserPool({
            UserPoolId: 'us-east-2_uXyzcLAaR',
            ClientId: '1ijb55cu7btafjsivh587up4f8'
        });
    }

    /**
     * Get the current cognito user saved in the user pool if the user has completed authentication
     */
    public getCognitoUser(): CognitoUser {
        if (!this.cognitoUser) {
            console.warn('cognito user not set!');
            return this.userPool.getCurrentUser();
        }
        return this.cognitoUser;
    }

    /**
     *
     */
    public loadUserIfExists(): CognitoUser {
        return this.userPool.getCurrentUser();
    }

    /**
     *
     * @param username
     * @param password
     */
    public async authenticateUser(email: string, password: string): Promise<CognitoUserSession> {
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: this.userPool
        });

        const session: CognitoUserSession = await this.authenticateUserAsync(cognitoUser, authDetails);
        this.cognitoUser = cognitoUser;
        return session;
    }

    private async authenticateUserAsync(cognitoUser: CognitoUser, authDetails: AuthenticationDetails): Promise<any> {
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authDetails, {
                onSuccess: (authSession: CognitoUserSession) => {
                    // user has finished registration and is now logged in
                    this.cognitoUser = cognitoUser;
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

    /**
     *
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     */
    public async registerUser(firstName: string, lastName: string, email: string, password: string): Promise<CognitoUser> {
        // Build attribute list
        const attributeGivenName = new CognitoUserAttribute({
            Name: 'given_name',
            Value: firstName
        });
        const attributeFamilyName = new CognitoUserAttribute({
            Name: 'family_name',
            Value: lastName
        });
        const attributeList = [attributeGivenName, attributeFamilyName];

        // Sign up user
        let user: CognitoUser = null;
        try {
            user = await this.registerUserAsync(email, password, attributeList);
            this.cognitoUser = user;
            // persist
        } catch (error) {
            console.warn('error while registering user! ', error);
        }
        return user;
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

    /**
     *
     * @param verificationCode
     * @param email
     */
    public async confirmRegistration(verificationCode: string, email: string): Promise<boolean> {
        console.warn('entered confirm registration');
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: this.userPool
        });

        let registrationConfirmed: boolean = false;
        try {
            registrationConfirmed = await this.confirmRegistrationAsync(cognitoUser, verificationCode);
            this.cognitoUser = cognitoUser;
        } catch (e) {
            console.warn('ahhh we crashed during confirmRegistration - ', e);
        }
        return registrationConfirmed;
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

    /**
     *
     * @param cognitoUser
     */
    public async getUserAttributes(cognitoUser: CognitoUser): Promise<CognitoUserAttribute[]> {
        let attributes: CognitoUserAttribute[] = null;
        try {
            attributes = await this.getUserAttributesAsync(cognitoUser);
        } catch (error) {
            console.warn('error getting user attributes', error);
        }
        return attributes;
    }

    private async getUserAttributesAsync(cognitoUser: CognitoUser): Promise<any> {
        return new Promise((resolve, reject) => {
            cognitoUser.getUserAttributes((error, userAttributes: CognitoUserAttribute[]) => {
                if (error) {
                    console.warn('ERROR: ', error, 'user attributes - ', userAttributes);
                    reject(null);
                    return;
                }
                console.warn('user attributes - ', userAttributes);
                resolve(userAttributes);
            });
        });
    }

    /**
     *
     */
    public signOutUser(): void {
        this.cognitoUser.signOut();
    }
}