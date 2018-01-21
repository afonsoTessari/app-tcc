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
  Button,
  StatusBar
} from 'react-native';

import { TabNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import MapScreen from './app/screens/MapScreen.js';
import CustomModal from './app/screens/CustomModal.js';
import HomeScreen from './app/screens/HomeScreen.js';

//import Routes from './src/Routes';

const Routes = {
  Map: {
    screen: MapScreen
  },
  Login: {
    screen: HomeScreen
  },
};

const RootNavigator = TabNavigator(Routes);

export default class App extends Component {
  render() {
    return <RootNavigator />;
  }
}




