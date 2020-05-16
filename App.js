import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import RestaurantButton from './component/RestaurantButton';


const fakeRestaurantData = [
    { title : "Jerryl's topoki paradise" , descr: "best tomyum"},
    { title : "Jays's topoki paradise" , descr: "best tomyum"},
    { title : "Aerin's topoki paradise" , descr: "subpar tomyum"},
    { title : "Oli's topoki paradise" , descr: "worst tomyum"},
]

const App = () => {
  return (
      <SafeAreaView style = {styles.container}>
          <ScrollView>
              { fakeRestaurantData.map((elem) => 
              <RestaurantButton name={elem.title} description={elem.descr} 
              />) }
          </ ScrollView>
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
