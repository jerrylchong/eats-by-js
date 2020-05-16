import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import RestaurantButton from './component/RestaurantButton';
import SearchButton from './container/SearchButton';


const fakeRestaurantData = [
    { title : "Jerryl's topoki paradise" , descr: "best tomyum"},
    { title : "Jays's topoki paradise" , descr: "best tomyum"},
    { title : "Aerin's topoki paradise" , descr: "subpar tomyum"},
    { title : "Oli's topoki paradise" , descr: "worst tomyum"},
]

const App = () => {
  return (
      <SafeAreaView style = {styles.container}>
          <SearchButton />
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
      flexDirection: 'column',
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginTop: StatusBar.currentHeight
  },
});
