import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import RestaurantButton from './component/RestaurantButton';

const App = () => {
  return (
      <SafeAreaView style = {styles.container}>
<<<<<<< HEAD
          <RestaurantButton />
=======
        <RestaurantButton 
            name="Jerryl's Korean Restaurant"
            description="Best ban mian ever"
          />
>>>>>>> dca18c926f0b87ed9d6ffe1ce931a2abefea53fe
      </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: StatusBar.currentHeight
  },
});
