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
import Login from './app/screens/Login.js';


const Routes = {
  Login: {
    screen: Login
  },
  MapScreen: {
    screen: MapScreen
  },
  
};

const RootNavigator = StackNavigator(Routes, {
    headerMode:'none'
});

export default class App extends Component {
  render() {
    return <RootNavigator />;
  }
}




