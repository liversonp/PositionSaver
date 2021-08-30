import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

import { styles } from './styleMap'
import { round } from 'react-native-reanimated';


export default function Map({ navigation, route }) {
  const [location, setLocation] = React.useState(null);
  const [watcher, setWatcher] = React.useState(null);
  const [isLooping, setIsLooping] = React.useState(true);
  var dados = [];
  var intervalo = 1000;
  
  const paraRepeticao = async () => {
    await watcher.remove();
    console.log("parou!")
    setIsLooping(false);
  }

  const iniciaRepeticao = async () => {
    let curr_location = {}
    let timeStamp = -1;
    let currTime;
    let new_watcher = await Location.watchPositionAsync({ 
      accuracy:Location.Accuracy.Highest,
      timeInterval: intervalo,
      distanceInterval: 0
    }, function(loc) {
        curr_location = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0030,
          longitudeDelta: 0.0030
        }
        setLocation(curr_location);
        if(timeStamp == -1){
          timeStamp = loc.timestamp;
        }
        currTime = loc.timestamp;
        currTime = (currTime-timeStamp)/1000;
        //dados.push(curr_location, intervalo);
        console.log("atualizou!");
        console.log(currTime);
      });
    setWatcher(new_watcher);
    
    console.log(intervalo);
    setIsLooping(true);
  }

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      iniciaRepeticao();

    })();
  }, []);

  React.useEffect(() => {
    if (route.params?.tempo && route.params?.medida) {
      let novo_intervalo = 1000;
      if(route.params?.medida == 'segundos'){
        novo_intervalo *= route.params?.tempo;
      }
      else{
        novo_intervalo *= route.params?.tempo * 60;
      }
      intervalo = novo_intervalo;
        
      paraRepeticao();
      iniciaRepeticao();
    }
  }, [route.params?.tempo, route.params?.medida]);

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button

          title="Mapa"
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: "Mapa" }]
          })}
        />
        <Button
          style={styles.button}
          title="Definições"
          onPress={() => navigation.navigate("Definições")}
        />

      </View>
      <View style={styles.pararwrappler}>
        <Button
          style={styles.button}
          title = {(isLooping ? "Parar" : "Iniciar")}
          onPress= {isLooping ? () => paraRepeticao() : () => iniciaRepeticao()}
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={location}
        region={location}
      >
        {(location != null && location.latitude != null && location.longitude != null) ?
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            image={require('../../../assets/map_marker.svg')}
            title='You'
            identifier='User'
          ></Marker>
        : null }
        </MapView>
    </View >
  );
}