import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';
import * as Location from 'expo-location';

export default function Definitions({navigation, route}) {
  const [repeticoes, setRepeticoes] = React.useState(null);
  const [tempo,setTempo] = React.useState(null);

  const [errorRep,setErrorRep] = React.useState(null);
  const [errorTempo,setErrorTempo] = React.useState(null);

  const validar = () => {
    let error = false
    setErrorRep(null)
    setErrorTempo(null)
    if(repeticoes == null || repeticoes > 30){
      setErrorRep("preencha o campo de forma correta")
      error = true
    }
    
    if(tempo == null || tempo > 59){
      setErrorTempo("preencha o campo de forma correta")
      error = true
    }
    return !error
  }
  
  
  const salvar = () => {
    if(validar()){
      navigation.navigate({
        name: "Mapa",
        params: {repeticoes, tempo},
        merge: true,
      })
    }
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Input
        placeholder='número de repetições'
        onChangeText={value => setRepeticoes(value)}
        keyboardType='number-pad'
        returnKeyType='done'
        errorMessage={errorRep}
        />
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