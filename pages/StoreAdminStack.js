import React from 'react';
import {CardStyleInterpolators, createStackNavigator,} from "@react-navigation/stack";
import StoreAdminPage from "./StoreAdminPage";
import EditRestaurantPage from "./EditRestaurantPage"
import {AddDishPage} from "./AddDishPage";
import {AddDealPage} from "./AddDealPage";

const Stack = createStackNavigator();


const StoreAdminStack = ({route}) => {
    const {restaurant_id} = route.params;
    return (
        <Stack.Navigator
            initialRouteName = 'Home'
            screenOptions = {{
                headerShown: false
            }}>
            <Stack.Screen
                name = 'Home'
                component = {StoreAdminPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                initialParams={{restaurant_id: restaurant_id}}
            />
            <Stack.Screen
                name = 'Edit'
                component = {EditRestaurantPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
                initialParams={{restaurant_id: restaurant_id}}
            />
            <Stack.Screen
                name = 'Dish'
                component = {AddDishPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
                initialParams={{restaurant_id: restaurant_id}}
            />
            <Stack.Screen
                name = 'Deal'
                component = {AddDealPage}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
                initialParams={{restaurant_id: restaurant_id}}
            />
        </Stack.Navigator>
    )
}

export default StoreAdminStack