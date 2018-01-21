import React, { Component } from 'react';

import {
  StyleSheet,	
  View,
  StatusBar,
} from 'react-native';

import Routes from '../../src/Routes';

export default class HomeScreen extends Component<{}>{
	render(){
		return(
			<View style={styles.container}>	
				<StatusBar
					backgroundColor="#1c313a"
					barStyle="light-content"
				/>
				<Routes/>
			</View>	
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex: 1,
	}
});