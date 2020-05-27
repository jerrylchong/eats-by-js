import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, BackHandler, Alert, ImageBackground, Dimensions, FlatList, Text} from "react-native";
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

    const renderFooter = () => {
        return <Text style = {styles.footer}>No more already lah!</Text>
    };

    return (
        isLoading
            ? <Loading />
            : <SafeAreaView style = {styles.container}>
                <View style = {styles.navBar}>
                    <SearchButton navigation = {navigation}/>
                </View>
                <FlatList
                    style = {styles.scroll}
                    contentContainerStyle = {{alignItems: 'center'}}
                    data={data}
                    renderItem={({ item }) =>
                        <RestaurantButton
                            restaurant_id={item.id}
                            name={item.attributes.title}
                            image_url={item.attributes.image_link}
                            cost={'10'}
                            description={item.attributes.description}
                            rating={item.attributes.rating}
                            tags={isLoading ? [] : item.relationships.tags.data.map(x => tags[x.id - 1])}
                            onPress={() => navigation.navigate('Restaurant', {restaurant_id: item.id}) }
                        />}
                    keyExtractor={restaurant => restaurant.id}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={() => <Text>No Restaurants Found</Text>}
                />
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
    },
    footer: {
        color: '#ff6961',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: '2%'
    }
});
