import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';
import * as Location from 'expo-location';
import {Picker} from '@react-native-picker/picker'

export default function Definitions({navigation, route}) {
  const [tempo,setTempo] = React.useState(null);
  const [errorTempo,setErrorTempo] = React.useState(null);

  const [escolha, setEscolha] = React.useState('segundos');

  const validar = () => {
    let error = false
    setErrorTempo(null)

    console.log(escolha)


    if(escolha != 'segundos' && escolha!= 'minutos'){
      setErrorTempo("preencha os campo de forma correta")
      error = true
    }
    if(tempo == null){
      setErrorTempo("preencha os campo de forma correta")
      error = true
    }

    if(escolha == 'segundos'){
      if(tempo > 59 || tempo < 1){
        setErrorTempo("preencha os campo de forma correta")
        error = true
      }
    }
    else{
      if(tempo > 5 || tempo < 1){
        setErrorTempo("preencha os campo de forma correta")
        error = true
      }
    }
    return !error
  }
  
  
  const salvar = () => {
    if(validar()){
      navigation.navigate({
        name: "Mapa",
        params: {tempo},
        merge: true,
      })
    }
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Picker
        selectedValue={escolha}
        style={{height: 50, width: 200}}
        onValueChange={(itemValue) => setEscolha(itemValue)}
        >
          <Picker.Item label="Segundos" value="segundos"/>
          <Picker.Item label="Minutos" value="minutos"/>
      </Picker>

        <Input
        placeholder='Intervalo de tempo desejado'
        onChangeText={value => setTempo(value)}
        keyboardType='number-pad'
        returnKeyType='done'
        errorMessage={errorTempo}
        />
        <Button
        title="Salvar"
        onPress={() => salvar()}
      />
      </View>
    );
  }