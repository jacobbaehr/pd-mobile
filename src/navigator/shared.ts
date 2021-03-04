import { StackNavigationProp } from '@react-navigation/stack';

import { PDCardNavigatorParams } from './PDCardNavigator';
import { PDRootNavigatorParams } from './PDRootNavigator';
import { PDVolumesParams } from './PDVolumesNavigator';

export type PDNavParams = PDCardNavigatorParams & PDRootNavigatorParams & PDVolumesParams;

export type PDStackNavigationProps = StackNavigationProp<PDNavParams>;
