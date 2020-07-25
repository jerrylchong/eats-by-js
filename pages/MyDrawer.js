import React from 'react';
import {Dimensions, SafeAreaView, StatusBar, View, Image, Text, Alert, AsyncStorage} from "react-native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer";
import MyStack from "./MyStack";
import RequestRestaurantPage from "./RequestRestaurantPage";
import {mapReduxStateToProps, mapReduxDispatchToProps} from "../helpers/reduxHelpers";
import {connect} from 'react-redux';
import AdminToolsStack from "./AdminToolsStack";
import FeedbackPage from "./FeedbackPage";
import StoreAdminStack from "./StoreAdminStack";

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
                {isLoggedIn
                    ? <DrawerItem
                        label={({focused, color}) =>
                            <View>
                                <Image style={profileStyle} source={require('../assets/facemeh.png')}/>
                                <Text style = {{color: '#b3b3b3',marginLeft: '6%', fontFamily: 'Ubuntu'}}>
                                    Logged in as {user.attributes.username}
                                </Text>
                            </View>
                        }
                        onPress={() => Alert.alert('You','This your face.')}
                        activeTintColor='#ff6961'
                        inactiveTintColor='black' />
                    : <DrawerItem
                    label={({focused, color}) =>
                        <View>
                            <Image style={profileStyle} source={require('../assets/facemeh.png')}/>
                            <Text style = {{color: '#b3b3b3',marginLeft: '6%', fontFamily: 'Ubuntu'}}>Guest</Text>
                        </View>
                    }
                    onPress={() => Alert.alert('You','This your face.')}
                    activeTintColor='#ff6961'
                    inactiveTintColor='black' />
                }
                <DrawerItemList {...props} labelStyle = {{fontFamily: 'Ubuntu'}} />
            </SafeAreaView>
            <View style = {{ alignSelf: 'center', width:'90%', borderTopWidth: 1, borderColor: '#404040' }}/>
            {
                isLoggedIn ?
                    <>
                    <DrawerItem
                        label="Sign Out"
                        onPress={props.signOutHandler}
                        activeTintColor='#ff6961'
                        inactiveTintColor='black'
                        labelStyle = {{fontFamily: 'Ubuntu'}}
                    />
                    </>
                    :
                    <DrawerItem
                        label="Log In"
                        onPress={props.loginHandler}
                        activeTintColor='#ff6961'
                        inactiveTintColor='black'
                        labelStyle = {{fontFamily: 'Ubuntu'}}
                    />
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
            {isLoggedIn && <Drawer.Screen name = 'Request a Store' component = {RequestRestaurantPage} />}
            {(isLoggedIn && user.user_data.attributes.is_admin) &&
            <Drawer.Screen name = 'Admin Tools' component = {AdminToolsStack} />}
            <Drawer.Screen name = 'Leave Feedback' component = {FeedbackPage} />
            {
             (isLoggedIn && user_data.attributes.role == "1") && // boolean to check if store admin
                <Drawer.Screen
                    name='Store Admin Tools'
                    component={StoreAdminStack}
                    initialParams={{restaurant_id: user_data.attributes.restaurant_id == null ? 1 : user_data.attributes.restaurant_id}} // pass in store id here
                />
            }
        </Drawer.Navigator>
    )
}

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(MyDrawer)
