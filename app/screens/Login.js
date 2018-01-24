import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Keyboard

} from 'react-native';

import MapScreen from './MapScreen.js';



export default class Login extends Component<{}>{
	static navigationOptions = {
		title:'Login'
	}


	constructor() {
		super();

		this.state = {
			email:'',
			password:'',
			isLogging:true,
		};

		this.processAuth = this.processAuth.bind(this); 
	}

	processAuth = () => {
		Keyboard.dismiss();
		if(this.state.isLogging){
			fetch('http://10.0.2.120:3000/login', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
				})
			})
			.then((response)=> response.json())
			.then((res)=> {
				if(res.success === true){	
					this.props.navigation.navigate('MapScreen',{user:res.id_user});
				} else {
					alert(res.message);
				}
			})

		} else{
			fetch('http://10.0.2.120:3000/register', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
				})
			})
			.then((response)=> response.json())
			.then((res)=> {
				if(res.success === true){	
					this.props.navigation.navigate('MapScreen',{user:res.id_user});
				} else {
					alert(res.message);
				}
			})

		}

	}


	render(){
		var {navigate} = this.props.navigation;
		return(
			<View style={styles.containerB}>
			<View style={styles.container}>

			<View style={styles.containerTitle}>
			<Text style={styles.logoText}>Bem Vindo ao Guia do Viajante</Text>
			</View>

			<TextInput style={styles.inputBox} 
			underlineColorAndroid='rgba(0,0,0,0)'
			placeholder="Email"
			placeholderTextColor = "#ffffff"
			selectionColor="#fff"
			keyboardType="email-address"
			onSubmitEditing={()=>this.password.focus()}
			value={this.state.email}
			onChangeText={(email)=>this.setState({email})}
			/>
			<TextInput style={styles.inputBox} 
			underlineColorAndroid='rgba(0,0,0,0)'
			placeholder="Senha"
			secureTextEntry={true}
			placeholderTextColor = "#ffffff"
			ref={(input)=> this.password = input}
			value={this.state.password}
			onChangeText={(password)=>this.setState({password})}
			/>

			<TouchableOpacity style={styles.button} onPress={this.processAuth}>

			{this.state.isLogging && <Text style={styles.buttonText}>Login</Text>}
			{!this.state.isLogging && <Text style={styles.buttonText}>Registrar</Text>}
			</TouchableOpacity>

			<View style={styles.signupTextCont}>
			{this.state.isLogging && <Text style={styles.signupText}>Não tem uma conta ainda?</Text> }
			{!this.state.isLogging && <Text style={styles.signupText}>Já tem conta?</Text>}

			<TouchableOpacity onPress={()=> this.setState({isLogging:!this.state.isLogging})}>
			{this.state.isLogging && <Text style={styles.signupButton}>  Inscreva-se</Text>}
			{!this.state.isLogging && <Text style={styles.signupButton}> Faça o login</Text>}
			</TouchableOpacity>

			</View>	
			</View>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	container : {
		flexGrow: 1,
		justifyContent:'center',
		alignItems: 'center'
	},

	inputBox: {
		width:300,
		backgroundColor:'rgba(255, 255,255,0.2)',
		borderRadius: 25,
		paddingHorizontal:16,
		fontSize:16,
		color:'#ffffff',
		marginVertical: 10
	},
	
	button: {
		width:300,
		backgroundColor:'#1c313a',
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 13
	},
	
	buttonText: {
		fontSize:16,
		fontWeight:'500',
		color:'#ffffff',
		textAlign:'center'
	},
	
	containerB : {
		backgroundColor: '#455a64',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	
	signupTextCont : {
		flexGrow: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical:16,
		flexDirection:'row'
	},
	
	signupText:{
		color: 'rgba(255,255,255,0.7)',
		fontSize:16
	},

	signupButton:{
		color:'#ffffff',
		fontSize:16,
		fontWeight:'500'
	},

	containerTitle : {
		flexGrow: 1,
		justifyContent:'flex-end',
		alignItems: 'center'
	},
	logoText :{
		marginVertical: 15,
		fontSize: 18,
		color:'rgba(255, 255, 255, 0.7)'
	}

});