import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect, DispatchProp } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { images } from '~/assets/images';
import { BackButton } from '~/components/buttons/BackButton';
import { DismissStackButton } from '~/components/buttons/DismissStackButton';
import { TextButton } from '~/components/buttons/TextButton';
import { PDText } from '~/components/PDText';
import { SeparatorLine } from '~/components/SeparatorLine';
import { TextInputWithTitle } from '~/components/TextInputWithTitle';
import { User } from '~/models/User';
import { updateValidSubscription } from '~/redux/hasValidSubscription/Actions';
import { updateUserAction } from '~/redux/user/Actions';
import { AppState } from '~/redux/AppState';
import { InAppPurchasesService, PurchaserInfo } from '~/services/InAppPurchasesService';

interface RegistrationVerificationProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'RegistrationVerification'>;
    route: RouteProp<PDNavStackParamList, 'RegistrationVerification'>;
    user: User | null;
}

type RegistrationVerificationCombinedProps = RegistrationVerificationProps & DispatchProp<any>;

interface RegistrationVerificationState {
    confirmationCode: string;
}

class RegistrationVerificationComponent extends
    React.PureComponent<RegistrationVerificationCombinedProps, RegistrationVerificationState> {
    // private cognitoService: CognitoService;

    constructor(props: RegistrationVerificationCombinedProps) {
        super(props);

        this.state = { confirmationCode: '' };

        // this.cognitoService = new CognitoService();
    }

    onConfirmationCodeChanged = (code: string): void => {
        this.setState({ confirmationCode: code });
    }

    handleConfirmationCodeEntered = async (): Promise<void> => {
        const email = this.props.route.params.email;
        // const registrationConfirmed = await this.cognitoService.confirmRegistration(this.state.confirmationCode, email);

        // if (registrationConfirmed) {
        //     // Authenticate user using props.user
        //     const password = this.props.route.params.password;
        //     const authResult = await this.cognitoService.authenticateUser(email, password);
        //     if (authResult) {
        //         const firstNameAttribute = await this.cognitoService.getUserAttribute('given_name', authResult.cognitoUser);
        //         const lastNameAttribute = await this.cognitoService.getUserAttribute('family_name', authResult.cognitoUser);
        //         const name = `${firstNameAttribute.getValue()} ${lastNameAttribute.getValue()}`;

        //         // save session in app state
        //         this.props.dispatch(updateUserAction({
        //             email,
        //             firstName: firstNameAttribute.getValue(),
        //             lastName: lastNameAttribute.getValue(),
        //             auth: {
        //                 cognitoUser: authResult.cognitoUser,
        //                 cognitoSession: authResult.cognitoSession
        //             }
        //         }));

        //         // configure purchase
        //         await InAppPurchasesService.configureInAppPurchasesProvider(authResult.cognitoUser.getUsername(), (info: PurchaserInfo) => {
        //             // handle any changes to purchaserInfo
        //             console.warn('user purchase info updated', info);
        //             if (info.activeEntitlements.length !== 0) {
        //                 this.props.dispatch(updateValidSubscription(true));
        //             }
        //         });

        //         // navigate to confirm purchase
        //         if (this.props.user) {
        //             this.props.navigation.navigate('ConfirmPurchase', {
        //                 user: this.props.user
        //             });
        //         } else {
        //             console.warn('aaahhh no user!!');
        //         }
        //     } else {
        //         // Alert error during registration verification
        //         // resend code
        //     }
        // } else {
        //     // registration not confirmed
        // }
    }

    handleBackPressed = (): void => {
        this.props.navigation.goBack();
    }

    handleDismissPressed = (): void => {
        this.props.navigation.navigate('PoolScreen');
    }

    render() {
        return (
            <SafeAreaView style={ styles.safeAreaContainer } >
                <Image source={ images.blueAuthenticationBackground } resizeMode={ 'cover' } style={ styles.backgroundImage } />
                <LinearGradient
                    colors={ ['black', 'transparent'] }
                    locations={ [0.67, 1] }
                    start={ { x: 0, y: 0 } }
                    end={ { x: 0, y: 1 } }
                    style={ styles.gradientBackground } >
                    <ScrollView style={ styles.container } keyboardShouldPersistTaps={ 'always' }>
                        <View>
                            <View style={ styles.titleContainer }>
                                <View style={ styles.navButtonContainer }>
                                    <BackButton
                                        title={ '' }

                                        onPress={ this.handleBackPressed } />
                                    <DismissStackButton handleBackPressed={ this.handleDismissPressed } />
                                </View>
                                <Image source={ images.pdProTitle } />
                            </View>
                            <PDText style={ styles.title }>{ 'Confirm Account' }</PDText>
                            <SeparatorLine lineStyles={ styles.horizontalPadding } />
                            <View style={ styles.formContainer }>
                                <TextInputWithTitle
                                    autoCorrect={ false }
                                    inputStyles={ { color: '#50b4ff' } }
                                    titleTextStyles={ styles.inputTitleText }
                                    titleText={ 'Confirmation Code' }
                                    onTextChanged={ this.onConfirmationCodeChanged } />
                            </View>
                            <TextButton
                                text={ 'Continue' }
                                onPress={ this.handleConfirmationCodeEntered }
                                containerStyles={ styles.mainAuthButton }
                                textStyles={ styles.mainAuthButtonText } />
                            <Text style={ styles.resendConfirmationCodeText }>Did not receive the confirmation code?</Text>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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

const mapStateToProps = (state: AppState, ownProps: RegistrationVerificationProps): RegistrationVerificationProps => {
    return {
        navigation: ownProps.navigation,
        route: ownProps.route,
        user: state.user
    };
};

export const RegistrationVerificationScreen = connect(mapStateToProps)(RegistrationVerificationComponent);