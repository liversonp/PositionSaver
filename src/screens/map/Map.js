import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

import { styles } from './styleMap'


export default function Map({ navigation, route }) {
  const [location, setLocation] = React.useState(null);
  const [lat, setLat] = React.useState(100);
  const [long, setLong] = React.useState(100);

  var myInterval;
  let a = 1;

  const paraRepeticao = () => {
    clearInterval(myInterval);
  }

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let initLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      setLat(initLocation.coords.latitude);
      setLong(initLocation.coords.longitude);

      let location = {
        latitude: initLocation.coords.latitude,
        longitude: initLocation.coords.longitude,
        latitudeDelta: 0.0030,
        longitudeDelta: 0.0030,
      }
      setLocation(location);
      console.log(JSON.stringify(initLocation.coords.latitude))
      console.log(JSON.stringify(initLocation.coords.longitude))
      console.log(JSON.stringify(location));

    })();
  }, []);

  React.useEffect(() => {
    if (route.params?.tempo && route.params?.medida) {
      let intervalo = 1000;
      console.log(route.params?.tempo);
      if(route.params?.medida == 'segundos'){
        intervalo = intervalo * route.params?.tempo;
      }
      else{
        intervalo = intervalo * route.params?.tempo * 60;
      }
      myInterval = setInterval(function () {
        a = a+1;
        console.log(a);
      }, intervalo);

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
          title="Parar"
          onPress={() => paraRepeticao()}
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={location}
        region={location}
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}
          image={require('../../../assets/map_marker.svg')}
          title='You'
          identifier='User'
        ></Marker>
        </MapView>
    </View >
  );
}