import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, Button, Text } from 'react-native';
import RestaurantButton from './component/RestaurantButton';
import SearchButton from './container/SearchButton';
import MenuButton from './component/MenuButton';
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";


const fakeRestaurantData = [
    { title : "Jerryl's topoki paradise" , cost: '$$' ,descr: "best tomyum", tags: [{name:'jerryl'}, {name:'tomyum'}]},
    { title : "Jays's topoki paradise" , cost: '$', descr: "best tomyum", tags: [{name:'jay'}, {name:'tomyum'}]} ,
    { title : "Aerin's topoki paradise" , cost: '$$$', descr: "subpar tomyum", tags: [{name:'aerin'}, {name:'tomyum'}]},
    { title : "Oli's topoki paradise" , cost: '$$$', descr: "worst tomyum", tags: [{name:'oli'}, {name:'tomyum'}]},
]

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function RestaurantList({ navigation }) {
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.navBar}>
                <MenuButton onPress = {() => navigation.toggleDrawer()}/>
                <SearchButton />
            </View>
            <ScrollView>
                { fakeRestaurantData.map((elem) =>
                    <RestaurantButton name={elem.title} cost={elem.cost} description={elem.descr} tags={elem.tags}
                    />) }
            </ ScrollView>
        </SafeAreaView>
    )
}

function SettingsPage({ navigation }) {
    return (
        <View style = {styles.settings}>
            <Text>Placeholder Settings Page</Text>
            <Button onPress = {() => navigation.goBack()} title = 'Back' />
        </View>
    )
}

function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName = 'Home'>
            <Drawer.Screen name = 'Home' component = {RestaurantList} />
            <Drawer.Screen name = 'Settings' component = {SettingsPage} />
        </Drawer.Navigator>
    )
}

const App = () => {
  return (
      <NavigationContainer>
          <MyDrawer />
      </NavigationContainer>
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
    settings: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    navBar: {
        flexDirection: 'row',
        height: 95,
        width: 375,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 7,
    }
});
