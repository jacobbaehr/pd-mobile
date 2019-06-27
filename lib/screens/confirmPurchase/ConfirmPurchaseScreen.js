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
const react_native_config_1 = require("react-native-config");
const react_native_linear_gradient_1 = require("react-native-linear-gradient");
const react_native_purchases_1 = require("react-native-purchases");
const react_redux_1 = require("react-redux");
const images_1 = require("assets/images");
const BackButton_1 = require("components/buttons/BackButton");
const DismissStackButton_1 = require("components/buttons/DismissStackButton");
const TextButton_1 = require("components/buttons/TextButton");
const PDText_1 = require("components/PDText");
const SeparatorLine_1 = require("components/SeparatorLine");
const Actions_1 = require("redux/hasValidSubscription/Actions");
class ConfirmPurchaseComponent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handlePurchaseConfirmed = () => __awaiter(this, void 0, void 0, function* () {
            console.warn('attempting to make purchase');
            try {
                const entitlements = yield react_native_purchases_1.default.getEntitlements();
                console.warn('entitlements - ', entitlements);
                const products = yield react_native_purchases_1.default.getProducts([react_native_config_1.default.PRO_SUBSCRIPTION_PRODUCT_ID]);
                console.warn('product', products);
                const purchaseMade = yield react_native_purchases_1.default.makePurchase(react_native_config_1.default.PRO_SUBSCRIPTION_PRODUCT_ID);
                if (purchaseMade.purchaserInfo.activeEntitlements !== 'undefined' &&
                    purchaseMade.purchaserInfo.activeEntitlements.includes(react_native_config_1.default.PRO_SUBSCRIPTION_ENTITLEMENT_IDENTIFIER)) {
                    console.warn('Purchase successful! purchase made - ', purchaseMade);
                    // update redux state with purchase made
                    this.props.dispatch(Actions_1.updateValidSubscription(true));
                }
            }
            catch (e) {
                console.warn('purchase error - ', e);
                if (e.code === 2 && e.domain === 'SKErrorDomain' && e.userCancelled) {
                    // Already subscribed
                    // exit confirm purchase
                    this.props.dispatch(Actions_1.updateValidSubscription(true));
                }
                else if (e.code === 0 && e.domain === 'SKErrorDomain' && !e.userCancelled) {
                    // no network connection
                    react_native_1.Alert.alert('Unable to complete transaction at this time.');
                    this.props.dispatch(Actions_1.updateValidSubscription(false));
                }
                else {
                    this.props.dispatch(Actions_1.updateValidSubscription(false));
                    react_native_1.Alert.alert('Unable to complete transaction at this time.');
                }
            }
            // save purchased in persistent storage
            this.props.navigation.navigate('PoolScreen');
        });
        this.handleBackPressed = () => {
            this.props.navigation.goBack();
        };
        this.handleDismissPressed = () => {
            this.props.navigation.navigate('PoolScreen');
        };
    }
    render() {
        // key background image off of nav param stating where we are coming from
        const prevScreen = this.props.navigation.getParam('prevScreen');
        const backgroundImage = prevScreen === 'Authentication' ? images_1.images.greenAuthenticationBackground : images_1.images.blueAuthenticationBackground;
        const screenThemeColor = prevScreen === 'Authentication' ? '#00c89f' : '#50b4ff';
        // get user information
        const email = this.props.navigation.getParam('email');
        const name = this.props.navigation.getParam('name');
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
                        React.createElement(PDText_1.PDText, { style: styles.title }, "Your Account"),
                        React.createElement(SeparatorLine_1.SeparatorLine, { lineStyles: styles.horizontalPadding }),
                        React.createElement(react_native_1.View, { style: styles.accountInfoContainer },
                            React.createElement(react_native_1.Text, { style: styles.accountInfoHeaderText }, "Name"),
                            React.createElement(react_native_1.View, { style: styles.accountDetailsContainer },
                                React.createElement(react_native_1.Text, { style: [styles.accountInfoDetailsText, { color: screenThemeColor }] }, name)),
                            React.createElement(react_native_1.Text, { style: [styles.accountInfoHeaderText, { marginTop: 10 }] }, "Email"),
                            React.createElement(react_native_1.View, { style: styles.accountDetailsContainer },
                                React.createElement(react_native_1.Text, { style: [styles.accountInfoDetailsText, { color: screenThemeColor }] }, email))),
                        React.createElement(react_native_1.View, null,
                            React.createElement(react_native_1.Text, { style: styles.title }, "Payment Details"),
                            React.createElement(react_native_1.View, { style: styles.paymentDetailsTextContainer },
                                React.createElement(react_native_1.Text, { style: styles.paymentDetailsText },
                                    "You will be billed ",
                                    React.createElement(react_native_1.Text, { style: { color: screenThemeColor } }, "$10 annually"),
                                    " unless you cancel before the billing period ends.",
                                    React.createElement(react_native_1.Text, { style: { color: 'white' } }, " Terms"))))),
                    React.createElement(TextButton_1.TextButton, { text: 'Confirm Purchase', onPress: this.handlePurchaseConfirmed, containerStyles: styles.confirmPurchaseButton, textStyles: styles.confirmPurchaseButtonText })))));
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
const mapStateToProps = (appState, ownProps) => {
    return {
        navigation: ownProps.navigation,
        user: appState.user
    };
};
exports.ConfirmPurchaseScreen = react_redux_1.connect(mapStateToProps)(ConfirmPurchaseComponent);
//# sourceMappingURL=ConfirmPurchaseScreen.js.map