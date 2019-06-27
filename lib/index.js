"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const AppState_1 = require("redux/AppState");
const App_1 = require("App");
class PoolDash extends React.Component {
    render() {
        react_native_1.StatusBar.setBarStyle('default');
        return (React.createElement(react_redux_1.Provider, { store: AppState_1.store },
            React.createElement(App_1.App, null)));
    }
}
react_native_1.AppRegistry.registerComponent('PoolDash', () => PoolDash);
//# sourceMappingURL=index.js.map