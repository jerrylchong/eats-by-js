import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import RestaurantButton from './component/RestaurantButton';

const App = () => {
  return (
      <SafeAreaView style = {styles.container}>
        <RestaurantButton />
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
