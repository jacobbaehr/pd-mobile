import { StackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { ResultsScreen } from '../screens/ResultsScreen';

export const App = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
  Results: { screen: ResultsScreen }
}) as any;
