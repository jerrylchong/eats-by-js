import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import RestaurantButton from './component/RestaurantButton';
import SearchButton from './container/SearchButton';

const App = () => {
  return (
      <SafeAreaView style = {styles.container}>
          <SearchButton />
          <RestaurantButton
              name="Jerryl's Korean Restaurant"
              cost='$$'
              description="Best ban mian ever"
          />
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
