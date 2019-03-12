import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { PDNavFluid } from 'navigator/App';
import { store } from 'redux/AppState';

class PoolDash extends React.Component<{}, {}> {
    static router = PDNavFluid.router;

    render() {
        StatusBar.setBarStyle('default');
        return(
            <Provider store={store} >
                <PDNavFluid />
            </Provider>
        );
    }
}
AppRegistry.registerComponent('PoolDash', () => PoolDash);
