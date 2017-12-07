/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'

import { App } from './Navigator/App';
import { store } from './Redux/AppState';


class TankTracker extends React.Component<{}, {}> {
    render() {
        return(
            <Provider store={store} >
            <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('TankTracker', () => TankTracker);
