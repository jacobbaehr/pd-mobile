import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { App } from '~/App';
import { store } from '~/redux/AppState';
import { enableScreens } from 'react-native-screens';

enableScreens();

import { lightTheme, PDThemeContext } from '~/components/PDTheme';

const PoolDash: React.FunctionComponent<{}> = () => {
    React.useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <PDThemeContext.Provider value={lightTheme}>
                    <App />
                </PDThemeContext.Provider>
            </SafeAreaProvider>
        </Provider>
    );
};
AppRegistry.registerComponent('pooldash', () => PoolDash);
