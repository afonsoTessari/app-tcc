import React, { Component } from 'react';

import {
	View,
	StyleSheet,
	Text,
	Alert,
	TouchableOpacity,

} from 'react-native';

import MapScreen from './MapScreen.js';

export default class MyMarkersView extends Component{


	onPressRemove(marker){
	Alert.alert(
	    'Deseja excluir o marcador?',
	    marker.description,
	    	[
	        	{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
	        	{text: 'OK', onPress: () =>this.props.onDelete(marker)},
	    	],
		);
	}

	getMarkerColor(marker){
	  if(marker.category === 'Segurança'){
	    return 'red';
	  } else if(marker.category === 'Trânsito'){
	    return 'gold';
	  } else if(marker.category === 'Infraestrutura'){
	    return 'green';
	  } else if(marker.category === 'Clima'){
	    return 'indigo';
	  } else {
	    return 'blue' 
	  }
	}

	render() {

		return(
			<View style={styles.repo}>
			<View style={{position:'absolute', top:0, bottom:0, left:0, width:12, backgroundColor:this.getMarkerColor(this.props.marker), borderTopLeftRadius: 5, borderBottomLeftRadius:5}}/>
				<View style={styles.markerInfo}>
					<Text style={styles.markerCategory}>{this.props.marker.category}</Text>
					<TouchableOpacity 
						onPress={(param) => this.onPressRemove(this.props.marker)}><Text style={styles.markerDescription}>{this.props.marker.description}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles =  StyleSheet.create({
	repo: {
		padding:20,
		backgroundColor: '#FFF',
		marginBottom:20,
		borderRadius:5,
		position:'relative'
	}, 

	markerInfo: {
		marginLeft: 10,
	},

	markerDescription:{
		color:'#999',
		fontSize:18,
		paddingHorizontal: 5,
    	paddingVertical: 5,
	},

	markerCategory:{
		color:'#000',
		fontSize:20,
		paddingHorizontal: 5,
    	paddingVertical: 5,
    	fontWeight: 'bold',
	}



});