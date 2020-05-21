import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import MenuButton from "../component/MenuButton";
import SearchButton from "../container/SearchButton";
import RestaurantButton from "../component/RestaurantButton";
import {getRestaurantsFromApi, getTagsFromApi} from "../helpers/apiHelpers";

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
    }, []);

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.navBar}>
                <MenuButton onPress = {() => navigation.toggleDrawer()}/>
                <SearchButton />
            </View>
            <ScrollView>
                { data.map((restaurant) =>
                    <RestaurantButton
                        key={restaurant.id}
                        restaurant_id={restaurant.id}
                        name={restaurant.attributes.title}
                        cost={"$$$"}
                        description={restaurant.attributes.description}
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    navBar: {
        flexDirection: 'row',
        height: 95,
        width: 375,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    }
});
