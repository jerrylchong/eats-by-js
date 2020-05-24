import React from 'react';
import {Dimensions, SafeAreaView, StatusBar, View, StyleSheet, Text} from "react-native";
import SettingsPage from "./SettingsPage";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer";
import MyStack from "./MyStack";
import AddRestaurantPage from "./AddRestaurantPage";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const isLoggedin = true;
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style = {{ marginTop: StatusBar.currentHeight, marginBottom: '5%' }}>
                <DrawerItemList {...props} />
            </SafeAreaView>
            <View style = {{ alignSelf: 'center', width:'90%', borderTopWidth: 1, borderColor: 'grey' }}/>
            <DrawerItem
                label="Sign Out"
                onPress={props.signOutHandler}
                activeTintColor='black'
                inactiveTintColor='black' />
            {isLoggedin && <Text>Logged in as user</Text>}
        </DrawerContentScrollView>
    );
}

const MyDrawer = ({navigation}) => {
    const signOutHandler = () => navigation.navigate('Welcome')
    return (
        <Drawer.Navigator
            initialRouteName = 'Home'
            drawerContentOptions={{
                activeTintColor: '#ff6961',
                inactiveTintColor: '#404040',
                itemStyle: {color: 'black'},
            }}
            edgeWidth = {Dimensions.get('window').width * 0.13}
            drawerContent={props => <CustomDrawerContent {...props} signOutHandler={signOutHandler}/>}
             >
            <Drawer.Screen name = 'Home' component = {MyStack} />
            <Drawer.Screen name = 'Settings' component = {SettingsPage} />
            <Drawer.Screen name = 'Add Restaurant' component = {AddRestaurantPage} />
        </Drawer.Navigator>
    )
}

export default MyDrawer

const styles = StyleSheet.create({
    safe: {
    }
})
