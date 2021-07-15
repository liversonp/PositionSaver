import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

import { styles } from './styleMap'


export default function Map({navigation, route}) {
  const [location, setLocation] = React.useState(null);
  //const [intervalId, setIntervalId] = React.useState(null);
  const [lat, setLat] = React.useState(100);
  const [long, setLong] = React.useState(100);

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
      //console.log(JSON.stringify(initLocation.coords.latitude))
      //console.log(JSON.stringify(initLocation.coords.longitude))
      //console.log(JSON.stringify(location));
      
    })();
  }, []);

  React.useEffect(() => {
    if (route.params?.tempo && route.params?.medida) {
      /*let now = new Date
      let nowDate = now.getDate ();
      let nowMonth = now.getMonth();
      let nowYear = now.getFullYear ();

      let nowHour = now.getHours();
      let nowMin =  now.getMinutes();
      let nowSeg = now.getSeconds();
      let nowMseg = now.getMilliseconds();
      console.log(route.params?.tempo);
      console.log(route.params?.medida);
      console.log(nowHour + ":" + nowMin + ":" + nowSeg + ":" + nowMseg);
      console.log(nowDate + "/" + nowMonth + "/" + nowYear);
      
      setInterval(() => {
        console.log(nowSeg);
        nowSeg = nowSeg+1;
        intervalId => setIntervalId(nowSeg);
      }, 1000);*/
    }
  }, [route.params?.tempo, route.params?.medida]);

  /*function stopTimer(intervalId) {
    clearInterval(intervalId);
  }*/
  return (
    <View style={styles.container}>
      <View style={styles.button}>
      <Button
        
        title="Mapa"
        onPress={() => navigation.reset({
          index: 0,
          routes: [{name: "Mapa"}]
        })}
      />
      <Button
        style={styles.button}
        title="Definições"
        onPress={() => navigation.navigate("Definições")}
      />
      
      </View>
      {/*<Button 
      style={styles.button}
      title="Parar"
      onPress={() => stopTimer(intervalId)}
      />*/}
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