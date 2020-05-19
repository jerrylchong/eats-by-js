import React from 'react';
import SettingsPage from "./SettingsPage";
import {createDrawerNavigator} from "@react-navigation/drawer";
import MyStack from "./MyStack";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName = 'Home'>
            <Drawer.Screen name = 'Home' component = {MyStack} />
            <Drawer.Screen name = 'Settings' component = {SettingsPage} />
        </Drawer.Navigator>
    )
}

export default MyDrawer