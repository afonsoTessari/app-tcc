import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import MyMarkersView from './MyMarkersView.js';
import MapScreen from './MapScreen.js';

class MyMarkersModal extends Component {

	

	render() {

		const myMarkersViewArray=this.props.markersArray.filter((marker)=> {
			return this.props.idUser === marker.user;
		}).map((marker, i) => {
			return(<MyMarkersView onDelete={this.props.onDelete} key={marker._id} marker={marker}/>)
      	})

		console.log(this);
				
		return(	
			<Modal animationType= "fade" presentationStyle="fullScreen" visible={this.props.visible} onRequestClose={this.props.onRequestClose}>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.headerText}> Meus marcadores </Text>
					</View>
					<ScrollView contentContainerStyle={styles.markerList}>
						{myMarkersViewArray}
						<TouchableOpacity
							style={[styles.button, styles.submitButton]}
							onPress={()=>{this.props.onBack()}}
						>
							<Text style={styles.buttonText}>Voltar</Text>
						</TouchableOpacity>	
					</ScrollView>
				</View>
				
				
				
			</Modal>	
		);
	}
}

const styles = StyleSheet.create({

	container:{
		flex:1,
		backgroundColor:'#333'
	},

	header:{
		height:50,
		paddingTop:0,
		backgroundColor:'#1c313a',
		justifyContent:'center',
		alignItems:'center',
	},

	
	headerText:{
		fontWeight: 'bold',
		fontSize: 16,
		color:'#ffffff',
	},

	markerList: {
		padding:20,
	},

	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
		alignItems:'center',
	},

	submitButton: {
		backgroundColor: '#1c313a',

	},

	buttonText:{
		fontWeight: 'bold',
		fontSize: 16,
		color:'#ffffff',
		height:40,
		alignItems:'center',
		marginTop:12,
		justifyContent:'center',
	}
});

export default MyMarkersModal;