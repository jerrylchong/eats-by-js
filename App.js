import React, {useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./pages/MyDrawer";
import WelcomePage from "./pages/WelcomePage";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import RegistrationPage from './pages/RegistrationPage';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer'
import {AsyncStorage} from 'react-native'

const Stack = createStackNavigator();
const store = createStore(reducer);

const App = () => {
    useEffect(()=> {
        AsyncStorage.getItem('token')
            .then(token => store.dispatch({
                type: "SET_TOKEN",
                payload: token
            }))
            .catch(console.error)
    }, [])
  return (
      <Provider store={store}>
          <NavigationContainer>
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

export default App

