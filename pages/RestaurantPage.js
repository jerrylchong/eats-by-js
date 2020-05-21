import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Text, Button, Image} from "react-native";
import DishButton from "../component/DishButton";
import {getDishesFromApi} from "../helpers/apiHelpers";

function RestaurantPage({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        Promise.all([
            getDishesFromApi(route.params.restaurant_id).then(data => setData(data)),
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView style = {styles.container}>
            <Button onPress = {() => navigation.goBack()} title = 'Back' />
            <Image style={styles.picture} source={require('../assets/testrestaurant.png')}/>

            <View style={{display:"flex", justifyContent:"flex-start"}}>
                <Text>Restaurant Title</Text>
                <Text>Tags Tags Tags</Text>
                <Text>Location : Restaurant Address</Text>
                <Text>Opening Hours : 1200 - 1201</Text>
                <Text>Contact No : 1200 - 1201</Text>
            </View>

            <View style={{height:"10%"}} />

            <Text>Dishes</Text>
            <ScrollView>
                { data.map((dish) =>
                    <DishButton
                        key={dish.id}
                        title={dish.attributes.title}
                        description={dish.attributes.description}
                        price={dish.attributes.price}
                    />

                ) }
            </ ScrollView>
        </SafeAreaView>);
}

export default RestaurantPage

const styles = StyleSheet.create({
    picture: {
        height: '30%',
        width: '100%',
        padding: 5
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
})
