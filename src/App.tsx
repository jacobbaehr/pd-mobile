/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { PDRootNavigator } from '~/navigator/PDRootNavigator';
import { loadDeviceSettings } from '~/redux/deviceSettings/Actions';

import { ApolloProvider } from '@apollo/react-hooks';

import { DeviceSettings } from './models/DeviceSettings';
import { dispatch } from './redux/AppState';
import { Database } from './repository/Database';
import { RecipeRepo } from './repository/RecipeRepo';
import { DeviceSettingsService } from './services/DeviceSettingsService';
import { getApolloClient } from './services/gql/Client';
import { IAP } from './services/IAP';
import { RecipeService } from './services/RecipeService';

interface AppProps extends DispatchProp<any> {}

export const AppComponent: React.FunctionComponent<AppProps> = () => {
    const [isDatabaseLoaded, setIsDatabaseLoaded] = React.useState(false);
    const [areRecipesPreloaded, setAreRecipesPreloaded] = React.useState(false);
    const [areDeviceSettingsLoaded, setAreDeviceSettingsLoaded] = React.useState(false);

    const apolloClient = getApolloClient();

    React.useEffect(() => {
        Database.prepare().finally(() => {
            setIsDatabaseLoaded(true);
        });
    }, []);
    React.useEffect(() => {
        RecipeRepo.savePreloadedRecipes().finally(() => {
            setAreRecipesPreloaded(true);
        });
    }, []);
    React.useEffect(() => {
        DeviceSettingsService.getSettings().then((settings: DeviceSettings) => {
            dispatch(loadDeviceSettings(settings));
            setAreDeviceSettingsLoaded(true);
        });
    }, []);
    // We don't need to block on this one:
    React.useEffect(() => {
        IAP.configureOnLaunch();
    }, []);

    // Only do this after recipes are preloaded & the database is ready to go
    React.useEffect(() => {
        if (isDatabaseLoaded && areRecipesPreloaded) {
            // Also, update all local recipes... but don't wait on this.
            // NOTE: this is an async operation that we're not await-ing on. This is on purpose.
            // We don't want to block app-start on any network calls
            RecipeService.updateAllLocalRecipes(apolloClient);
        }
    }, [isDatabaseLoaded, areRecipesPreloaded]);

    const isAppReady = isDatabaseLoaded && areRecipesPreloaded && areDeviceSettingsLoaded;
    if (!isAppReady) {
        return <></>;
    }

    return (
        <ApolloProvider client={ apolloClient }>
            <PDRootNavigator />
        </ApolloProvider>
    );
};

export const App = connect()(AppComponent);
