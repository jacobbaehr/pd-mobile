import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { store } from '~/redux/AppState';
import { App } from '~/App';

const PoolDash: React.FunctionComponent<{}> = () => {
    StatusBar.setBarStyle('dark-content');
    return (
        <Provider store={ store }>
            <App />
        </Provider>
    );
}
AppRegistry.registerComponent('pooldash', () => PoolDash);
