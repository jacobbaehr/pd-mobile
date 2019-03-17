import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { store } from 'redux/AppState';
import { App } from 'App';

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
