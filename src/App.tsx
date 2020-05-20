import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { PDNavStack } from '~/navigator/Navigators';
import { Database } from './repository/Database';
import { RecipeRepo } from './repository/RecipeRepo';

export interface AppProps extends DispatchProp<any> { }

export const AppComponent: React.FunctionComponent<AppProps> = () => {

    const [isDatabaseLoaded, setIsDatabaseLoaded] = React.useState(false);
    const [areRecipesPreloaded, setAreRecipesPreloaded] = React.useState(false);
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

    return (isDatabaseLoaded && areRecipesPreloaded)
        ? <PDNavStack />
        : <></>;
}

export const App = connect()(AppComponent);
