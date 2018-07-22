import { StackNavigator } from 'react-navigation';
import { InputEntryListScreen } from '../screens/InputEntryListScreen';
import { InputDetailsScreen } from '../screens/InputDetailsScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { RecipeListScreen } from '../screens/Recipes/RecipeListScreen';
import { CalculationSettingsScreen } from '../screens/CalculationSettingsScreen';
import { PoolScreen } from '../screens/PoolScreen';
import { PoolListScreen } from '../screens/PoolList/PoolListScreen';

export const App = StackNavigator({
  PoolList: {
    screen: PoolListScreen,
    navigationOptions: {
      headerTintColor: 'lightgrey',
      headerStyle: { 
        backgroundColor: '#060D16',
        shadowOpacity: 0,
        elevation: 0,
        shadowColor: 'transparent',
      },
    }
  },
  ReadingList: { screen: InputEntryListScreen },
  Details: { screen: InputDetailsScreen },
  Results: { screen: ResultsScreen },
  Settings: { screen: CalculationSettingsScreen },
  Pool: { 
    screen: PoolScreen,
    navigationOptions: {
      headerTintColor: 'lightgrey',
      headerStyle: { 
        backgroundColor: '#060D16',
        shadowOpacity: 0,
        elevation: 0,
        shadowColor: 'transparent',
      },
    }
  },
  RecipeList: { screen: RecipeListScreen }
});
