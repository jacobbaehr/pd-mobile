import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { PDCardNavigatorParams } from './PDCardNavigator';
import { PDPoolParams } from './EditPoolNavigator';
import { PDRootNavigatorParams } from './PDRootNavigator';

export type PDNavParams = PDCardNavigatorParams & PDRootNavigatorParams & PDPoolParams;

export type PDStackNavigationProps = StackNavigationProp<PDNavParams>;
// export type PDPoolNavigationProps = StackNavigationProp<PDPoolParams>

export type EstimateRoute = RouteProp<PDPoolParams, 'EntryShape'>;

