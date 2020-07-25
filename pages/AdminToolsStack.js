import React from 'react';
import {CardStyleInterpolators, createStackNavigator, TransitionSpecs} from "@react-navigation/stack";
import AdminToolsPage from "./AdminToolsPage";
import DeleteRestaurantPage from "./DeleteRestaurantPage";
import EditRestaurantPage from "./EditRestaurantPage"
import AddRestaurantPage from "./AddRestaurantPage";
import EditRestaurantList from "./EditRestaurantList";
import RequestedList from "./RequestedList";
import {AddDishPage} from "./AddDishPage";
import {AddDealPage} from "./AddDealPage";

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
            <Stack.Screen
                name = 'Requested'
                component = {RequestedList}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
            <Stack.Screen
                name = 'Dish'
                component = {AddDishPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
            <Stack.Screen
                name = 'Deal'
                component = {AddDealPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
        </Stack.Navigator>
    )
}

export default AdminToolsStack