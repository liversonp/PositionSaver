import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

import {styles} from './style'


export default function Map() {
    const [location, setLocation] = React.useState(null);

    React.useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
          setLocation(location);
          console.log(JSON.stringify(location));
        })();
      }, []);
    
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={location} />
      </View>
    );
}