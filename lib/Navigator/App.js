"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const HomeScreen_1 = require("../screens/HomeScreen");
const DetailsScreen_1 = require("../screens/DetailsScreen");
exports.App = react_navigation_1.StackNavigator({
    Home: { screen: HomeScreen_1.HomeScreen },
    Details: { screen: DetailsScreen_1.DetailsScreen }
});
//# sourceMappingURL=App.js.map