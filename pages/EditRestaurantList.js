import React, {useState, useEffect} from 'react';
import {
    StyleSheet, View, Alert, Dimensions, FlatList, Text, AsyncStorage, Platform, BackHandler
} from "react-native";
import {getPaginatedRestaurantsFromApi, deleteRestaurant} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import _ from "lodash"
import SearchBarForMenu from "../container/SearchBarForMenu";
import BackButton from "../component/BackButton";
import {useSafeArea} from "react-native-safe-area-context";
import Tag from "../component/Tag";

function EditRestaurantList({ navigation }) {
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

        const backAction = () => {
            navigation.goBack();
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
        getPaginatedRestaurantsFromApi(searchTerm, 1).then(data => {
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
                ? <Text style={styles.footer}>No More Stores</Text>
                : isFetching && <Text style={styles.footer}>Loading...</Text>)
        )
    }

    const clearSearch = () => {
        setSearchTerm("");
    }

    const insets = useSafeArea();

    return (
        isLoading
            ? <Loading />
            : <View style = {[
                styles.container,
                {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, paddingBottom: insets.bottom}
            ]}>
                <BackButton white={false} style={styles.back} onPress={navigation.goBack}/>
                <Text style = {styles.header}>Edit a Store</Text>
                <SearchBarForMenu
                    style={styles.navBar}
                    searchTerm = {searchTerm}
                    handleSearchTerm = {searchTerm => {
                        setSearchTerm(searchTerm);
                        debouncedSearchFetchRequest(searchTerm);
                    }}
                    clearSearch = {clearSearch}
                />
                <FlatList
                    style = {styles.scroll}
                    contentContainerStyle = {{alignItems: 'center', paddingBottom: '25%'}}
                    data={data}
                    extraData={data}
                    renderItem={({ item }) =>
                        <View style = {styles.restaurant}>
                            <Text numberOfLines={1} style = {styles.text}>{item.attributes.title}</Text>
                            <Tag
                                style={{marginRight: '3%'}}
                                name="Edit"
                                onPress={() =>
                                    navigation.navigate("Edit Store", {restaurant_id: item.id})
                                }
                            />
                        </View>}
                    keyExtractor={(item, index) => String(index)}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={() => <Text style = {styles.footer}>No Stores Found</Text>}
                    onEndReached={fetchMoreRestaurantData}
                    onEndReachedThreshold={0.1}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                />
            </View>
    )
}

export default EditRestaurantList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: Math.round(Dimensions.get('window').height)
    },
    navBar: {
        position: 'relative',
        top: '15%',
    },
    scroll: {
        position: 'relative',
        top: '10%',
        width: '100%',
        height: Dimensions.get('window').height * 0.1,
        borderTopWidth: 0.5,
        borderColor: '#b3b3b3'
    },
    restaurant: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.08,
        borderBottomWidth: 0.5,
        borderColor: '#b3b3b3'
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
        color: '#ff6961'
    },
    back: {
        position: 'absolute',
        top: '5%',
        left: '2%'
    },
    header: {
        position: 'relative',
        top: '5%',
        fontSize: 20,
        marginTop: '5%',
        fontFamily: 'Ubuntu-Medium'
    },
    footer: {
        color: '#c74a44',
        fontSize: 16,
        marginTop: '2%',
        fontFamily: 'Ubuntu-Bold'
    }
});
