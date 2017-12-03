import { StackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';

export const App = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen }
}) as any;
