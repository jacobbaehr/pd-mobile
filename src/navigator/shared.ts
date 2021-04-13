import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { PDCardNavigatorParams } from './PDCardNavigator';
import { PDPoolParams } from './PDPoolNavigator';
import { PDRootNavigatorParams } from './PDRootNavigator';

export type PDNavParams = PDCardNavigatorParams & PDRootNavigatorParams;

export type PDStackNavigationProps = StackNavigationProp<PDNavParams>;
export type PDPoolNavigationProps = StackNavigationProp<PDPoolParams>

export type EstimateRoute = RouteProp<PDPoolParams, 'EntryShape'>;

//TODO: Researching better typing way to Composite Navigation
// export type PDComposerNavigation<T extends keyof PDPoolParams> = CompositeNavigationProp<StackNavigationProp<PDNavParams, 'PDPoolNavigator'>, StackNavigationProp<, T>
// >




