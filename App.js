import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./pages/MyDrawer";
import WelcomePage from "./pages/WelcomePage";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
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
                  name = 'App'
                  component = {MyDrawer}
              />
          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App

