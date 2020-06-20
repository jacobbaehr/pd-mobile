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


interface AppProps extends DispatchProp<any> { }

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
    }, [])
    React.useEffect(() => {
        DeviceSettingsService.getSettings().then((settings: DeviceSettings) => {
            dispatch(updateDeviceSettings(settings));
            setAreDeviceSettingsLoaded(true);
        });
    }, []);

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
