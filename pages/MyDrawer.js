import React from 'react';
import {Dimensions} from "react-native";
import SettingsPage from "./SettingsPage";
import {createDrawerNavigator} from "@react-navigation/drawer";
import MyStack from "./MyStack";
import AddRestaurantPage from "./AddRestaurantPage";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName = 'Home'
            drawerContentOptions={{
                activeTintColor: 'grey',
                itemStyle: {color: 'black'},
            }}
            edgeWidth = {Dimensions.get('window').width * 0.13}
             >
            <Drawer.Screen name = 'Home' component = {MyStack} />
            <Drawer.Screen name = 'Settings' component = {SettingsPage} />
            <Drawer.Screen name = 'Add Restaurant' component = {AddRestaurantPage} />
        </Drawer.Navigator>
    )
}

export default MyDrawer