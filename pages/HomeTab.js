import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";

const Tab = createMaterialBottomTabNavigator();

function HomeTab() {
    return (
        <Tab.Navigator
            barStyle={{backgroundColor: '#ff6961'}}
            labeled={false}
            shifting={true}
            activeColor={"white"}
            inactiveColor={"#b3b3b3"}
        >
            <Tab.Screen name="List" component={RestaurantList}
                        options={{
                            tabBarIcon: ({focused, color}) =>
                                <View style = {styles.container}>
                                    {color == "white"
                                        ? <Image style={styles.icon} source={require('../assets/listicon.png')}/>
                                        : <Image style={styles.icon} source={require('../assets/inactivelist.png')}/>
                                    }
                                    <Text style = {[styles.text, {color: color}]}>List</Text>
                                </View>
                        }}
            />
            <Tab.Screen name="Map" component={RestaurantMap}
                        options={{
                            tabBarIcon: ({focused, color}) =>
                                <View style = {styles.container}>
                                    {color == "white"
                                        ? <Image style={styles.icon} source={require('../assets/mapicon.png')}/>
                                        : <Image style={styles.icon} source={require('../assets/inactivemap.png')}/>
                                    }
                                    <Text style = {[styles.text, {color: color}]}>Map</Text>
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
        bottom: '25%'
    },
    icon: {
        height: Dimensions.get('window').width * 0.06,
        width: Dimensions.get('window').width * 0.06,
    },
    text: {
        width:'100%',
        fontSize: 14,
        fontFamily: 'Ubuntu',
    }
})