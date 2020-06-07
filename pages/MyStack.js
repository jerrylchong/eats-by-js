import React from 'react';
import {CardStyleInterpolators, createStackNavigator, TransitionSpecs} from "@react-navigation/stack";
import RestaurantPage from './RestaurantPage';
import RestaurantList from './RestaurantList';
import AddReviewPage from "./AddReviewPage";
import DeleteRestaurantPage from "./DeleteRestaurantPage";
import EditRestaurantPage from "./EditRestaurantPage"

const Stack = createStackNavigator();


const MyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName = 'Home'
            screenOptions = {{
                headerShown: false
            }}>
            <Stack.Screen
                name = 'Home'
                component = {RestaurantList}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />
            <Stack.Screen
                name = 'Restaurant'
                component = {RestaurantPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
            <Stack.Screen
                name = 'Add Review'
                component = {AddReviewPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
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
                name = 'Edit'
                component = {EditRestaurantPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            />
        </Stack.Navigator>
    )
}

export default MyStack