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
const React = require("react");
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = require("react-native-linear-gradient");
const react_redux_1 = require("react-redux");
const images_1 = require("assets/images");
const BackButton_1 = require("components/buttons/BackButton");
const DismissStackButton_1 = require("components/buttons/DismissStackButton");
const TextButton_1 = require("components/buttons/TextButton");
const PDText_1 = require("components/PDText");
const SeparatorLine_1 = require("components/SeparatorLine");
const TextInputWithTitle_1 = require("components/TextInputWithTitle");
const Actions_1 = require("redux/hasValidSubscription/Actions");
const Actions_2 = require("redux/user/Actions");
const CognitoService_1 = require("services/CognitoService");
const InAppPurchasesService_1 = require("services/InAppPurchasesService");
class AuthenticationComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onFirstNameChanged = (firstName) => {
            this.setState({ firstName });
        };
        this.onLastNameChanged = (lastName) => {
            this.setState({ lastName });
        };
        this.onEmailChanged = (email) => {
            this.setState({ email });
        };
        this.onPasswordChanged = (password) => {
            this.setState({ password });
        };
        this.handleAuthButtonPressed = () => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = this.state;
            if (this.isLogin()) {
                const authenticationSuccess = yield this.cognitoService.authenticateUser(email, password);
                if (!authenticationSuccess) {
                    react_native_1.Alert.alert('Error logging in', 'An error occurred while logging in. Please try again.');
                    return;
                }
                const cognitoUser = authenticationSuccess.cognitoUser;
                const firstNameAttribute = yield this.cognitoService.getUserAttribute('given_name', cognitoUser);
                const lastNameAttribute = yield this.cognitoService.getUserAttribute('family_name', cognitoUser);
                // save session in app state
                const user = {
                    email,
                    firstName: firstNameAttribute.getValue(),
                    lastName: lastNameAttribute.getValue(),
                    auth: {
                        cognitoSession: authenticationSuccess.cognitoSession,
                        cognitoUser
                    }
                };
                this.props.dispatch(Actions_2.updateUserAction(user));
                // configure purchases
                yield InAppPurchasesService_1.InAppPurchasesService.configureInAppPurchasesProvider(authenticationSuccess.cognitoUser.getUsername(), (info) => {
                    // handle any changes to purchaserInfo
                    console.warn('user purchase info updated', info);
                    if (info.activeEntitlements.length !== 0) {
                        this.props.dispatch(Actions_1.updateValidSubscription(true));
                    }
                });
                // navigate to confirm purchase
                const name = `${firstNameAttribute.getValue()} ${lastNameAttribute.getValue()}`;
                this.props.navigation.navigate('ConfirmPurchase', { prevScreen: 'Authentication', email, name });
            }
            else {
                this.registerUser();
            }
        });
        this.handleSwitchAuthButtonPressed = () => {
            const isLogin = this.isLogin();
            this.setState({ screenType: isLogin ? 'Register' : 'Login' });
        };
        this.handleBackPressed = () => {
            this.props.navigation.goBack();
        };
        this.handleDismissPressed = () => {
            this.props.navigation.navigate('PoolScreen');
        };
        this.registerUser = () => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = this.state;
            const cognitoUser = yield this.cognitoService.registerUser(firstName, lastName, email, password);
            console.warn('should be called after register success');
            if (cognitoUser) {
                this.props.navigation.navigate('RegistrationVerification', {
                    email,
                    password
                });
            }
            else {
                react_native_1.Alert.alert('Error while registering', 'An error occurred during the registration process. Please try again.');
            }
        });
        this.getEmailInput = (themeColor) => {
            return (React.createElement(TextInputWithTitle_1.TextInputWithTitle, { inputStyles: { color: themeColor }, autoCorrect: false, autoCapitalize: 'none', key: 'email input', titleTextStyles: styles.inputTitleText, titleText: 'Email', keyboardType: 'email-address', onTextChanged: this.onEmailChanged }));
        };
        this.getPasswordInput = (themeColor) => {
            return (React.createElement(TextInputWithTitle_1.TextInputWithTitle, { inputStyles: { color: themeColor }, key: 'password input', autoCorrect: false, secureTextEntry: true, titleTextStyles: styles.inputTitleText, titleText: 'Password', onTextChanged: this.onPasswordChanged }));
        };
        this.getRegisterInputs = (themeColor) => {
            const nameInputs = (React.createElement(react_native_1.View, { key: 'nameInputs' },
                React.createElement(TextInputWithTitle_1.TextInputWithTitle, { inputStyles: { color: themeColor }, autoCorrect: false, titleTextStyles: styles.inputTitleText, titleText: 'First Name', onTextChanged: this.onFirstNameChanged }),
                React.createElement(TextInputWithTitle_1.TextInputWithTitle, { inputStyles: { color: themeColor }, autoCorrect: false, titleTextStyles: styles.inputTitleText, titleText: 'Last Name', onTextChanged: this.onLastNameChanged })));
            return [nameInputs, this.getEmailInput(themeColor), this.getPasswordInput(themeColor)];
        };
        this.getLoginInputs = (themeColor) => {
            return [this.getEmailInput(themeColor), this.getPasswordInput(themeColor)];
        };
        this.isLogin = () => {
            return this.state.screenType === 'Login';
        };
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmationCode: '',
            screenType: props.navigation.getParam('screenType')
        };
        this.cognitoService = new CognitoService_1.CognitoService();
    }
    componentDidMount() {
        const screenType = this.props.navigation.getParam('screenType');
        this.setState({ screenType: screenType });
    }
    render() {
        const isLogin = this.isLogin();
        const screenThemeColor = isLogin ? '#00c89f' : '#50b4ff';
        const inputs = isLogin ? this.getLoginInputs(screenThemeColor) : this.getRegisterInputs(screenThemeColor);
        const switchAuthButtonText = isLogin ? 'Login' : 'Create account';
        const backgroundImage = isLogin ? images_1.images.greenAuthenticationBackground : images_1.images.blueAuthenticationBackground;
        const secondaryActionPromptText = isLogin ? `Don't have an account yet?` : `Already have an account?`;
        const secondaryButtonText = isLogin ? 'Create Account' : 'Login';
        return (React.createElement(react_native_1.View, { style: styles.container },
            React.createElement(react_native_1.Image, { source: backgroundImage, resizeMode: 'cover', style: styles.backgroundImage }),
            React.createElement(react_native_linear_gradient_1.default, { colors: ['black', 'transparent'], locations: [0.67, 1], start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, style: styles.gradientBackground },
                React.createElement(react_native_1.ScrollView, { style: styles.contentContainer, contentContainerStyle: { flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' } },
                    React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.View, { style: styles.titleContainer },
                            React.createElement(react_native_1.View, { style: styles.navButtonContainer },
                                React.createElement(BackButton_1.BackButton, { title: '', imageSource: images_1.images.backWhite, onPress: this.handleBackPressed }),
                                React.createElement(DismissStackButton_1.DismissStackButton, { handleBackPressed: this.handleDismissPressed })),
                            React.createElement(react_native_1.Image, { source: images_1.images.pdProTitle })),
                        React.createElement(PDText_1.PDText, { style: styles.title }, this.state.screenType),
                        React.createElement(SeparatorLine_1.SeparatorLine, { lineStyles: styles.horizontalPadding }),
                        React.createElement(react_native_1.View, { style: styles.formContainer }, inputs),
                        React.createElement(TextButton_1.TextButton, { text: switchAuthButtonText, onPress: this.handleAuthButtonPressed, containerStyles: [styles.mainAuthButton, { backgroundColor: screenThemeColor }], textStyles: styles.mainAuthButtonText }),
                        React.createElement(react_native_1.Text, { style: styles.forgotPasswordText }, "Forgot your password?")),
                    React.createElement(react_native_1.View, { style: styles.createAccountContainer },
                        React.createElement(react_native_1.Text, { style: styles.noAccountText }, secondaryActionPromptText),
                        React.createElement(TextButton_1.TextButton, { text: secondaryButtonText, onPress: this.handleSwitchAuthButtonPressed, containerStyles: styles.createAccountButton, textStyles: styles.mainAuthButtonText }))))));
    }
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%'
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    gradientBackground: {
        flex: 1,
        height: '100%'
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        flex: 1,
        height: '100%'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 50
    },
    navButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 15
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        paddingBottom: 5
    },
    horizontalPadding: {
        marginHorizontal: 15
    },
    formContainer: {
        marginHorizontal: 15,
        paddingTop: 30
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        marginBottom: 15,
        fontFamily: 'Avenir Next',
        fontSize: 18,
        paddingHorizontal: 5
    },
    inputTitleText: {
        color: 'white',
        fontFamily: 'Avenir Next',
        fontSize: 22,
        fontWeight: '600'
    },
    createAccountContainer: {
        position: 'absolute',
        bottom: 15,
        justifyContent: 'center',
        width: '100%'
    },
    noAccountText: {
        color: 'white',
        fontFamily: 'Avenir Next',
        fontSize: 18,
        fontWeight: '700',
        paddingLeft: 20
    },
    mainAuthButton: {
        paddingHorizontal: 20,
        backgroundColor: '#00c89f',
        borderRadius: 8,
        marginTop: 15
    },
    mainAuthButtonText: {
        color: 'black',
        paddingVertical: 15,
        fontFamily: 'Avenir Next',
        fontSize: 22
    },
    forgotPasswordText: {
        color: '#9b9b9b',
        fontFamily: 'Avenir Next',
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 15,
        fontWeight: '500'
    },
    createAccountButton: {
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 8
    }
});
const mapStateToProps = (_, ownProps) => {
    return {
        navigation: ownProps.navigation
    };
};
exports.AuthenticationScreen = react_redux_1.connect(mapStateToProps)(AuthenticationComponent);
//# sourceMappingURL=AuthenticationScreen.js.map