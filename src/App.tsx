import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';

import { PDNavStack } from '~/navigator/Navigators';
import { Database } from './repository/Database';
import { RecipeRepo } from './repository/RecipeRepo';
import { DeviceSettingsService } from './services/DeviceSettingsService';
import { DeviceSettings } from './models/DeviceSettings';
import { dispatch } from './redux/AppState';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';
import { getApolloClient } from './services/gql/Client';
import { IAP } from './services/IAP';
import { RecipeService } from './services/RecipeService';


interface AppProps extends DispatchProp<any> { }

export const AppComponent: React.FunctionComponent<AppProps> = () => {
    const [isDatabaseLoaded, setIsDatabaseLoaded] = React.useState(false);
    const [areRecipesPreloaded, setAreRecipesPreloaded] = React.useState(false);
    const [areDeviceSettingsLoaded, setAreDeviceSettingsLoaded] = React.useState(false);

    const apolloClient = getApolloClient();

    React.useEffect(() => {
        Database.prepare().finally(() => {
            setIsDatabaseLoaded(true);
            tryUpdatingLocalRecipes();
        });
    }, []);
    React.useEffect(() => {
        RecipeRepo.savePreloadedRecipes().finally(() => {
            setAreRecipesPreloaded(true);
            tryUpdatingLocalRecipes();
        });
    }, []);
    React.useEffect(() => {
        DeviceSettingsService.getSettings().then((settings: DeviceSettings) => {
            dispatch(updateDeviceSettings(settings));
            setAreDeviceSettingsLoaded(true);
        });
    }, []);
    // We don't need to block on this one:
    React.useEffect(() => {
        IAP.configureOnLaunch();
    }, []);

    const tryUpdatingLocalRecipes = () => {
        if (isDatabaseLoaded && areRecipesPreloaded) {
            // Also, update all local recipes... but don't wait on this.
            // NOTE: this is an async operation that we're not await-ing on. This is on purpose.
            // We don't want to block app-start on any network calls
            RecipeService.updateAllLocalRecipes(apolloClient);
        }
    }

    const isAppReady = isDatabaseLoaded && areRecipesPreloaded && areDeviceSettingsLoaded;
    if (!isAppReady) {
        return <></>;
    }

    return (
        <ApolloProvider client={ apolloClient }>
            <PDNavStack />
        </ApolloProvider>
    );
}

export const App = connect()(AppComponent);
