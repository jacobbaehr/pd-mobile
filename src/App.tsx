import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { PDNavStack } from '~/navigator/Navigators';
import { Database } from './repository/Database';
import { RecipeRepo } from './repository/RecipeRepo';
import { DeviceSettingsService } from './services/DeviceSettingsService';
import { DeviceSettings } from './models/DeviceSettings';
import { dispatch } from './redux/AppState';
import { updateDeviceSettings } from '~/redux/deviceSettings/Actions';

export interface AppProps extends DispatchProp<any> { }

export const AppComponent: React.FunctionComponent<AppProps> = () => {

    const [isDatabaseLoaded, setIsDatabaseLoaded] = React.useState(false);
    const [areRecipesPreloaded, setAreRecipesPreloaded] = React.useState(false);
    const [areDeviceSettingsLoaded, setAreDeviceSettingsLoaded] = React.useState(false);

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

    return (isDatabaseLoaded && areRecipesPreloaded && areDeviceSettingsLoaded)
        ? <PDNavStack />
        : <></>;
}

export const App = connect()(AppComponent);
