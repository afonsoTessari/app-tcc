import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Modal,
  TouchableOpacity
} from 'react-native';

class CustomModal extends Component {

	constructor() {
		super();


		this.state = {
			newMarkerText: '',
			checked:null,
			
		};

		this.changeText = this.changeText.bind(this);
	}

	changeText(text){
		this.setState({
			newMarkerText: text
		})

	}

	render() {
				
		return(	
			<Modal animationType= "fade" transparent={true} visible={this.props.visible} onRequestClose={this.props.onRequestClose}>
				<View style={styles.modalContainer}>
					<View style={styles.boxContainer}>
						<Text style={styles.boxTitle}> Adicionar Marcador </Text>
						
						<View style={styles.checkboxContainer}>
							<CheckBox
								onPress={()=>this.setState({checked:'Segurança'})}	
							  title='Segurança'
							  checked={this.state.checked === 'Segurança'}
							/>
							<CheckBox
								onPress={()=>this.setState({checked:'Trânsito'})}
							  title='Trânsito'
							  checked={this.state.checked ==='Trânsito'}
							/>
						</View>
						<View style={styles.checkboxContainer}>	
							<CheckBox
							onPress={()=>this.setState({checked:'Infraestrutura'})}
							  title='Infraestrutura'
							  checked={this.state.checked ==='Infraestrutura'}
							/>
							<CheckBox
							onPress={()=>this.setState({checked:'Clima'})}
							  title='Clima'
							  checked={this.state.checked ==='Clima'}
							/>
						</View>

						<TextInput
							autoFocus
							autoCapitalize="sentences"
							style={styles.boxInput}
							underlineColorAndroid="rgba(0, 0, 0, 0)"
							placeholder="Comentário"
							value={this.state.newMarkerText}
							onChangeText={this.changeText}
						/>
						
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={[styles.button, styles.cancelButton]}
								onPress={this.props.onCancel}
							>
								<Text style={styles.buttonText}>Cancelar</Text>
							</TouchableOpacity>	

							<TouchableOpacity
								style={[styles.button, styles.submitButton]}
								onPress={()=>{
									this.setState({newMarkerText:''})
									this.props.onAdd(this.state.newMarkerText,this.state.checked)
								}}
							>
								<Text style={styles.buttonText}>Adicionar</Text>
							</TouchableOpacity>	
						</View>	
					</View>
				</View>
			</Modal>	
		);
	}
}

const styles = StyleSheet.create({

	modalContainer: {
		flex:1,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		justifyContent: 'center',
		alignItems: 'center',
	},

	boxContainer: {

		padding: 20,
		backgroundColor: '#FFF',
		borderRadius: 10,
		alignItems: 'center',
		width: 300,
	},
	
	boxTitle:{
		fontWeight: 'bold',
		fontSize: 16,
	},

	boxInput:{
		alignSelf: 'stretch',
		marginTop: 10,
		paddingVertical: 0,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: '#DDD',
		height: 50,
		borderRadius: 3,
	},

	checkboxContainer:{
		marginTop: 2,
		height: 52,
		flexDirection: 'row',
	},

	buttonContainer:{
		marginTop: 10,
		height: 40,
		flexDirection: 'row',
	},

	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
	},

	cancelButton: {
		backgroundColor: '#E25F5F',
		marginRight: 5,
	},

	submitButton: {
		backgroundColor: '#70BD85',
		marginLeft: 5,

	},

	buttonText: {
		fontWeight: 'bold',
		color: '#FFF',
		fontSize: 12,
	},

});

export default CustomModal;