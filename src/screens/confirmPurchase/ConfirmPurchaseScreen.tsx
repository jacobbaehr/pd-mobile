import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationScreenProp } from 'react-navigation';
import { connect, DispatchProp } from 'react-redux';

import { images } from 'assets/images';
import { BackButton } from 'components/buttons/BackButton';
import { DismissStackButton } from 'components/buttons/DismissStackButton';
import { TextButton } from 'components/buttons/TextButton';
import { PDText } from 'components/PDText';
import { SeparatorLine } from 'components/SeparatorLine';
import { User } from 'models/User';
import { AppState } from 'redux/AppState';
import { CognitoService } from 'services/CognitoService';

interface ConfirmPurchaseProps {
    /**  */
    navigation: NavigationScreenProp<any>;
    /** */
    user: User;
}

type ConfirmPurchaseCombinedProps = ConfirmPurchaseProps & DispatchProp<any>;

class ConfirmPurchaseComponent extends React.PureComponent<ConfirmPurchaseCombinedProps> {
    handlePurchaseConfirmed = async (): Promise<void> => {
        // handle purchase confirmation
    }

    handleBackPressed = (): void => {
        this.props.navigation.goBack();
    }

    handleDismissPressed = (): void => {
        this.props.navigation.navigate('PoolScreen');
    }

    render () {
        // key background image off of nav param stating where we are coming from
        const prevScreen = this.props.navigation.getParam('prevScreen');
        const backgroundImage = prevScreen === 'Authentication' ? images.greenAuthenticationBackground : images.blueAuthenticationBackground;
        const screenThemeColor = prevScreen === 'Authentication' ? '#00c89f' : '#50b4ff';

        // get user information
        const email = this.props.navigation.getParam('email');
        const name = this.props.navigation.getParam('name');

        return (
            <View style={styles.container}>
                <Image source={backgroundImage} resizeMode={'cover'} style={styles.backgroundImage}/>
                <LinearGradient
                    colors={['black', 'transparent']}
                    locations={[0.67, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradientBackground} >
                    <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <View>
                            <View style={styles.titleContainer}>
                            <View style={styles.navButtonContainer}>
                                <BackButton title={''} imageSource={images.backWhite} onPress={this.handleBackPressed} />
                                <DismissStackButton handleBackPressed={this.handleDismissPressed}/>
                            </View>
                                <Image source={images.pdProTitle} />
                            </View>
                            <PDText style={styles.title}>Your Account</PDText>
                            <SeparatorLine lineStyles={styles.horizontalPadding} />
                            <View style={styles.accountInfoContainer}>
                                <Text style={styles.accountInfoHeaderText}>Name</Text>
                                <View style={styles.accountDetailsContainer}>
                                    <Text style={[styles.accountInfoDetailsText, { color: screenThemeColor }]}>{name}</Text>
                                </View>
                                <Text style={[styles.accountInfoHeaderText, { marginTop: 10 }]}>Email</Text>
                                <View style={styles.accountDetailsContainer}>
                                    <Text style={[styles.accountInfoDetailsText, { color: screenThemeColor }]}>{email}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Payment Details</Text>
                                <View style={styles.paymentDetailsTextContainer}>
                                    <Text style={styles.paymentDetailsText}>
                                        You will be billed <Text style={{ color: screenThemeColor }}>$10 annually</Text> unless you cancel before the billing period ends.
                                        <Text style={{ color: 'white' }}> Terms</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <TextButton
                            text={'Confirm Purchase'}
                            onPress={this.handlePurchaseConfirmed}
                            containerStyles={styles.confirmPurchaseButton}
                            textStyles={styles.confirmPurchaseButtonText} />
                    </ScrollView>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    accountInfoContainer: {
        marginHorizontal: 15,
        paddingVertical: 30
    },
    accountInfoHeaderText: {
        color: 'white',
        fontFamily: 'Avenir Next',
        fontSize: 22,
        fontWeight: '700'
    },
    accountInfoDetailsText: {
        color: 'white',
        fontFamily: 'Avenir Next',
        fontSize: 20,
        fontWeight: '500'
    },
    accountDetailsContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#9b9b9b'
    },
    paymentDetailsTextContainer: {
        paddingLeft: 15,
        marginTop: 5
    },
    paymentDetailsText: {
        color: '#9b9b9b',
        fontSize: 22,
        fontWeight: '400',
        fontFamily: 'Avenir Next'
    },
    confirmPurchaseButton: {
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 15,
        position: 'absolute',
        bottom: 17,
        width: '100%',
        alignSelf: 'center'
    },
    confirmPurchaseButtonText: {
        color: 'black',
        paddingVertical: 15,
        fontFamily: 'Avenir Next',
        fontSize: 22
    }
});

const mapStateToProps = (appState: AppState, ownProps: ConfirmPurchaseProps): ConfirmPurchaseProps => {
    return {
        navigation: ownProps.navigation,
        user: appState.user
    };
};

export const ConfirmPurchaseScreen = connect(mapStateToProps)(ConfirmPurchaseComponent);