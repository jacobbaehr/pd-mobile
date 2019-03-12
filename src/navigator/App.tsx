import { createStackNavigator } from 'react-navigation';
// @ts-ignore: fluid-transitions untyped
import { createFluidNavigator } from 'react-navigation-fluid-transitions';

import { PoolScreen } from 'screens/pool/PoolScreen';
import { PoolHistoryScreen } from 'screens/poolHistory/PoolHistoryScreen';
import { PoolListScreen } from 'screens/poolList/PoolListScreen';
import { ReadingDetailsScreen } from 'screens/readings/ReadingDetailsScreen';
import { ReadingListScreen } from 'screens/readings/ReadingListScreen';
import { RecipeListScreen } from 'screens/recipes/RecipeListScreen';
import { ResultsScreen } from 'screens/results/ResultsScreen';
import { AuthenticationScreen } from 'screens/AuthenticationScreen';
import { CalculationSettingsScreen } from 'screens/CalculationSettingsScreen';
import { EditPoolScreen } from 'screens/EditPoolScreen';
import { RegistrationVerificationScreen } from 'screens/RegistrationVerificationScreen';

const PDNavStack = createStackNavigator({
  // PoolList: { screen: PoolListScreen },
  PoolScreen: { screen: PoolScreen },
  EditPool: { screen: EditPoolScreen},
  ReadingList: { screen: ReadingListScreen },
  Details: { screen: ReadingDetailsScreen },
  Results: { screen: ResultsScreen },
  Settings: { screen: CalculationSettingsScreen },
  RecipeList: { screen: RecipeListScreen },
  PoolHistory: { screen: PoolHistoryScreen }
}, {
    navigationOptions: { header: null }
  });

/// Amazingly, this defines the nav options for its PARENT, which is PDNavFluid 🤯
PDNavStack.navigationOptions = (navigationProp: any) => {
  const { navigation } = navigationProp;
  const gesturesEnabled = navigation.state.index === 0;
  return { gesturesEnabled };
};

const PDAuthenticationStack = createStackNavigator({
  Authentication: { screen: AuthenticationScreen },
  RegistrationVerification: { screen: RegistrationVerificationScreen }
}, {
  headerMode: 'none'
});

export const PDNavFluid = createFluidNavigator({
    PoolList: { screen: PoolListScreen },
    PoolScreen: PDNavStack,
    CreatePool: { screen: EditPoolScreen },
    Authentication: PDAuthenticationStack
  },
  {
    navigationOptions: {
      gesturesEnabled: true,
      gestureResponseDistance: { vertical: 250 }
    },
    transitionConfig: {
      duration: 400
      // TODO: figure out a good easing function
      // easing: Easing.elastic(2)
    }
  });
