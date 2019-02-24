import { createStackNavigator } from 'react-navigation';
// @ts-ignore: fluid-transitions untyped
import { createFluidNavigator } from 'react-navigation-fluid-transitions';

import { CalculationSettingsScreen } from 'screens/CalculationSettingsScreen';
import { EditPoolScreen } from 'screens/EditPoolScreen';
import { PoolScreen } from 'screens/pool/PoolScreen';
import { PoolHistoryScreen } from 'screens/poolHistory/PoolHistoryScreen';
import { PoolListScreen } from 'screens/poolList/PoolListScreen';
import { InputDetailsScreen } from 'screens/readings/InputDetailsScreen';
import { InputEntryListScreen } from 'screens/readings/InputEntryListScreen';
import { RecipeListScreen } from 'screens/recipes/RecipeListScreen';
import { ResultsScreen } from 'screens/ResultsScreen';


const PDNavStack = createStackNavigator({
  PoolScreen: { screen: PoolScreen },
  ReadingList: { screen: InputEntryListScreen },
  Details: { screen: InputDetailsScreen },
  Results: { screen: ResultsScreen },
  Settings: { screen: CalculationSettingsScreen },
  EditPool: { screen: EditPoolScreen },
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

export const PDNavFluid = createFluidNavigator({
  PoolList: { screen: PoolListScreen },
  PoolScreen: PDNavStack
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
