import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

import  Buttons  from '../buttons/buttons'
import { styles } from './styleMap'


export default function Map() {
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
      console.log(JSON.stringify(initLocation.coords.latitude))
      console.log(JSON.stringify(initLocation.coords.longitude))
      setLocation(location);
      console.log(JSON.stringify(location));
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Buttons/>
      <MapView
        style={styles.map}
        initialRegion={location}
        region={location}
      />
    </SafeAreaView >
  );
}