import { createStackNavigator, createAppContainer } from 'react-navigation';

import { ConfirmPurchaseScreen } from 'screens/confirmPurchase/ConfirmPurchaseScreen';
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

const PurchaseProStack = createStackNavigator({
  Authentication: { screen: AuthenticationScreen },
  RegistrationVerification: { screen: RegistrationVerificationScreen },
  ConfirmPurchase: { screen: ConfirmPurchaseScreen }
}, {
  headerMode: 'none'
});

const PDNavStack = createStackNavigator({
  PoolList: { screen: PoolListScreen },
  CreatePool: { screen: EditPoolScreen },
  PurchasePro: PurchaseProStack,
  PoolScreen: { screen: PoolScreen },
  EditPool: { screen: EditPoolScreen},
  ReadingList: { screen: ReadingListScreen },
  Details: { screen: ReadingDetailsScreen },
  Results: { screen: ResultsScreen },
  Settings: { screen: CalculationSettingsScreen },
  RecipeList: { screen: RecipeListScreen },
  PoolHistory: { screen: PoolHistoryScreen }
}, {
    defaultNavigationOptions: { header: null }
  });

export const PDNav = createAppContainer(PDNavStack);