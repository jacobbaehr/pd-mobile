import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from '~/redux/AppState';
import { App } from '~/App';

const PoolDash: React.FunctionComponent<{}> = () => {
    React.useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
        </Provider>
    );
};
AppRegistry.registerComponent('pooldash', () => PoolDash);
