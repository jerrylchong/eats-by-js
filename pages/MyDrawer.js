import React from 'react';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import SettingsPage from "./SettingsPage";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer";
import MyStack from "./MyStack";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle = {{flex: 1, justifyContent: 'space-between'}}>
            <SafeAreaView style = {styles.safe}>
                <DrawerItemList {...props} />
            </SafeAreaView>
            <SafeAreaView style = {styles.safe}>
                <DrawerItem label="Sign Out" onPress={props.signOutHandler} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

const MyDrawer = ({navigation}) => {
    const signOutHandler = () => { navigation.navigate('Welcome')}
    return (
        <Drawer.Navigator
            initialRouteName = 'Home'
            drawerContentOptions={{
                activeTintColor: 'grey',
                itemStyle: {color: 'black'},
            }}
            edgeWidth = {Dimensions.get('window').width * 0.13}
            drawerContent={props => <CustomDrawerContent {...props} signOutHandler={signOutHandler}/>}
             >
            <Drawer.Screen name = 'Home' component = {MyStack} />
            <Drawer.Screen name = 'Settings' component = {SettingsPage} />
        </Drawer.Navigator>
    )
}

export default MyDrawer

const styles = StyleSheet.create({
    safe: {
    }
})