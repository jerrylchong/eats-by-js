import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";

const Tab = createMaterialBottomTabNavigator();

function HomeTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="List" component={RestaurantList} />
            <Tab.Screen name="Map" component={RestaurantMap} />
        </Tab.Navigator>
    );
}

export default HomeTab