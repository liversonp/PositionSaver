import * as React from 'react';
import { View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { styles } from './styleButton'

export default function Buttons() {
    return(
        <View style={styles.buttons}>
        <Button
          style={styles.button}
          title="Mapa"
          onPress={() => Alert.alert('chama a tela de mapa')}
        />
        <Button
          style={styles.button}
          title="Definições"
          onPress={() => Alert.alert('chamar a outra tela')}
        />
        <Button
          style={styles.button}
          title="Mostrar marcadores"
          onPress={() => Alert.alert('chamar a outra tela')}
        />
        <Button
          style={styles.button}
          title="Precisão"
          onPress={() => Alert.alert('chamar a outra tela')}
        />
      </View>
    );
}