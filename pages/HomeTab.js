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
                                        : <Image style={styles.fadedIcon} source={require('../assets/listicon.png')}/>
                                    }
                                    {focused
                                        ? <Text style = {styles.text}>List</Text>
                                        : <Text style = {styles.fadedText}>List</Text>
                                    }
                                </View>
                        }}
            />
            <Tab.Screen name="Map" component={RestaurantMap}
                        options={{
                            tabBarIcon: ({focused, color}) =>
                                <View style = {styles.container}>
                                    {focused
                                        ? <Image style={styles.icon} source={require('../assets/mapicon.png')}/>
                                        : <Image style={styles.fadedIcon} source={require('../assets/mapicon.png')}/>
                                    }
                                    {focused
                                        ? <Text style = {styles.text}>Map</Text>
                                        : <Text style = {styles.fadedText}>Map</Text>
                                    }
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
    fadedIcon: {
        height: Dimensions.get('window').width * 0.06,
        width: Dimensions.get('window').width * 0.06,
        opacity: 0.7
    },
    text: {
        width:'100%',
        fontSize: 14,
        fontFamily: 'Ubuntu',
        color: 'white'
    },
    fadedText: {
        width:'100%',
        fontSize: 14,
        fontFamily: 'Ubuntu',
        color: 'white',
        opacity: 0.7
    }
})