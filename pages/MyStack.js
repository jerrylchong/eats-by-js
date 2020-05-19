import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import RestaurantPage from './RestaurantPage';
import RestaurantList from './RestaurantList';

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'Home'
            screenOptions = {{
                headerShown: false
            }}>
            <Stack.Screen
                name = 'Home'
                component = {RestaurantList}
            />
            <Stack.Screen
                name = 'Restaurant'
                component = {RestaurantPage}
            />
        </Stack.Navigator>
    )
}

export default MyStack