import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./pages/MyDrawer";
import WelcomePage from "./pages/WelcomePage";
import {createStackNavigator} from "@react-navigation/stack";
import Loading from "./component/Loading";
import RegistrationPage from './pages/RegistrationPage';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer'

const Stack = createStackNavigator();
const store = createStore(reducer);

const App = () => {
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
                  />
                  <Stack.Screen
                      name = 'Registration'
                      component = {RegistrationPage}
                  />
                  <Stack.Screen
                      name = 'App'
                      component = {MyDrawer}
                  />
                  <Stack.Screen
                      name = 'Loading'
                      component = {Loading}
                  />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  )
}

export default App

