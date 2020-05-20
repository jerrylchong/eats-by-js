import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import MenuButton from "../component/MenuButton";
import SearchButton from "../container/SearchButton";
import RestaurantButton from "../component/RestaurantButton";
import {getRestaurantsFromApi} from "../helpers/apiHelpers";

// currently my db only got title, description, rating
// TODO: cost, tags


function RestaurantList({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        getRestaurantsFromApi()
            .then(data => setData(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    console.log(data);
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.navBar}>
                <MenuButton onPress = {() => navigation.toggleDrawer()}/>
                <SearchButton />
            </View>
            <ScrollView>
                { data.map((elem) =>
                    <RestaurantButton
                        key={`${elem.title}-button`}
                        name={elem.title}
                        cost={"$$$"}
                        description={elem.description}
                        tags={[{name:'jerryl'}, {name:'tomyum'}]}
                        onPress={() => navigation.navigate('Restaurant')}
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
