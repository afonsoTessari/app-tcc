import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import MapView from 'react-native-maps';
import CustomModal from './CustomModal.js';
import MyMarkersModal from './MyMarkersModal.js';
import Login from './Login.js';

const {width, height} = Dimensions.get('window')

class MapScreen extends Component{

  constructor(props) {
    super(props);

    //alert(props.user);

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
      modalMyMarkersVisible:false,

    };
    this.addMarker = this.addMarker.bind(this);    
    this.insertMarker = this.insertMarker.bind(this); 
    this.showModal = this.showModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.openModalMyMarkers = this.openModalMyMarkers.bind(this);



  }


  async componentDidMount(){
    let arraymarker =  await this.getArrayFromApi();
    //console.log(arraymarker.description);

    this.setState({
      isAddingMarker:false,
      modalVisible:false,     
      markers:arraymarker,
    });
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
   
  async getArrayFromApi(){
    try{
      let response = await fetch("http://10.0.2.120:3000/ArrayFromApi")
      let responseJson = await response.json();
      return responseJson.marker;    
    } catch (error){
      console.error(error);
    }
  } 

  addMarker(){                            
    this.setState({isAddingMarker:true})
  }

  openModalMyMarkers() {
    this.setState({modalMyMarkersVisible:true});
  }

  showModal(e){                       //Exibe o modal adicionar marcadores
    if(this.state.isAddingMarker){
      this.setState({
        modalVisible:true,
        isAddingMarker:false,

      })
      this.coordinate = e.nativeEvent.coordinate;
     this.description = this.state.newMarkerText;
    }
  }



  async insertMarker(description, category){
    let newMarker = {
      coordinate:this.coordinate,
      description:description,
      category:category,
      user:this.props.navigation.state.params.user
      };

    

    try {
      let response = await fetch("http://10.0.2.120:3000/marker" , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({marker: newMarker})
        //body: JSON.stringify({marker: "newMarker"})
      });

      let responseData = await response.json();
      
      if(responseData.success){
        
        newMarker._id = responseData.marker_id;
        
        this.setState({
          isAddingMarker:false,
          modalVisible:false,     
          markers: [
            ...this.state.markers,
            newMarker
          ]
        });

        alert("Marcador adicionado");
      }else{
        throw new Error(responseData.message);
      }
    } catch(error){
      alert(error.message);
    }   
  }

  async onDelete(marker){
    try {
      let response = await fetch("http://10.0.2.120:3000/remove/"+marker._id,{
          method: 'DELETE',
        });
        let res = await response.json();
        console.log(res)
        if (res.success) {
          console.log("Removido o marker: ")

          this.setState({
            markers: this.state.markers.filter((element, index) => {
              return element._id != marker._id
            })
          });
        } else {
          throw new Error("Não foi possível remover o marcador")
        }
    } catch(error) {
        alert("Erro: " + error.message)
    }
  }

  onPressRemove(marker){
    Alert.alert(
        'Deseja excluir o marcador?',
        marker.description,
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () =>this.onDelete(marker)},
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

    if(this.state.isLoading){
      return(
        <View
          style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          }}>
          <ActivityIndicator size={32} color='red' />
        </View>
      )
    }

    const markers=this.state.markers.map((marker, i) => {
      return(
        <MapView.Marker
          coordinate={marker.coordinate}
          _id={marker._id}
          pinColor={this.getMarkerColor(marker)}
          key={marker._id} 
        >          
            <MapView.Callout onPress={(param) => this.onPressRemove(marker)}>
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

        <TouchableHighlight
          style={[
            styles.myMarkers,
            {
              backgroundColor: this.state.modalMyMarkersVisible?"black":"white",
            }
          ]}
          onPress={()=>this.openModalMyMarkers()}
        >
        
        <Text
        style={{color: this.state.modalMyMarkersVisible?"white":"black",
        }}
        >Meus Marcadores</Text>
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

        <MyMarkersModal 
          visible={this.state.modalMyMarkersVisible}
          onRequestClose={()=> {console.log('Modal Fechada')}}
          onBack={()=> this.setState({modalMyMarkersVisible:false})}
          markersArray={this.state.markers}
          idUser={this.props.navigation.state.params.user}
          onDelete={this.onDelete}
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
    paddingHorizontal: 10,
    paddingVertical: 10,

  },
  myMarkers: {
    position: 'absolute', 
    bottom: 10,
    left: 10, 
    zIndex: 2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default MapScreen;