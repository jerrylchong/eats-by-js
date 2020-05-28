import React from 'react';
import {CardStyleInterpolators, createStackNavigator, TransitionSpecs} from "@react-navigation/stack";
import RestaurantPage from './RestaurantPage';
import HomeTab from "./HomeTab";
import AddReviewPage from "./AddReviewPage";

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
                component = {HomeTab}
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
        </Stack.Navigator>
    )
}

export default MyStack