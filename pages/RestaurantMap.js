import React, { useState, useEffect } from "react";

import MapView, {PROVIDER_GOOGLE, Marker, UrlTile} from "react-native-maps";
import {SafeAreaView, StyleSheet, View, Image, Alert, BackHandler, Dimensions, Animated, Text, TouchableOpacity,
    Platform

} from "react-native";
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
const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class RestaurantMap extends React.Component {
    state = {
        searchTerm: '',
        data: [],
        isLoading: true,
        camera: {
            center: {
                latitude: 1.296643,
                longitude: 103.776398
            },
            pitch: 0,
            heading: 1,
            altitude: 200,
            zoom: 18
        },
    }
    animation = new Animated.Value(0);
    index = 0;

    toggleCards = () => {
        let curr = this.state.toggled;
        this.setState({toggled: !curr});
        {/* supposed to move camera to first store and put it back in focus (but doesn't work)
        this.index = 0; // focus on first store -> make it opaque and the rest translucent
        // if cards are being switched on, move camera to first store
            (!curr &&
                this.map.animateCamera(
                    {
                        center: {
                            latitude: fakeRestaurantData[0].attributes.latitude,
                            longitude: fakeRestaurantData[0].attributes.longitude,
                        },
                        pitch: this.state.camera.pitch,
                        altitude: this.state.camera.altitude,
                        heading: this.state.camera.heading,
                        zoom: 18
                    },
                )
            )
        */
        }
    }

    componentDidMount() {
        Promise.all([
            getRestaurantsFromApi().then(data => {
                this.setState({data: data});
            }),
        ])
            .catch((error) => console.error(error))
            .finally(() => this.setState({isLoading: false}));

        this.animation.addListener(({value}) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= fakeRestaurantData.length) {
                index = fakeRestaurantData.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    this.map.animateCamera(
                        {
                            center: {
                                latitude: fakeRestaurantData[index].attributes.latitude,
                                longitude: fakeRestaurantData[index].attributes.longitude,
                            },
                            pitch: this.state.camera.pitch,
                            altitude: this.state.camera.altitude,
                            heading: this.state.camera.heading,
                            zoom: 19
                        },
                        350
                    );
                }
            })
        }, 10);
    }

    render() {
        const interpolations = fakeRestaurantData.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH
            ];
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: 'clamp'
            });
            return { opacity };
        });

        const {isLoading, searchTerm, data, toggled} = this.state;
        const {navigation} = this.props;

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
                        ref={map => this.map = map}
                        style={{height: '94.5%', width: '100%' }}
                        camera={this.state.camera}
                        provider={PROVIDER_GOOGLE}
                        mapType={'none'}
                        showsUserLocation={true}
                        maxZoomLevel={19.3}
                        showsCompass={false}
                        showsMyLocationButton={false}
                    >
                        <UrlTile
                            urlTemplate={"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                            maximumZ={19}
                        />
                        {
                            fakeRestaurantData.map((restaurant, index) => {
                                const opacityStyle = {
                                    opacity: interpolations[index].opacity
                                };
                                return (
                                    <Marker
                                        key={restaurant.id}
                                        coordinate={{
                                            latitude: restaurant.attributes.latitude,
                                            longitude: restaurant.attributes.longitude
                                        }}
                                        onPress={() => {navigation.navigate('Restaurant',
                                            {restaurant_id: restaurant.id})
                                        }}
                                    >
                                        <Animated.View style={[styles.markerWrap, (toggled && opacityStyle)]}>
                                            <View style={styles.markerNew}/>
                                        </Animated.View>
                                    </Marker>
                                )
                            })
                        }
                    </MapView>
                    {toggled &&
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH}
                        bounces={false}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: this.animation
                                        }
                                    }
                                }
                            ],
                            { useNativeDriver: true }
                        )}
                        style={styles.scrollView}
                        contentContainerStyle={styles.endPadding}
                    >
                        {fakeRestaurantData.map((marker, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        navigation.navigate('Restaurant', {restaurant_id: marker.id})
                                    }}
                                >
                                    <View style={styles.card}>
                                        <Image
                                            source={{uri: marker.attributes.image_link}}
                                            style={styles.cardImage}
                                            resizeMode='cover'
                                        />
                                        <View style={styles.textContent}>
                                            <Text numberOfLines={1} style={styles.cardTitle}>{marker.attributes.title}</Text>
                                            <Text numberOfLines={1} style={styles.cardDescription}>
                                                {marker.attributes.description}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        )}
                    </Animated.ScrollView>
                    }
                    <TouchableOpacity style={styles.toggle} onPress={this.toggleCards}>
                        {/* image goes here */}
                    </TouchableOpacity>
                </SafeAreaView>
        )
    }
}

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
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - (CARD_WIDTH * 1.6),
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    markerNew: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: "#ff6961",
    },
    toggle: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: width * 0.1,
        backgroundColor: '#ff6961',
    }
});
