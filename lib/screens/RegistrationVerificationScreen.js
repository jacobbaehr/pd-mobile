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
const react_navigation_1 = require("react-navigation");
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
class RegistrationVerificationComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onConfirmationCodeChanged = (code) => {
            this.setState({ confirmationCode: code });
        };
        this.handleConfirmationCodeEntered = () => __awaiter(this, void 0, void 0, function* () {
            const email = this.props.navigation.getParam('email');
            const registrationConfirmed = yield this.cognitoService.confirmRegistration(this.state.confirmationCode, email);
            if (registrationConfirmed) {
                // Authenticate user using props.user
                const password = this.props.navigation.getParam('password');
                const authResult = yield this.cognitoService.authenticateUser(email, password);
                if (authResult) {
                    const firstNameAttribute = yield this.cognitoService.getUserAttribute('given_name', authResult.cognitoUser);
                    const lastNameAttribute = yield this.cognitoService.getUserAttribute('family_name', authResult.cognitoUser);
                    const name = `${firstNameAttribute.getValue()} ${lastNameAttribute.getValue()}`;
                    // save session in app state
                    this.props.dispatch(Actions_2.updateUserAction({
                        email,
                        firstName: firstNameAttribute.getValue(),
                        lastName: lastNameAttribute.getValue(),
                        auth: {
                            cognitoUser: authResult.cognitoUser,
                            cognitoSession: authResult.cognitoSession
                        }
                    }));
                    // configure purchase
                    yield InAppPurchasesService_1.InAppPurchasesService.configureInAppPurchasesProvider(authResult.cognitoUser.getUsername(), (info) => {
                        // handle any changes to purchaserInfo
                        console.warn('user purchase info updated', info);
                        if (info.activeEntitlements.length !== 0) {
                            this.props.dispatch(Actions_1.updateValidSubscription(true));
                        }
                    });
                    // navigate to confirm purchase
                    this.props.navigation.navigate('ConfirmPurchase', {
                        prevScreen: 'RegistrationVerification',
                        email,
                        name
                    });
                }
                else {
                    // Alert error during registration verification
                    // resend code
                }
            }
            else {
                // registration not confirmed
            }
        });
        this.handleBackPressed = () => {
            this.props.navigation.goBack();
        };
        this.handleDismissPressed = () => {
            this.props.navigation.navigate('PoolScreen');
        };
        this.state = { confirmationCode: '' };
        this.cognitoService = new CognitoService_1.CognitoService();
    }
    render() {
        return (React.createElement(react_navigation_1.SafeAreaView, { style: styles.safeAreaContainer, forceInset: { bottom: 'never', top: 'never' } },
            React.createElement(react_native_1.Image, { source: images_1.images.blueAuthenticationBackground, resizeMode: 'cover', style: styles.backgroundImage }),
            React.createElement(react_native_linear_gradient_1.default, { colors: ['black', 'transparent'], locations: [0.67, 1], start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, style: styles.gradientBackground },
                React.createElement(react_native_1.ScrollView, { style: styles.container, keyboardShouldPersistTaps: 'always' },
                    React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.View, { style: styles.titleContainer },
                            React.createElement(react_native_1.View, { style: styles.navButtonContainer },
                                React.createElement(BackButton_1.BackButton, { title: '', imageSource: images_1.images.backWhite, onPress: this.handleBackPressed }),
                                React.createElement(DismissStackButton_1.DismissStackButton, { handleBackPressed: this.handleDismissPressed })),
                            React.createElement(react_native_1.Image, { source: images_1.images.pdProTitle })),
                        React.createElement(PDText_1.PDText, { style: styles.title }, 'Confirm Account'),
                        React.createElement(SeparatorLine_1.SeparatorLine, { lineStyles: styles.horizontalPadding }),
                        React.createElement(react_native_1.View, { style: styles.formContainer },
                            React.createElement(TextInputWithTitle_1.TextInputWithTitle, { autoCorrect: false, inputStyles: { color: '#50b4ff' }, titleTextStyles: styles.inputTitleText, titleText: 'Confirmation Code', onTextChanged: this.onConfirmationCodeChanged })),
                        React.createElement(TextButton_1.TextButton, { text: 'Continue', onPress: this.handleConfirmationCodeEntered, containerStyles: styles.mainAuthButton, textStyles: styles.mainAuthButtonText }),
                        React.createElement(react_native_1.Text, { style: styles.resendConfirmationCodeText }, "Did not receive the confirmation code?"))))));
    }
}
const styles = react_native_1.StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    container: {
        paddingTop: 30,
        paddingHorizontal: 20,
        width: '100%'
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
        paddingBottom: 5,
        fontFamily: 'Avenir Next'
    },
    horizontalPadding: {
        marginHorizontal: 15
    },
    formContainer: {
        marginHorizontal: 15,
        paddingTop: 30
    },
    inputTitleText: {
        color: 'white',
        fontFamily: 'Avenir Next',
        fontSize: 22,
        fontWeight: '600'
    },
    mainAuthButton: {
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 15
    },
    mainAuthButtonText: {
        color: 'black',
        paddingVertical: 15,
        fontFamily: 'Avenir Next',
        fontSize: 22
    },
    resendConfirmationCodeText: {
        color: '#9b9b9b',
        fontFamily: 'Avenir Next',
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 15,
        fontWeight: '500'
    },
});
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        user: state.user
    };
};
exports.RegistrationVerificationScreen = react_redux_1.connect(mapStateToProps)(RegistrationVerificationComponent);
//# sourceMappingURL=RegistrationVerificationScreen.js.map