import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './src/screens/map/Map'
import Definitions from './src/screens/definitions/Definitions'
import Results from './src/screens/results/Results';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Criação da variável necessária para navegar entre as opções dentro do app
const Stack = createStackNavigator();

//Função onde são adicionadas as telas para a navegação do usuário
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mapa" component={Map} />
      <Stack.Screen name="Definições" component={Definitions} />
      <Stack.Screen name="Resultados" component={Results} />
    </Stack.Navigator>
  );
}

//Função principal que apenas inicia a variável de navegação
export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});