"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const react_native_config_1 = require("react-native-config");
/**
 * Service class used to interact with AWS Cognito Identity Pool. This class can be used to register,
 * login, and retrieve valid user information from persistent storage
 */
class CognitoService {
    constructor() {
        this.userPool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: react_native_config_1.default.AWS_USER_POOL_ID,
            ClientId: react_native_config_1.default.AWS_USER_POOL_CLIENT_ID
        });
    }
    /**
     * Load the user from Async and authenticate the session
     */
    loadUserIfExists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.loadUserFromStorage();
            }
            catch (error) {
                console.warn('ERROR loadUserIfExists', error);
            }
        });
    }
    /**
     * Load the user session from persistent storage
     * @param user current user object
     * @returns valid user session if it exists
     */
    loadUserSessionIfExists(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getSessionAsync(user);
            }
            catch (error) {
                console.warn(`ERROR loadUserSessionIfExists - ${error}`);
                return null;
            }
        });
    }
    /**
     * Sign user in using the provided credentials
     * @param username username of user to sign in (email)
     * @param password user's password
     * @returns valid CognitoSession
     */
    authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const authDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
                Username: email,
                Password: password
            });
            const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser({
                Username: email,
                Pool: this.userPool
            });
            try {
                const session = yield this.authenticateUserAsync(cognitoUser, authDetails);
                return {
                    cognitoSession: session,
                    cognitoUser
                };
            }
            catch (e) {
                return null;
            }
        });
    }
    /**
     * Register the user with the provided information
     * @param firstName first name of user (GivenName attribute)
     * @param lastName last name of user (FamilyName attribute)
     * @param email email of user
     * @param password user's password
     * @returns valid Cognito User
     */
    registerUser(firstName, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const attributeGivenName = new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: 'given_name',
                Value: firstName
            });
            const attributeFamilyName = new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: 'family_name',
                Value: lastName
            });
            const attributeList = [attributeGivenName, attributeFamilyName];
            try {
                return yield this.registerUserAsync(email, password, attributeList);
            }
            catch (error) {
                console.warn('error while registering user! ', error);
                return null;
            }
        });
    }
    /**
     * Confirm user registration with the verification code
     * @param verificationCode given verification code
     * @param email user email to confirm
     * @returns whether or not the confirmation was successful
     */
    confirmRegistration(verificationCode, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser({
                Username: email,
                Pool: this.userPool
            });
            try {
                return yield this.confirmRegistrationAsync(cognitoUser, verificationCode);
            }
            catch (e) {
                console.warn('ERROR confirmRegistration: ', e);
                return false;
            }
        });
    }
    /**
     * Get all user attributes from Cognito user object
     * @param cognitoUser cognito user object
     * @returns array of user attributes
     */
    getUserAttributes(cognitoUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let attributes = null;
            try {
                attributes = yield this.getUserAttributesAsync(cognitoUser);
            }
            catch (error) {
                console.warn('ERROR getUserAttributes: ', error);
            }
            return attributes;
        });
    }
    /**
     * Get single attribute from the user
     * @param attributeName name of attribute
     * @param cognitoUser user object
     * @returns single user attribute with the given name
     */
    getUserAttribute(attributeName, cognitoUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attributeList = yield this.getUserAttributesAsync(cognitoUser);
                console.warn(attributeList);
                const matchingAttribute = attributeList.filter(a => a.Name === attributeName)[0];
                if (matchingAttribute) {
                    return matchingAttribute;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.warn('error getting user attributes', error);
                return null;
            }
        });
    }
    /**
     * Logout user by invalidating their session
     * @param user CognitoUser object to logout
     */
    signOutUser(user) {
        user.signOut();
    }
    loadUserFromStorage() {
        return new Promise((resolve, reject) => {
            this.userPool.storage.sync((err, result) => {
                if (result === 'SUCCESS') {
                    const user = this.userPool.getCurrentUser();
                    resolve(user);
                }
                else {
                    reject(`Error while syncing storage - ${err}. Returned result - ${result}`);
                }
            });
        });
    }
    getSessionAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                user.getSession((error, session) => {
                    if (error) {
                        reject(`ERROR getSessionAsync: ${error}`);
                    }
                    resolve(session);
                });
            });
        });
    }
    authenticateUserAsync(cognitoUser, authDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                cognitoUser.authenticateUser(authDetails, {
                    onSuccess: (authSession) => {
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
        });
    }
    registerUserAsync(email, password, attributeList) {
        return new Promise((resolve, reject) => {
            this.userPool.signUp(email, password, attributeList, null, (error, result) => {
                if (error) {
                    console.warn('error signing up!!!', error);
                    reject(null);
                    return;
                }
                console.warn('successfully registered user!!', result.user);
                resolve(result.user);
            });
        });
    }
    confirmRegistrationAsync(cognitoUser, verificationCode) {
        return new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
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
    getUserAttributesAsync(cognitoUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                cognitoUser.getUserAttributes((error, userAttributes) => {
                    if (error) {
                        console.warn('ERROR getUserAttributesAsync: ', error, 'user attributes - ', userAttributes);
                        reject(null);
                        return;
                    }
                    resolve(userAttributes);
                });
            });
        });
    }
}
exports.CognitoService = CognitoService;
//# sourceMappingURL=CognitoService.js.map