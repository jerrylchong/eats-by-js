import React, {useState, useEffect} from 'react';
import {StyleSheet, View, BackHandler, Alert, Dimensions, FlatList, Text} from "react-native";
import SearchButton from "../container/SearchButton";
import RestaurantButton from "../component/RestaurantButton";
import {getTagsFromApi, getPaginatedRestaurantsFromApi} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import _ from "lodash"
import {useSafeArea} from "react-native-safe-area-context";
import * as Location from 'expo-location';
import {connect} from "react-redux";
import {mapReduxDispatchToProps, mapReduxStateToProps} from "../helpers/reduxHelpers";

// currently my db only got title, description, rating
// TODO: cost, tags

function RestaurantList(props) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLastPage, setIsLastPage] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const { navigation } = props;

    useEffect(() => {
        Promise.all([
            getPaginatedRestaurantsFromApi(searchTerm, 1).then(data => {
                setData(data);
                updatePage();
            }),
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

    const fetchMoreRestaurantData = () => {
        if(!isLastPage) {
            setFetching(true);
            getPaginatedRestaurantsFromApi(searchTerm, page).then(moredata => {
                if (moredata.length === 0) {
                    setIsLastPage(true);
                } else {
                    setData([...data, ...moredata]);
                    updatePage();
                }
            }).then(() => setFetching(false))
        }
    }

    const searchRequest = (searchTerm) => {
        setIsLastPage(false);
        getPaginatedRestaurantsFromApi(searchTerm, 1).then(
            data => {
                setData(data);
                setPage(2);
            }

        ).catch(console.error)
    }
    const debouncedSearchFetchRequest = _.debounce(searchRequest,200)

    const handleRefresh = () => {
        setRefreshing(true);
        setIsLastPage(false);
        getPaginatedRestaurantsFromApi(searchTerm,1).then(data => {
            setData(data);
            setPage(2);
        }).then(() => setRefreshing(false))
    }

    const updatePage = () => {
        setPage(page + 1);
    }

    const renderFooter = () => {
        return (
            data.length > 0 &&
            (isLastPage
                ? <Text style={styles.footer}>No More Restaurants</Text>
                : isFetching && <Text style={styles.footer}>Loading...</Text>)
        )
    }

    const clearSearch = () => {
        setSearchTerm("");
    }

    const insets = useSafeArea();

    async function getLocation() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied.')
        }

        let loc = await Location.getCurrentPositionAsync({});
        updateLocation(loc);
    }

    return (
        isLoading
            ? <Loading />
            : <View style = {[
                styles.container,
                {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
            ]}>
                <View style = {styles.navBar}>
                    <SearchButton 
                    navigation = {navigation}
                    searchTerm = {searchTerm}
                    handleSearchTerm = {searchTerm => {
                        setSearchTerm(searchTerm);
                        debouncedSearchFetchRequest(searchTerm);
                    }}
                    clearSearch = {clearSearch}
                    />
                </View>
                <FlatList
                    style = {styles.scroll}
                    contentContainerStyle = {{alignItems: 'center'}}
                    data={data}
                    extraData={data}
                    renderItem={({ item }) =>
                        <RestaurantButton
                            restaurant_id={item.id}
                            name={item.attributes.title}
                            image_url={item.attributes.image_link == null ? "" : item.attributes.image_link}
                            cost={item.attributes.price}
                            description={item.attributes.description}
                            rating={item.attributes.rating}
                            halal={item.attributes.halal_certified}
                            location={item.attributes.location}
                            opening_hours={item.attributes.operating_hours}
                            tags={isLoading ? [] : item.relationships.tags.data.map(x => tags[x.id - 1])}
                            onPress={() => navigation.navigate('Restaurant', {restaurant_id: item.id}) }
                        />}
                    keyExtractor={restaurant => restaurant.id}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={() => <Text>No Restaurants Found</Text>}
                    onEndReached={fetchMoreRestaurantData}
                    onEndReachedThreshold={0.1}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                />
            </View>
    )
}

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(RestaurantList)

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
        marginTop: '2%',
        fontFamily: 'Ubuntu-Bold'
    }
});
