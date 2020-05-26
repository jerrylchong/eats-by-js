import React from 'react';
import {Dimensions, SafeAreaView, StatusBar, View, Image, Text, Alert, AsyncStorage} from "react-native";
import SettingsPage from "./SettingsPage";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer";
import MyStack from "./MyStack";
import AddRestaurantPage from "./AddRestaurantPage";
import {mapReduxStateToProps, mapReduxDispatchToProps} from "../helpers/reduxHelpers";
import {connect} from 'react-redux';

const Drawer = createDrawerNavigator();

const windowWidth = Dimensions.get('window').width
const drawerWidth = windowWidth * 0.67
const windowHeight = Dimensions.get('window').height
const profileStyle = {
    backgroundColor:'#ff6961',
    width: drawerWidth * 0.2,
    height: drawerWidth * 0.2,
    borderRadius: drawerWidth * 0.1,
    marginBottom: windowHeight * 0.01,
    borderWidth: 1,
    borderColor: '#b3b3b3'
}

function CustomDrawerContent(props) {
    const {isLoggedIn, user} = props
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style = {{marginTop: StatusBar.currentHeight}}>
                <DrawerItem
                    label={({focused, color}) =>
                        <Image style={profileStyle} source={require('../assets/facemeh.png')}/>
                    }
                    onPress={() => Alert.alert('About','Jay Chua and Jerryl Chong 2020')}
                    activeTintColor='#ff6961'
                    inactiveTintColor='black' />
                <DrawerItemList {...props} />
            </SafeAreaView>
            <View style = {{ alignSelf: 'center', width:'90%', borderTopWidth: 1, borderColor: '#404040' }}/>
            {
                isLoggedIn ?
                    <>
                    <DrawerItem
                        label="Sign Out"
                        onPress={props.signOutHandler}
                        activeTintColor='#ff6961'
                        inactiveTintColor='black' />
                    <Text style = {{color: '#b3b3b3',marginLeft: '6%'}}>Logged in as {user.attributes.username}</Text>
                    </>
                    :
                    <DrawerItem
                        label="Log In"
                        onPress={props.loginHandler}
                        activeTintColor='#ff6961'
                        inactiveTintColor='black' />
            }
        </DrawerContentScrollView>
    );
}

const MyDrawer = (props) => {
    const { navigation, user, removeUser, removeToken } = props;
    const {isLoggedIn, user_data} = user;
    const signOutHandler = () => {
        removeUser();
        removeToken();
        AsyncStorage.removeItem('token').then( _ => navigation.navigate('Welcome'));
    }

    const loginHandler = () => navigation.navigate('Welcome')
    return (
        <Drawer.Navigator
            initialRouteName = 'Home'
            drawerContentOptions={{
                activeTintColor: '#ff6961',
                inactiveTintColor: '#404040',
                itemStyle: {color: 'black'},
            }}
            edgeWidth = {Dimensions.get('window').width * 0.13}
            drawerStyle = {{width: drawerWidth}}
            drawerContent={props => <CustomDrawerContent {...props} 
                signOutHandler={signOutHandler}
                loginHandler={loginHandler}
                isLoggedIn={isLoggedIn}
                user={user_data}
            />}
             >
            <Drawer.Screen name = 'Home' component = {MyStack} />
            <Drawer.Screen name = 'Settings' component = {SettingsPage} />
            <Drawer.Screen name = 'Add Restaurant' component = {AddRestaurantPage} />
        </Drawer.Navigator>
    )
}

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(MyDrawer)
