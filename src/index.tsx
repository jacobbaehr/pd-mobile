/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './screens/HomeScreen';

export default class TankTracker extends React.Component<object, object> {
  render() {
    return (
      <HomeScreen />
    );
  }
}

AppRegistry.registerComponent('TankTracker', () => TankTracker);
