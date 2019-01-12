/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { Provider } from 'react-redux'

import { App } from './Navigator/App';
import { store } from './Redux/AppState';


class PoolDash extends React.Component<{}, {}> {
    render() {
        StatusBar.setBarStyle('default');
        
        return(
            <Provider store={store} >
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('PoolDash', () => PoolDash);
