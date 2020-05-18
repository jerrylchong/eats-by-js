import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import RestaurantButton from './component/RestaurantButton';
import SearchButton from './container/SearchButton';


const fakeRestaurantData = [
    { title : "Jerryl's topoki paradise" , cost: '$$' ,descr: "best tomyum", tags: [{name:'jerryl'}, {name:'tomyum'}]},
    { title : "Jays's topoki paradise" , cost: '$', descr: "best tomyum", tags: [{name:'jay'}, {name:'tomyum'}]} ,
    { title : "Aerin's topoki paradise" , cost: '$$$', descr: "subpar tomyum", tags: [{name:'aerin'}, {name:'tomyum'}]},
    { title : "Oli's topoki paradise" , cost: '$$$', descr: "worst tomyum", tags: [{name:'oli'}, {name:'tomyum'}]},
]

const App = () => {
  return (
      <SafeAreaView style = {styles.container}>
          <SearchButton />
          <ScrollView>
              { fakeRestaurantData.map((elem) => 
              <RestaurantButton name={elem.title} cost={elem.cost} description={elem.descr} tags={elem.tags}
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
      alignItems: 'center',
      marginTop: StatusBar.currentHeight
  },
});
