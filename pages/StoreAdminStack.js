import React from 'react';
import {CardStyleInterpolators, createStackNavigator,} from "@react-navigation/stack";
import StoreAdminPage from "./StoreAdminPage";
import EditRestaurantPage from "./EditRestaurantPage"

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
        </Stack.Navigator>
    )
}

export default StoreAdminStack