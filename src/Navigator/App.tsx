import { StackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';

export const App = StackNavigator({
  Home: { screen: HomeScreen },
}) as any;
