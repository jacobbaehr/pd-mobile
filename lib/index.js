"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const HomeScreen_1 = require("./screens/HomeScreen");
class TankTracker extends React.Component {
    render() {
        return (React.createElement(HomeScreen_1.HomeScreen, null));
    }
}
exports.default = TankTracker;
react_native_1.AppRegistry.registerComponent('TankTracker', () => TankTracker);
//# sourceMappingURL=index.js.map