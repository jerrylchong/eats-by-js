import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View, BackHandler, Alert, ImageBackground, Dimensions} from "react-native";
import MenuButton from "../component/MenuButton";
import SearchButton from "../container/SearchButton";
import RestaurantButton from "../component/RestaurantButton";
import {getRestaurantsFromApi, getTagsFromApi} from "../helpers/apiHelpers";
import Loading from "../component/Loading";

// currently my db only got title, description, rating
// TODO: cost, tags

function RestaurantList({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        Promise.all([
            getRestaurantsFromApi().then(data => setData(data)),
            getTagsFromApi().then(data => setTags(data.map(x => x.attributes)))
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        const backAction = () => {
            Alert.alert("Exit App", "Are you sure you want to exit the App?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        isLoading
            ? <Loading />
            : <SafeAreaView style = {styles.container}>
                <View style = {styles.navBar}>
                    <MenuButton onPress = {() => navigation.toggleDrawer()}/>
                    <SearchButton />
                </View>
                <ScrollView style = {styles.scroll} contentContainerStyle = {{alignItems: 'center'}}>
                    { data.map((restaurant) =>
                        <RestaurantButton
                            key={restaurant.id}
                            restaurant_id={restaurant.id}
                            name={restaurant.attributes.title}
                            image_url={restaurant.attributes.image_link}
                            cost={"$$$"}
                            description={restaurant.attributes.description}
                            rating={restaurant.attributes.rating}
                            tags={isLoading ? [] : restaurant.relationships.tags.data.map(x => tags[x.id - 1])}
                            onPress={() => navigation.navigate('Restaurant', {restaurant_id: restaurant.id}) }
                        />) }
                </ ScrollView>
            </SafeAreaView>
    )
}

export default RestaurantList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    navBar: {
        flexDirection: 'row',
        height: '10%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        width: '100%',
        backgroundColor: '#eeeeee'
    }
});
