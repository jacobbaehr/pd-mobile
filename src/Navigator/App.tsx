import { StackNavigator } from 'react-navigation';
import { ReadingListScreen } from '../screens/ReadingListScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { CalculationSettingsScreen } from '../screens/CalculationSettingsScreen';
import { PoolScreen } from '../screens/PoolScreen';
import { PoolListScreen } from '../screens/PoolList/PoolListScreen';

export const App = StackNavigator({
  PoolList: { screen: PoolListScreen },
  ReadingList: { screen: ReadingListScreen },
  Details: { screen: DetailsScreen },
  Results: { screen: ResultsScreen },
  Settings: { screen: CalculationSettingsScreen },
  Pool: { screen: PoolScreen }
});
