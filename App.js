import React, {useEffect, useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./pages/MyDrawer";
import WelcomePage from "./pages/WelcomePage";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import RegistrationPage from './pages/RegistrationPage';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer'
import {AsyncStorage, StatusBar} from 'react-native'
import * as Font from "expo-font";
import { AppLoading } from 'expo';

const Stack = createStackNavigator();
const store = createStore(reducer);
const customFonts = {
    'Ubuntu': require('../eats_by_js/assets/fonts/Ubuntu-R.ttf'),
    'Ubuntu-Bold': require('../eats_by_js/assets/fonts/Ubuntu-B.ttf'),
    'Ubuntu-Medium': require('../eats_by_js/assets/fonts/Ubuntu-M.ttf'),
    'Ubuntu-Light': require('../eats_by_js/assets/fonts/Ubuntu-L.ttf')
}

const App = () => {
    const [isLoading, setLoading] = useState(true);

    async function _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setLoading(false);
    }

    useEffect(()=> {
        _loadFontsAsync();
        AsyncStorage.getItem('token')
            .then(token => store.dispatch({
                type: "SET_TOKEN",
                payload: token
            }))
            .catch(console.error)
    }, [])
    if (isLoading) {
        return <AppLoading/>;
    } else {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <StatusBar
                        backgroundColor='white'
                        barStyle="dark-content"
                    />
                    <Stack.Navigator
                        initialRouteName = 'Welcome'
                        screenOptions = {{
                            headerShown: false,
                            gestureEnabled: false
                        }}>
                        <Stack.Screen
                            name = 'Welcome'
                            component = {WelcomePage}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }}
                        />
                        <Stack.Screen
                            name = 'Registration'
                            component = {RegistrationPage}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }}
                        />
                        <Stack.Screen
                            name = 'App'
                            component = {MyDrawer}
                            options={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}

export default App

