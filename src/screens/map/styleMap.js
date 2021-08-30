import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

    button: {
      backgroundColor: '#9e0909',
      display: 'flex',
      flexDirection: 'row',
    },

    pararwrappler: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  });