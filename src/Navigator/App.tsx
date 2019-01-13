import { StackNavigator } from 'react-navigation';
import { InputEntryListScreen } from '../screens/InputEntryListScreen';
import { InputDetailsScreen } from '../screens/InputDetailsScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { RecipeListScreen } from '../screens/recipes/RecipeListScreen';
import { CalculationSettingsScreen } from '../screens/CalculationSettingsScreen';
import { PoolScreen } from '../screens/PoolScreen';
import { PoolListScreen } from '../screens/poolList/PoolListScreen';

export const App = StackNavigator({
  PoolList: {
    screen: PoolListScreen,
    navigationOptions: {
      headerVisible: false,
      header: null
    }
  },
  ReadingList: { screen: InputEntryListScreen },
  Details: { screen: InputDetailsScreen },
  Results: { screen: ResultsScreen },
  Settings: { screen: CalculationSettingsScreen },
  Pool: { screen: PoolScreen },
  RecipeList: { screen: RecipeListScreen }
});
