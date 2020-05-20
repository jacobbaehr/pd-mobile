export interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    auth: {
        // cognitoUser: CognitoUser;
        // cognitoSession?: CognitoUserSession;
    };
}
