import { StackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { CalculationSettingsScreen } from '../screens/CalculationSettingsScreen';
import { PoolScreen } from '../screens/PoolScreen';

export const App = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
  Results: { screen: ResultsScreen },
  Settings: { screen: CalculationSettingsScreen },
  Pool: { screen: PoolScreen },
}) as any;
