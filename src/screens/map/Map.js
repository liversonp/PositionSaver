import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

import { styles } from './styleMap'

export default function Map({ navigation, route }) {

  //Declarações de variáveis para o funcionamento da tela
  const [location, setLocation] = React.useState(null);
  const [watcher, setWatcher] = React.useState(null);
  const [isLooping, setIsLooping] = React.useState(false);
  const [dataArr, setDataArr] = React.useState([]);
  let currTime;

  //Função para parar a repetição
  const paraRepeticao = async () => {
    await watcher.remove();
    setIsLooping(false);
  }

  //Função de repetição que irá atualizar os dados do mapa dado um intervalo de tempo esperado
  //O intervalo de tempo não necessariamente será estreitamente obedecido
  const iniciaRepeticao = async () => {
    var intervalo = 1000;
    let curr_location = {};
    let timeStamp = -1;
    let new_watcher = await Location.watchPositionAsync({ 
      accuracy:Location.Accuracy.Highest,
      timeInterval: intervalo,
      distanceInterval: 0

    //Função que irá efetivamente fazer o loop pegando a locaização do dispositivo
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
        setDataArr(dataArr => [...dataArr, curr_location,currTime]);
      });
    //Criando um novo watcher que é o que vai mostrar a posição do dispositivo no mapa
    setWatcher(new_watcher);
    setIsLooping(true);
    
    
  }

  //Função para pedir permissões de resgatar informações de localização do usuário para o uso do aplicativo
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      if(isLooping){
        iniciaRepeticao();
      }
    })();
  }, []);

  //Função que recebe e muda o tempo de funcionamento da atualização do mapa
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
    }
  }, [route.params?.tempo, route.params?.medida]);

  //Função para navegar para os resultados com as informações
  const toResults = () => {  
    navigation.navigate({
      name: "Resultados",
      params: dataArr,
      merge: true,
    })
  }

  //Retorno da tela Map.js
  return (
    <View style={styles.container}>
      {/*Botões de navegação do mapa*/}
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
        <Button
          style={styles.button}
          title="Resultados"
          onPress={() => toResults()}
        />

      </View>
      <View style={styles.pararwrappler}>
        <Button
          style={styles.button}
          title = {(isLooping ? "Parar" : "Iniciar")}
          onPress= {isLooping ? () => paraRepeticao() : () => iniciaRepeticao()}
        />
      </View>

      {/*Mapa propriamente dito e o marcador de posição no mapa*/}
      {(location != null && location.latitude != null && location.longitude != null) ?
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
        : null }
    </View >
  );
}