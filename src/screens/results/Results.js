import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

import { styles } from './styleResults'

export default function Results({navigation, route}){
    var data = [];

    React.useEffect(()=>{
        if(route.params){
            data = route.params;
        }
    }, []);

    const mostraArray = () => {
        console.log(data);
    }

    return(
       <View style={styles.container}>
           <Button
                title="Mostrar dados"
                onPress={() => mostraArray()}
           />
       </View> 
    );
}