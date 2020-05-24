import React from 'react';
import {Dimensions, SafeAreaView, StatusBar, View, Image, Text, Alert} from "react-native";
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
                <DrawerItem
                    label={({ focused, color }) =>
                        <Image style={{width: 50, height: 50, marginBottom: '10%'}} source={require('../assets/templogonameless.png')}/>}
                    onPress={() => Alert.alert('About','Jay Chua and Jerryl Chong 2020')}
                    activeTintColor='#ff6961'
                    inactiveTintColor='black' />
                <DrawerItemList {...props} />
            </SafeAreaView>
            <View style = {{ alignSelf: 'center', width:'90%', borderTopWidth: 1, borderColor: '#404040' }}/>
            <DrawerItem
                label="Sign Out"
                onPress={props.signOutHandler}
                activeTintColor='#ff6961'
                inactiveTintColor='black' />
            {isLoggedin && <Text style = {{color: '#b3b3b3',marginLeft: '6%'}}>Logged in as user</Text>}
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
