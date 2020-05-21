import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Text, Button, Image} from "react-native";
import DishButton from "../component/DishButton";
import {getDishesFromApi, getRestaurantTagsFromApi} from "../helpers/apiHelpers";
import BackButton from "../component/BackButton";
import Tag from "../component/Tag";

function RestaurantPage({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [dishes, setDishes] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        Promise.all([
            getDishesFromApi(route.params.restaurant_id).then(data => setDishes(data)),
            getRestaurantTagsFromApi(route.params.restaurant_id).then(data => setTags(data)),
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView style = {styles.container}>
            <Image style={styles.picture} source={require('../assets/testrestaurant.png')}/>
            <BackButton style = {{position: 'absolute', top: 10, left: 10}} onPress = {() => navigation.goBack()} />
            <View style={styles.header}>
                <Text style = {styles.title}>Restaurant Title</Text>
                <View style = {styles.tags}>
                    { tags.map((elem, index) =>
                        <Tag
                            key={`tag-${index}`}
                            name={elem.attributes.name}
                        />
                    ) }
                </View>
                <Text style = {styles.desc}>Location : Restaurant Address</Text>
                <Text style = {styles.desc}>Opening Hours : 1200 - 1201</Text>
                <Text style = {styles.desc}>Contact No : 1200 - 1201</Text>
            </View>

            <View style={{height:"10%"}} />

            <Text>Dishes</Text>
            <ScrollView>
                { dishes.map((dish) =>
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
    header: {
        width:'100%',
        alignItems:'flex-start',
        padding: '2%'
    },
    title: {
        fontSize: 22,
        marginLeft: 5
    },
    desc: {
        fontSize: 14,
        color: 'grey',
        marginLeft: 5
    },
    tags: {
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginBottom: 5
    }
})
