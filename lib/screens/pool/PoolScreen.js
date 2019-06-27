"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
// @ts-ignore
const react_navigation_fluid_transitions_1 = require("react-navigation-fluid-transitions");
const react_redux_1 = require("react-redux");
const images_1 = require("assets/images");
const Button_1 = require("components/buttons/Button");
const GradientButton_1 = require("components/buttons/GradientButton");
const ChartCard_1 = require("components/charts/ChartCard");
const PDText_1 = require("components/PDText");
const PoolHeaderView_1 = require("./PoolHeaderView");
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool,
        poolsLastUpdated: state.poolsLastUpdated,
        user: state.user,
        hasValidSubscription: state.hasValidSubscription
    };
};
class PoolScreenComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.isDismissingFromScroll = false;
        this.handleBackPressed = () => {
            this.props.navigation.dispatch(react_navigation_1.NavigationActions.back());
        };
        this.handleStartServicePressed = () => {
            this.props.navigation.navigate('ReadingList');
        };
        this.handleViewHistoryPressed = () => {
            this.props.navigation.navigate('PoolHistory');
        };
        this.handleEditButtonPressed = () => {
            this.props.navigation.navigate('EditPool');
        };
        this.handleChangeRecipeButtonPressed = () => {
            this.props.navigation.navigate('RecipeList');
        };
        this.handleScroll = (event) => {
            console.log(event.nativeEvent.contentOffset.y);
            if (this.isDismissingFromScroll) {
                return;
            }
            if (event.nativeEvent.contentOffset.y < -50) {
                this.isDismissingFromScroll = true;
                this.props.navigation.popToTop();
            }
        };
        this.handleGetProPressed = () => {
            if (this.props.hasValidSubscription) {
                // Alert subscription already active
                react_native_1.Alert.alert('Subscription already active!');
                return;
            }
            if (!this.props.user) {
                this.props.navigation.navigate('PurchasePro', { screenType: 'Register' });
            }
            else {
                const { email, firstName, lastName } = this.props.user;
                this.props.navigation.navigate('ConfirmPurchase', {
                    email,
                    name: `${firstName} ${lastName}`
                });
            }
        };
    }
    render() {
        const dateRanges = ['24H', '7D', '1M', '3M', '1Y', 'ALL'];
        const timestamps = [4, 5, 6]; // TODO: remove
        const values = [1000, 4000, 5000];
        const vm = {
            timestamps,
            values,
            title: 'Chlorine',
            masterId: 'a9sd8f093'
        };
        return (React.createElement(react_navigation_1.SafeAreaView, { style: { flex: 1, backgroundColor: '#2091F9' }, forceInset: { bottom: 'never' } },
            React.createElement(react_native_1.ScrollView, { onScroll: this.handleScroll, scrollEventThrottle: 2, style: styles.scrollView },
                React.createElement(PoolHeaderView_1.PoolHeaderView, { pool: this.props.selectedPool, style: styles.header, handlePressedEdit: this.handleEditButtonPressed, handlePressedBack: this.handleBackPressed }),
                React.createElement(react_native_1.View, { style: styles.container },
                    React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'left' },
                        React.createElement(PDText_1.PDText, { style: [styles.sectionTitle, styles.topSectionTitle] }, "Service")),
                    React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'right' },
                        React.createElement(react_native_1.View, null,
                            React.createElement(GradientButton_1.GradientButton, { onPress: this.handleStartServicePressed, title: 'Start Service' }),
                            React.createElement(PDText_1.PDText, { style: styles.lastServiceLabel }, "Last Serviced: 20 days ago"))),
                    React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'left' },
                        React.createElement(PDText_1.PDText, { style: styles.sectionTitle }, "Recipe")),
                    React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'right' },
                        React.createElement(react_native_1.View, null,
                            React.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                                React.createElement(react_native_1.Image, { style: styles.overviewHistoryIcon, source: images_1.images.history, width: 20, height: 18 }),
                                React.createElement(PDText_1.PDText, { style: styles.recipeName }, "Big 3 + Salt")),
                            React.createElement(Button_1.Button, { styles: styles.recipeChangeButton, textStyles: styles.recipeChangeButtonText, title: 'change', onPress: this.handleChangeRecipeButtonPressed }))),
                    React.createElement(react_native_1.View, { style: { flex: 1 } },
                        React.createElement(PDText_1.PDText, { style: styles.sectionTitle }, "History"),
                        React.createElement(ChartCard_1.ChartCard, { viewModel: vm },
                            React.createElement(react_native_1.TouchableHighlight, { onPress: this.handleViewHistoryPressed, style: styles.historyButton },
                                React.createElement(react_native_1.Text, { style: styles.viewMoreHistoryText }, "View More")))),
                    React.createElement(react_navigation_fluid_transitions_1.Transition, { appear: 'left' },
                        React.createElement(react_native_1.View, { style: { flex: 1 } },
                            React.createElement(PDText_1.PDText, { style: styles.sectionTitle }, "Online Backup"),
                            React.createElement(react_native_1.View, { style: styles.onlineBackupContainer },
                                React.createElement(react_native_1.Image, { style: styles.pdProImageStyles, source: images_1.images.pdProTitle }),
                                React.createElement(react_native_1.Text, { style: styles.onlineBackupText }, "Get PoolDash Pro and never have to worry about dropping your phone in the pool again!"),
                                React.createElement(GradientButton_1.GradientButton, { title: 'Get PoolDash Pro', onPress: this.handleGetProPressed, gradientStart: '#fc6076', gradientEnd: '#ff9944' }))))))));
    }
}
exports.PoolScreen = react_redux_1.connect(mapStateToProps)(PoolScreenComponent);
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 20,
        paddingBottom: 200,
        marginBottom: -180
    },
    scrollView: {
        backgroundColor: '#2091F9'
    },
    header: {
        height: 210,
        backgroundColor: '#2091F9'
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 28,
        marginTop: 20,
        marginBottom: 4
    },
    topSectionTitle: {
        marginTop: 14
    },
    lastServiceLabel: {
        color: '#737373',
        fontWeight: '600',
        fontSize: 16
    },
    recipeName: {
        fontSize: 22,
        fontWeight: '600',
        color: 'black',
        marginLeft: 8
    },
    recipeChangeButton: {
        backgroundColor: 'transparent',
        flex: 0
    },
    recipeChangeButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'blue',
        textDecorationLine: 'underline',
        marginLeft: 8
    },
    overviewWaterIcon: {
        marginTop: 7
    },
    overviewHistoryIcon: {
        marginTop: 5
    },
    historyButton: {
        backgroundColor: 'black',
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 15
    },
    viewMoreHistoryText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
        paddingVertical: 10,
        textAlign: 'center',
        fontFamily: 'Avenir Next'
    },
    onlineBackupContainer: {
        backgroundColor: 'black',
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        paddingVertical: 10,
        flex: 1,
        borderRadius: 8,
        paddingBottom: 10,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    pdProImageStyles: {
        marginBottom: 10
    },
    onlineBackupText: {
        color: '#9b9b9b',
        fontWeight: '400',
        fontSize: 20,
        textAlign: 'center'
    }
});
//# sourceMappingURL=PoolScreen.js.map