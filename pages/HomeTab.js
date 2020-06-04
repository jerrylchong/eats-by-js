import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";

const Tab = createMaterialBottomTabNavigator();

function HomeTab() {
    return (
        <Tab.Navigator
            inactiveColor={'#ff3d33'}
            barStyle={{backgroundColor: '#ff6961'}}
            labeled={false}
        >
            <Tab.Screen name="List" component={RestaurantList}
                        options={{
                            tabBarIcon: ({focused, color}) =>
                                <View style = {styles.container}>
                                    <Image style = {styles.icon} source={require('../assets/listicon.png')}/>
                                    <Text style = {styles.text}>List</Text>
                                </View>,

                        }}
            />
            <Tab.Screen name="Map" component={RestaurantMap}
                        options={{
                            tabBarIcon: ({focused, color}) =>
                                <View style = {styles.container}>
                                    <Image style = {styles.icon} source={require('../assets/mapicon.png')}/>
                                    <Text style = {styles.text}>Map</Text>
                                </View>
                        }}
            />
        </Tab.Navigator>
    );
}

export default HomeTab

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: Dimensions.get('window').width * 0.06,
        width: Dimensions.get('window').width * 0.06,
    },
    text: {
        width:'100%',
        fontSize: 12,
        fontFamily: 'Ubuntu',
        color: 'white'
    }
})