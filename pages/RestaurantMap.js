import React, { useState, useEffect } from "react";

import MapView, {PROVIDER_GOOGLE, Marker, UrlTile} from "react-native-maps";
import {SafeAreaView, StyleSheet, View, Image, Alert, BackHandler} from "react-native";
import SearchButton from "../container/SearchButton";
import {getRestaurantsFromApi} from "../helpers/apiHelpers";
import Loading from "../component/Loading";


const RestaurantMap = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [camera, setCamera] = useState()

    useEffect(() => {
        Promise.all([
            getRestaurantsFromApi().then(data => {
                setData(data);
            }),
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
        isLoading ? <Loading/>
        :
        <SafeAreaView style = {styles.container}>
            <View style = {styles.navBar}>
                <SearchButton
                    navigation = {navigation}
                    searchTerm = {searchTerm}
                    handleSearchTerm = {searchTerm => {
                    }}
                />
            </View>
            <MapView
                style={{height: '94.5%', width: '100%' }}
                camera={{
                    center: {
                        latitude: 1.296643,
                        longitude: 103.776398
                    },
                    pitch: 0,
                    heading: 1,
                    altitude: 200,
                    zoom: 16
                }}
                provider={PROVIDER_GOOGLE}
                mapType={'none'}
                showsUserLocation={true}
                maxZoomLevel={19.3}
            >
                <UrlTile 
                    urlTemplate={"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <Marker
                    coordinate={{
                        latitude: 1.296643,
                        longitude: 103.776398
                    }}
                    onPress={() => navigation.navigate('Restaurant', {restaurant_id: 1})}
                >
                    <View style = {styles.marker}>
                        <Image style = {styles.image} source={require('../assets/testrestaurant.png')}/>
                    </View>
                </Marker>
            </MapView>
        </SafeAreaView>
    );
};

export default RestaurantMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        height: '10%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#ff6961',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 26,
        width: 26,
        borderRadius: 13
    }
});
