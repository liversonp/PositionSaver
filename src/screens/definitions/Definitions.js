import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert, SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';
import * as Location from 'expo-location';
import {Picker} from '@react-native-picker/picker'

export default function Definitions({navigation, route}) {
  //Declaração das variáveis de tempo, mensagem de erro e variável de medida de tempo
  const [tempo,setTempo] = React.useState(null);
  const [errorTempo,setErrorTempo] = React.useState(null);
  const [medida, setMedida] = React.useState('segundos');

  //Função com o propósito de validar as informações de tempo que foram passadas pelo usuário
  //Caso as informações forem inválidas, o usuário não conseguirá mudar o intervalo de tempo
  const validar = () => {
    let error = false
    setErrorTempo(null)
    
    if(medida != 'segundos' && medida!= 'minutos'){
      setErrorTempo("preencha os campo de forma correta")
      error = true
    }
    if(tempo == null){
      setErrorTempo("preencha os campo de forma correta")
      error = true
    }

    if(medida == 'segundos'){
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
  
  //Função para retornar as informações para a tela de mapa, enviando os parametros de tempo e medida
  const salvar = () => {
    if(validar()){
      navigation.navigate({
        name: "Mapa",
        params: {tempo, medida},
        merge: true,
      })
    }
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/*Informações mostradas na tela em relação a medida de tempo e ao tempo desejados*/}  
      <Picker
        selectedValue={medida}
        style={{height: 50, width: 200}}
        onValueChange={(itemValue) => setMedida(itemValue)}
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