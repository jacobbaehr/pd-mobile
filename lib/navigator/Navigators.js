"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
// @ts-ignore: fluid-transitions untyped
const react_navigation_fluid_transitions_1 = require("react-navigation-fluid-transitions");
const ConfirmPurchaseScreen_1 = require("screens/confirmPurchase/ConfirmPurchaseScreen");
const PoolScreen_1 = require("screens/pool/PoolScreen");
const PoolHistoryScreen_1 = require("screens/poolHistory/PoolHistoryScreen");
const PoolListScreen_1 = require("screens/poolList/PoolListScreen");
const ReadingDetailsScreen_1 = require("screens/readings/ReadingDetailsScreen");
const ReadingListScreen_1 = require("screens/readings/ReadingListScreen");
const RecipeListScreen_1 = require("screens/recipes/RecipeListScreen");
const ResultsScreen_1 = require("screens/results/ResultsScreen");
const AuthenticationScreen_1 = require("screens/AuthenticationScreen");
const CalculationSettingsScreen_1 = require("screens/CalculationSettingsScreen");
const EditPoolScreen_1 = require("screens/EditPoolScreen");
const RegistrationVerificationScreen_1 = require("screens/RegistrationVerificationScreen");
const PDNavStack = react_navigation_1.createStackNavigator({
    // PoolList: { screen: PoolListScreen },
    PoolScreen: { screen: PoolScreen_1.PoolScreen },
    EditPool: { screen: EditPoolScreen_1.EditPoolScreen },
    ReadingList: { screen: ReadingListScreen_1.ReadingListScreen },
    Details: { screen: ReadingDetailsScreen_1.ReadingDetailsScreen },
    Results: { screen: ResultsScreen_1.ResultsScreen },
    Settings: { screen: CalculationSettingsScreen_1.CalculationSettingsScreen },
    RecipeList: { screen: RecipeListScreen_1.RecipeListScreen },
    PoolHistory: { screen: PoolHistoryScreen_1.PoolHistoryScreen }
}, {
    navigationOptions: { header: null }
});
/// Amazingly, this defines the nav options for its PARENT, which is PDNavFluid 🤯
PDNavStack.navigationOptions = (navigationProp) => {
    const { navigation } = navigationProp;
    const gesturesEnabled = navigation.state.index === 0;
    return { gesturesEnabled };
};
const PurchaseProStack = react_navigation_1.createStackNavigator({
    Authentication: { screen: AuthenticationScreen_1.AuthenticationScreen },
    RegistrationVerification: { screen: RegistrationVerificationScreen_1.RegistrationVerificationScreen },
    ConfirmPurchase: { screen: ConfirmPurchaseScreen_1.ConfirmPurchaseScreen }
}, {
    headerMode: 'none'
});
const PDNavFluid = react_navigation_fluid_transitions_1.createFluidNavigator({
    PoolList: { screen: PoolListScreen_1.PoolListScreen },
    PoolScreen: PDNavStack,
    CreatePool: { screen: EditPoolScreen_1.EditPoolScreen },
    PurchasePro: PurchaseProStack
}, {
    navigationOptions: {
    // gesturesEnabled: true,
    // gestureResponseDistance: { vertical: 250 }
    },
    transitionConfig: () => {
        return { transitionSpec: { duration: 250 } };
        // TODO: figure out a good easing function
        // easing: Easing.elastic(2)
    }
});
exports.PDNav = react_navigation_1.createAppContainer(PDNavFluid);
//# sourceMappingURL=Navigators.js.map