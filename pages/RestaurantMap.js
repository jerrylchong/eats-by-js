import React, { useState, useEffect } from "react";

import MapView, {PROVIDER_GOOGLE, Marker, UrlTile} from "react-native-maps";
import {SafeAreaView, StyleSheet, View, Image, Alert, BackHandler} from "react-native";
import SearchButton from "../container/SearchButton";
import {getRestaurantsFromApi} from "../helpers/apiHelpers";
import Loading from "../component/Loading";

const fakeRestaurantData = [
    {
        "id": "4",
        "type": "restaurant",
        "attributes": {
            "title": "Arise & Shine",
            "description": "Our mission has been to help people achieve their health and wellness goals. though weve changed over the years, our values have remained the same.",
            "rating": -1,
            "price": "5",
            "image_link": "https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/E4-Arise-n-Shine-2-1024x768.jpg",
            "location": "Engineering Block E4",
            "operating_hours": "Mon-Fri, 7.00am-8.00pm\nSat/Sun/PH, 7.00am-3.00pm",
            "no_of_stalls": 0,
            "halal_certified": false,
            "closed_on": "N/A",
            "contact": "N/A",
            "latitude": 1.29919361,
            "longitude": 103.7715903,
        },
        "relationships": {
            "dishes": {
                "data": []
            },
            "tags": {
                "data": []
            },
            "reviews": {
                "data": []
            }
        }
    },
    {
        "id": "8",
        "type": "restaurant",
        "attributes": {
            "title": "Cafe Delight",
            "description": "Delhaize Group will achieve leading positions in food retailing in key mature and emerging markets. We accomplish our goal by developing strong regional companies benefiting from and contributing to the Groups strength, expertise and successful practices. Delhaize Group goes to market with a variety of food store formats. The Group is committed to offer a locally differentiated shopping experience to its customers in each of its markets, to deliver superior value and to maintain high social, environmental and ethical standards.",
            "rating": -1,
            "price": "5",
            "image_link": "https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/DSC_0462-1024x576.jpg",
            "location": "Ventus",
            "operating_hours": "Mon-Fri, 8.00am-6.00pm",
            "no_of_stalls": 0,
            "halal_certified": false,
            "closed_on": "0001",
            "contact": "N/A",
            "latitude": 1.2952625,
            "longitude": 103.7701902,
        },
        "relationships": {
            "dishes": {
                "data": []
            },
            "tags": {
                "data": []
            },
            "reviews": {
                "data": []
            }
        }
    },
    {
        "id": "9",
        "type": "restaurant",
        "attributes": {
            "title": "Central Square",
            "description": "To deliver an exceptional shopping experience by offering the best service, value, quality, and freshest products while being good stewards of our environment and giving back to the communities we serve.",
            "rating": -1,
            "price": "5",
            "image_link": "https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/Central-Square-Edited-1024x684.jpg",
            "location": "Yusof Ishak House Level 2",
            "operating_hours": "Mon-Fri, 8.00am-8.00pm\nSat, 8.00am-3.00pm",
            "no_of_stalls": null,
            "halal_certified": false,
            "closed_on": "1001",
            "contact": "N/A",
            "latitude": 1.2986134,
            "longitude": 103.7749627,

        },
        "relationships": {
            "dishes": {
                "data": []
            },
            "tags": {
                "data": []
            },
            "reviews": {
                "data": []
            }
        }
    },
    {
        "id": "10",
        "type": "restaurant",
        "attributes": {
            "title": "Crave",
            "description": "We earn the loyalty of the people we serve by first anticipating, then fulfilling their needs with our superior-quality products, a unique shopping experience, customer-focused service and continuous innovation, while generating long-term profitable growth for our shareholders.",
            "rating": -1,
            "price": "5",
            "image_link": "https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2019/07/Crave-1024x768.jpg",
            "location": "Yusof Ishak House",
            "operating_hours": "Mon-Fri, 9.00am-8.00pm\nSat, 9.00am-6.00pm\nVacation Operating Hours:\nMon-Sat, 9.00am-6.00pm",
            "no_of_stalls": 0,
            "halal_certified": false,
            "closed_on": "1001",
            "contact": "N/A",
            "latitude": 1.2987242,
            "longitude": 103.7749499,
        },
        "relationships": {
            "dishes": {
                "data": []
            },
            "tags": {
                "data": []
            },
            "reviews": {
                "data": []
            }
        }
    },
];

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
                    zoom: 18
                }}
                provider={PROVIDER_GOOGLE}
                mapType={'none'}
                showsUserLocation={true}
                maxZoomLevel={19.3}
            >
                <UrlTile 
                    urlTemplate={"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    maximumZ={19}
                />
                {
                    fakeRestaurantData.map(restaurant => {
                        return (
                            <Marker
                                key={restaurant.id}
                                coordinate={{
                                    latitude: restaurant.attributes.latitude,
                                    longitude: restaurant.attributes.longitude
                                }}
                                onPress={() => navigation.navigate('Restaurant', {restaurant_id: restaurant.id})}
                            >
                                <View style = {styles.marker}>
                                    <Image style = {styles.image} source={{uri: restaurant.attributes.image_link}}/>
                                </View>
                            </Marker>
                        )
                    })
                }
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
