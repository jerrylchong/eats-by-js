import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Text, Button, ImageBackground} from "react-native";
import DishButton from "../component/DishButton";
import Tag from "../component/Tag";
import BackButton from "../component/BackButton";
import {getDishesFromApi, getRestaurantFromApi, getRestaurantTagsFromApi} from "../helpers/apiHelpers";

function RestaurantBanner(props) {
    const {title, tags, location, operatingHours, contact} = props
    return (
        <View style={stylesBanner.container}>
            <Text style={stylesBanner.title}>{title}</Text>
            <View style={stylesBanner.tags}>
                { tags.map((tag,index) => <Tag key={index} name={tag.name}/>) }
            </View>
            <Text style={stylesBanner.description}>Location : {location}</Text>
            <Text style={stylesBanner.description}>Opening Hours : {operatingHours}</Text>
            <Text style={stylesBanner.description}>Contact No : {contact}</Text>
        </View>

    );
}

const stylesBanner = StyleSheet.create({
    container: {
        width: "95%",
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 20,
        paddingHorizontal: 5,
    },
    title: {
        fontWeight: '600',
        fontSize: 30,
    },
    tags: {
        paddingVertical: '4%',
        flexDirection:"row"
    },
    description: {
        color: "#7E7E7E"
    }
})

function RestaurantPage({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [dishes, setDishes] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantTags, setRestaurantTags] = useState([]);

    const {restaurant_id} = route.params;

    useEffect(() => {
        Promise.all([
            getDishesFromApi(restaurant_id).then(data => setDishes(data)),
            getRestaurantFromApi(restaurant_id).then(data => setRestaurantData(data)),
            getRestaurantTagsFromApi(restaurant_id).then(data => setRestaurantTags(data)),
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView style = {styles.container}>
            <ImageBackground style={styles.picture} source={require('../assets/testrestaurant.png')}>
            <BackButton style = {{margin: '3%'}} onPress = {() => navigation.goBack()} />
                </ImageBackground>

            <RestaurantBanner 
                title={isLoading? "Loading..." : restaurantData.attributes.title}
                tags={isLoading ? [] : restaurantTags.map(x => x.attributes)}
                location="UTown Pantry"
                operatingHours="12am to 12.01am"
                contact="+65 9123 1234"
            />

            <View style={{height:"5%"}} />
            

            <Text style={{width:"80%", fontSize: 16}}>Dishes</Text>
            <View style={{width:"90%", height:1, backgroundColor:"black", margin: 15, opacity:0.25}} />
            <ScrollView style = {styles.scroll}>
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
        flex:1.3,
        height:"100%",
        width:"100%",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
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
    },
    scroll: {
        width: '100%'
    }
})
