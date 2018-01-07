import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import MapView from 'react-native-maps';
import CustomModal from './CustomModal.js';

const {width, height} = Dimensions.get('window')

class MapScreen extends Component{

  constructor() {
    super();

    this.state = {
      isLoading:true,
      markers : [],

      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },

      isAddingMarker: false,
      modalVisible: false,

    };
    this.addMarker = this.addMarker.bind(this);    
    this.insertMarker = this.insertMarker.bind(this); 
    this.showModal = this.showModal.bind(this);   
  }


  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const accuracy = position.coords.accuracy

        
        this.setState({
          region:{
            ...this.state.region,
            latitude: lat,
            longitude: lon,
          },
          isLoading:false,
          isAddingMarker:false,
          
        })
      }
    )
  }
    

  addMarker(){
    this.setState({isAddingMarker:true})
  }

  showModal(e){
    if(this.state.isAddingMarker){
      this.setState({
        modalVisible:true,
        isAddingMarker:false,

      })
     this.coordinate = e.nativeEvent.coordinate;
     this.description = this.state.newMarkerText;
    }
  }



  async insertMarker(description){
    let newMarker = {
      id:+new Date(),
      coordinate:this.coordinate,
      description:description,
    };

    this.setState({
      isAddingMarker:false,
      modalVisible:false,     
      markers: [
        ...this.state.markers,
        newMarker        
      ]
    });

    try {
      let response = await fetch("http://192.168.1.103:3000/marker" , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({marker: newMarker})
        //body: JSON.stringify({marker: "newMarker"})
      });

      let responseData = await response.json();
      alert(responseData);
    } catch(error){
      alert(error.message);
    }
    
  }
	
	render() {
    if(this.state.isLoading){
      return(
        <View style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center'
        }}>
          <ActivityIndicator
            size={32}
            color='red'

          />
        </View>
      )
    }

    const markers=this.state.markers.map((marker, i) => {
      return(
        <MapView.Marker
          coordinate={marker.coordinate}
          key={marker.id}
        >          
            <MapView.Callout>
            <Text>{marker.description}</Text>
            </MapView.Callout>
        </MapView.Marker>
      )
    })

   	return (
    	<View style={styles.container}>
        <TouchableHighlight
          style={[
            styles.adicionar,
            {
              backgroundColor: this.state.isAddingMarker?"black":"white",
            }
          ]}
          onPress={ () =>{
            if (!this.state.isAddingMarker){
            this.addMarker();        
            }

          }}
        >
        
        <Text
        style={{color: this.state.isAddingMarker?"white":"black",
        }}
        >Adicionar Marcador</Text>
        </TouchableHighlight>

       	<MapView
           		style={styles.map}
          		region={this.state.region}
              onPress={this.showModal}
              showsUsersLocation={true}
              loadingEnabled={true}

        >
        {markers}  
        </MapView>

        <CustomModal 
          visible={this.state.modalVisible}
          onCancel={()=> this.setState({modalVisible:false})}
          onRequestClose={()=> {console.log('Modal Fechada')}}
          onAdd={this.insertMarker} 
        />        
     	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    width: width
  },
  adicionar: {
    position: 'absolute', 
    bottom: 10,
    right: 10, 
    zIndex: 2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 14,
    paddingHorizontal: 10
  },
});

export default MapScreen;