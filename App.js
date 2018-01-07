/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { TabNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import MapScreen from './app/screens/MapScreen.js';
import CustomModal from './app/screens/CustomModal.js';

const Routes = {
  Map: {
      screen: MapScreen
  },
};

const RootNavigator = TabNavigator(Routes);

export default class App extends Component {
  render() {
    return <RootNavigator />;
  }
}




