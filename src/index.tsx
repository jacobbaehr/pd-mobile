import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { App } from '~/App';
import { store } from '~/redux/AppState';

import { ThemeProvider } from '@shopify/restyle';

import theme from './theme';

const PoolDash: React.FunctionComponent<{}> = () => {
    React.useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </SafeAreaProvider>
        </Provider>
    );
};
AppRegistry.registerComponent('pooldash', () => PoolDash);
