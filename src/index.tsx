import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { App } from '~/App';
import { lightTheme, PDThemeContext } from '~/components/PDTheme';
import { ShapeProvider } from '~/hooks/useVolumeEstimator';
import { store } from '~/redux/AppState';

enableScreens();

const PoolDash: React.FunctionComponent<{}> = () => {
    React.useEffect(() => {
        StatusBar.setBarStyle('dark-content');
    }, []);
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <PDThemeContext.Provider value={lightTheme}>
                    <ShapeProvider>
                        <App />
                    </ShapeProvider>
                </PDThemeContext.Provider>
            </SafeAreaProvider>
        </Provider>
    );
};
AppRegistry.registerComponent('pooldash', () => PoolDash);
