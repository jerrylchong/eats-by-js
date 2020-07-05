import React, { useState, useEffect } from "react";

import MapView, {PROVIDER_GOOGLE, Marker, UrlTile} from "react-native-maps";
import {
    SafeAreaView, StyleSheet, View, Image, Alert, BackHandler, Dimensions, Animated, Text, TouchableOpacity,
    Platform, AsyncStorage

} from "react-native";
import SearchButton from "../container/SearchButton";
import {getRestaurantsFromApi, getPaginatedRestaurantsFromApi, getTagsFromApi} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import * as Location from "expo-location";
import {connect} from "react-redux";
import {mapReduxDispatchToProps, mapReduxStateToProps} from "../helpers/reduxHelpers";
import _ from "lodash";

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class RestaurantMap extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
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
                zoom: 15.5
            },
            error: false,
            locationOff: false,
            tags: [],
            tagFilters: []
        };
        this.props = props;
    }

    animation = new Animated.Value(0);
    index = 0;

    toggleCards = () => {
        let curr = this.state.toggled;
        this.setState({toggled: !curr});
    }

    async getLocation() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            // permission for user location not enabled
            this.setState({error: true})
        } else {
            this.setState({error: false})
            await Location.hasServicesEnabledAsync()
                .then(bool => this.locStatus = bool);
            if (this.locStatus) {
                this.setState({error: false, locationOff: false})
                let loc = await Location.getCurrentPositionAsync({});
                this.props.updateLocation(loc);
            } else {
                this.setState({locationOff: true})
                Alert.alert("Location Services Turned Off", "Please turn on Location Services.")
            }
        }
    }

    userLocation = () => {
        if (this.state.error) {
            Alert.alert("Location Permission", "Please enable permissions for Location.\n" +
                "For Android Users: Please go into App Settings to enable Location permissions if not prompted after pressing " +
                "'Enable'.",
                [
                    { text: "Cancel",
                        onPress: () => null,
                        style: "cancel" },
                    { text: "Enable", onPress: () => {
                            this.getLocation() // prompts for location permission and stores location in Redux
                        }
                    }
                ])
        } else {
            this.getLocation() // update location stored in Redux to latest location
                .then(() => !this.state.locationOff && this.map.animateCamera( // moves camera to user location
                    {
                        center: {
                            latitude: this.props.location.coords.lat,
                            longitude: this.props.location.coords.lng
                        },
                        pitch: this.state.camera.pitch,
                        altitude: this.state.camera.altitude,
                        heading: this.state.camera.heading,
                        zoom: 17.5
                    },
                ))
        }

    }

    componentDidMount() {
        Promise.all([
            this.getLocation(),
            getTagsFromApi().then(data => this.setState({tags: data})),
        ])
            .then(() => {
                if(this.props.location.hasLocation) {
                    getPaginatedRestaurantsFromApi(this.state.searchTerm, 1, 100, this.props.location.coords)
                        .then(data => {
                            this.setState({data: data});
                        })
                } else {
                    getRestaurantsFromApi().then(data => {
                        this.setState({data: data});
                    })
                }
            })
            .catch((error) => console.error(error))
            .finally(() => this.setState({isLoading: false}));

        this.animation.addListener(({value}) => {
            let index = Math.floor(value / (CARD_WIDTH + 20) + 0.3);
            if (index >= this.state.data.length) {
                index = this.state.data.length - 1;
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
                                latitude: this.state.data[index].attributes.latitude == null ? 1.296643 : parseFloat(this.state.data[index].attributes.latitude),
                                longitude: this.state.data[index].attributes.longitude == null ? 103.776398 : parseFloat(this.state.data[index].attributes.longitude)
                            },
                            pitch: this.state.camera.pitch,
                            altitude: this.state.camera.altitude,
                            heading: this.state.camera.heading,
                            zoom: 18
                        },
                        350
                    );
                }
            })
        }, 10);
    }

    searchRequest = (searchTerm) => {
        getPaginatedRestaurantsFromApi(searchTerm, 1, 100, this.props.location.coords)
            .then(data => {
                this.setState({data: data});
            })
            .catch(console.error)
    }

    debouncedSearchFetchRequest = _.debounce(this.searchRequest,200)

    clearSearch = () => {
        this.setState({searchTerm: ''});
        getPaginatedRestaurantsFromApi('', 1, 100, this.props.location.coords)
            .then(data => {
                this.setState({data: data});
            })
            .catch(console.error)
    }

    sortByLocation = () => {
        if (this.state.error) {
            Alert.alert("Location Permission", "Please enable permissions for Location.\n" +
                "For Android Users: Please go into App Settings to enable Location permissions if not prompted after pressing " +
                "'Enable'.",
                [
                    { text: "Cancel",
                        onPress: () => null,
                        style: "cancel" },
                    { text: "Enable", onPress: () => {
                            this.getLocation() // prompts for location permission and stores location in Redux
                        }
                    }
                ])
        } else {
            this.setState({isLoading: true})
            this.getLocation()
                .then(() => {
                    getPaginatedRestaurantsFromApi(this.state.searchTerm, 1, 100, this.props.location.coords).then(
                        data => this.setState({data: data})
                    ).catch(console.error)
                })
                .then(() => this.setState({isLoading: false}))
        }
    }

    render() {
        const {isLoading, searchTerm, data, toggled, tags, tagFilters} = this.state;
        const {navigation, location} = this.props;
        const interpolations = data.map((marker, index) => {
            const inputRange = [
                (index - 1) * (CARD_WIDTH + 20) + 10,
                index * (CARD_WIDTH + 20) + 10,
                (index + 1) * (CARD_WIDTH + 20) + 10
            ];
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: 'clamp'
            });
            return { opacity };
        });


        return (
            isLoading ? <Loading/>
                :
                <SafeAreaView style = {styles.container}>
                    <View style = {styles.navBar}>
                        <SearchButton
                            navigation = {navigation}
                            searchTerm = {this.state.searchTerm}
                            handleSearchTerm = {searchTerm => {
                                this.setState({searchTerm: searchTerm});
                                this.debouncedSearchFetchRequest(searchTerm);
                            }}
                            clearSearch = {this.clearSearch}
                            tagAutoCompleteOptions={tags.map(x => x.attributes)}
                            setTagFilters={tags => this.setState({tagFilters: tags})}
                            tagFilters={tagFilters || []}
                            suggestions={["korean", "chinese", "noodles"]}
                            sortByLocation={this.sortByLocation}
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
                            data.map((restaurant, index) => {
                                const opacityStyle = {
                                    opacity: interpolations[index].opacity
                                };
                                return (
                                    <Marker
                                        key={restaurant.id}
                                        coordinate={{
                                            latitude: restaurant.attributes.latitude == null ? 1.296643 : parseFloat(restaurant.attributes.latitude),
                                            longitude: restaurant.attributes.longitude == null ? 103.776398 : parseFloat(restaurant.attributes.longitude)
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
                        snapToInterval={CARD_WIDTH + 20}
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
                        {data.map((marker, index) => (
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
                                                {marker.attributes.operating_hours}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        )}
                    </Animated.ScrollView>
                    }
                    <TouchableOpacity style={styles.toggle} onPress={this.toggleCards}>
                        <Image style={styles.buttonImage} source={require('../assets/cardswhite.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.locationButton} onPress={this.userLocation}>
                        <Image style={styles.locationImage} source={require('../assets/location.png')}/>
                    </TouchableOpacity>
                </SafeAreaView>
        )
    }
}

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(RestaurantMap)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        minHeight: Math.round(Dimensions.get('window').height) * 0.9
    },
    navBar: {
        flexDirection: 'row',
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
        paddingRight: width - (CARD_WIDTH + 20 + 10),
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
        fontFamily: 'Ubuntu-Medium',
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
        fontFamily: 'Ubuntu'
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
        borderColor: '#404040',
        borderWidth: 1,
    },
    toggle: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: width * 0.1,
        backgroundColor: '#ff6961',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        elevation: 2
    },
    locationButton: {
        position: 'absolute',
        bottom: '15%',
        right: '5%',
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: width * 0.1,
        backgroundColor: '#ff6961',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        elevation: 2
    },
    buttonImage: {
        height: Dimensions.get('window').width * 0.1,
        width: Dimensions.get('window').width * 0.1,
    },
    locationImage: {
        height: Dimensions.get('window').width * 0.07,
        width: Dimensions.get('window').width * 0.07,
    }
});
