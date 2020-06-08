import React, {useState, useEffect} from 'react';
import {
    SafeAreaView, StyleSheet, View, Alert, Dimensions, FlatList, Text, TouchableOpacity,
    ImageBackground, AsyncStorage
} from "react-native";
import {getPaginatedRestaurantsFromApi, deleteRestaurant} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import _ from "lodash"
import SearchBarForMenu from "../container/SearchBarForMenu";

// currently my db only got title, description, rating
// TODO: cost, tags

function DeleteRestaurantPage({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setFetching] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        Promise.all([
            getPaginatedRestaurantsFromApi(searchTerm, 1).then(data => {
                setData(data);
                updatePage();
            })
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
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

    return (
        isLoading
            ? <Loading />
            : <SafeAreaView style = {styles.container}>
                <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
                <Text style = {styles.header}>Delete a Restaurant</Text>
                <SearchBarForMenu
                    searchTerm = {searchTerm}
                    handleSearchTerm = {searchTerm => {
                        setSearchTerm(searchTerm);
                        debouncedSearchFetchRequest(searchTerm);
                    }}
                    clearSearch = {clearSearch}
                />
                <FlatList
                    style = {styles.scroll}
                    contentContainerStyle = {{alignItems: 'center'}}
                    data={data}
                    extraData={data}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style = {styles.restaurant}
                            onPress={() =>
                                Alert.alert("Delete Restaurant",
                                    "Are you sure you want to delete " + item.attributes.title + "?",
                                    [
                                        { text: "Cancel",
                                        onPress: () => null,
                                        style: "cancel" },
                                        { text: "YES", onPress: () => {
                                            AsyncStorage.getItem("token")
                                                .then(token => deleteRestaurant(item.id, token))
                                                .then(() => Alert.alert("Success",
                                                    "Restaurant " + item.attributes.title + " deleted."))
                                            } }
                                    ]
                                )
                            }>
                            <Text numberOfLines={1} style = {styles.text}>{item.attributes.title}</Text>
                        </TouchableOpacity>}
                    keyExtractor={restaurant => restaurant.id}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={() => <Text style = {styles.footer}>No Restaurants Found</Text>}
                    onEndReached={fetchMoreRestaurantData}
                    onEndReachedThreshold={0.1}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                />
                <View style = {styles.buttonShadow}>
                    <TouchableOpacity style = {styles.button} onPress = {navigation.goBack}>
                        <Text style = {styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    )
}

export default DeleteRestaurantPage

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
        height: Dimensions.get('window').height * 0.5,
    },
    restaurant: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.08,
        backgroundColor: 'white',
        marginTop: '2%',
        borderRadius: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668
    },
    text:{
        fontFamily: 'Ubuntu',
        marginLeft: '3%',
        marginBottom: '2%',
        color: '#ff6961'
    },
    header: {
        color: '#404040',
        fontSize: 20,
        marginVertical: '5%',
        fontFamily: 'Ubuntu-Medium',
    },
    footer: {
        color: '#ff6961',
        fontSize: 16,
        marginTop: '2%',
        fontFamily: 'Ubuntu-Bold'
    },
    buttonShadow: {
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').width * 0.08,
        backgroundColor: '#ff6961',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: Dimensions.get('window').height * 0.05
    },
    button: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Ubuntu',
    }
});
