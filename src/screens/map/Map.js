import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

import { styles } from './styleMap'


export default function Map({navigation, route}) {
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let initLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
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
    if (route.params?.tempo) {
      let now = new Date
      nowDate = now.getDate ();
      nowMonth = now.getMonth();
      nowYear = now.getFullYear ();

      let nowHour = now.getHours();
      let nowMin =  now.getMinutes();
      let nowSeg = now.getSeconds();
      let nowMseg = now.getMilliseconds();
      console.log(route.params?.tempo);
      console.log(nowHour + ":" + nowMin + ":" + nowSeg + ":" + nowMseg);
      console.log(nowDate + "/" + nowMonth + "/" + nowYear);
    }
  }, [route.params?.tempo]);

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
      <MapView
        style={styles.map}
        initialRegion={location}
        region={location}
      />
    </View >
  );
}