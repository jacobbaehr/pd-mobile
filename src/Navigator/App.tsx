import { StackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { CalculationSettingsScreen } from '../screens/CalculationSettingsScreen';

export const App = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
  Results: { screen: ResultsScreen },
  Settings: { screen: CalculationSettingsScreen }
}) as any;
