import React from 'react';
import {CardStyleInterpolators, createStackNavigator, TransitionSpecs} from "@react-navigation/stack";
import AdminToolsPage from "./AdminToolsPage";
import DeleteRestaurantPage from "./DeleteRestaurantPage";
import EditRestaurantPage from "./EditRestaurantPage"
import AddRestaurantPage from "./AddRestaurantPage";
import EditRestaurantList from "./EditRestaurantList";

const Stack = createStackNavigator();


const AdminToolsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'Home'
            screenOptions = {{
                headerShown: false
            }}>
            <Stack.Screen
                name = 'Home'
                component = {AdminToolsPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />
            <Stack.Screen
                name = 'Delete'
                component = {DeleteRestaurantPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
            <Stack.Screen
                name = 'Edit Store'
                component = {EditRestaurantPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
            <Stack.Screen
                name = 'Add'
                component = {AddRestaurantPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
            <Stack.Screen
                name = 'Edit'
                component = {EditRestaurantList}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
        </Stack.Navigator>
    )
}

export default AdminToolsStack