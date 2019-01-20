// @ts-ignore: fluid-transitions untyped
import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import { createStackNavigator } from 'react-navigation';
import { InputEntryListScreen } from '../screens/readings/InputEntryListScreen';
import { InputDetailsScreen } from '../screens/readings/InputDetailsScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { RecipeListScreen } from '../screens/recipes/RecipeListScreen';
import { CalculationSettingsScreen } from '../screens/CalculationSettingsScreen';
import { PoolScreen } from '../screens/pool/PoolScreen';
import { EditPoolScreen } from '../screens/EditPoolScreen';
import { PoolListScreen } from '../screens/poolList/PoolListScreen';


const PDNavStack = createStackNavigator({
  PoolScreen: { screen: PoolScreen },
  ReadingList: { screen: InputEntryListScreen }
}, {
  navigationOptions: { header: null }
});

/// Amazingly, this defines the nav options for its PARENT, which is PDNavFluid 🤯
PDNavStack.navigationOptions = ( navigationProp: any ) => {
  const { navigation } = navigationProp;
  const gesturesEnabled = navigation.state.index == 0;
  return { gesturesEnabled }
};

export const PDNavFluid = createFluidNavigator({
    PoolList: { screen: PoolListScreen },
    Details: { screen: InputDetailsScreen },
    Results: { screen: ResultsScreen },
    Settings: { screen: CalculationSettingsScreen },
    EditPool: { screen: EditPoolScreen },
    RecipeList: { screen: RecipeListScreen },
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
