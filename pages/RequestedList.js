import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Platform, Dimensions, FlatList} from 'react-native';
import { useSafeArea } from "react-native-safe-area-context";
import BackButton from "../component/BackButton";
import {getPaginatedRestaurantRequestsFromApi} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import RequestedRestaurantButton from "../component/RequestedRestaurantButton";
import {connect} from "react-redux";
import {mapReduxStateToProps} from "../helpers/reduxHelpers";

function RequestedList(props) {
    const insets = useSafeArea();
    const {navigation, tags} = props;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isLastPage, setLastPage] = useState(false);
    const [isFetching, setFetching] = useState(false);

    const updatePage = () => {
        const curr = page;
        setPage(curr + 1);
    }

    useEffect(() => {
        Promise.all([
            getPaginatedRestaurantRequestsFromApi(1).then(data => {
                setData(data);
                updatePage();
            })
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

    }, []);

    const findTag = (id) => {
        const data = tags.tagData;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                return data[i].attributes;
            }
        }
        return {name: id}
    }

    const renderFooter = () => {
        return (
            data.length > 0 &&
            (isLastPage
                ? <Text style={styles.footer}>No More Stores</Text>
                : isFetching && <Text style={styles.footer}>Loading...</Text>)
        )
    }

    const fetchMoreRestaurantData = () => {
        if (!isLastPage) {
            setFetching(true);
            getPaginatedRestaurantRequestsFromApi(page).then(moredata => {
                if (moredata.length === 0) {
                    setLastPage(true);
                } else {
                    setData([...new Set([...data, ...moredata])]);
                    updatePage();
                }
            }).then(() => setFetching(false))
        }
    }

    const handleRefresh = () => {
        setRefreshing(true);
        setLastPage(false);
        getPaginatedRestaurantRequestsFromApi(1)
            .then(data => {
                setData(data);
                setPage(2);
            })
            .catch(console.error)
            .then(() => setRefreshing(false))
    }

    return (
        isLoading ? <Loading/> :
        <View style = {[
            styles.container,
            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, paddingBottom: insets.bottom}
            ]}>
            <Text style={styles.header}>Requested Store List</Text>
            <FlatList
                style = {styles.scroll}
                contentContainerStyle = {{alignItems: 'center', paddingBottom: '25%'}}
                data={data}
                extraData={data}
                renderItem={({ item }) =>
                    <RequestedRestaurantButton
                        request_id={item.id}
                        name={item.attributes.title}
                        location={item.attributes.location}
                        opening_hours={item.attributes.operating_hours}
                        lat={item.attributes.latitude}
                        lng={item.attributes.longitude}
                        contact={item.attributes.contact}
                    />}
                keyExtractor={request => request.id}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={() => <Text style={styles.footer}>No Stores Found</Text>}
                onEndReached={fetchMoreRestaurantData}
                onEndReachedThreshold={0.1}
                onRefresh={handleRefresh}
                refreshing={refreshing}
            />
            <BackButton white={false} style={styles.back} onPress={navigation.goBack}/>
        </View>
    )
}

export default connect(mapReduxStateToProps)(RequestedList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Math.round(Dimensions.get('window').height)
    },
    back: {
        position: 'absolute',
        top: Platform.OS == "ios" ? '5%' :'2%',
        left: '2%'
    },
    scroll: {
        position: 'relative',
        top: '10%',
        width: '100%'
    },
    header: {
        position: 'relative',
        top: '5%',
        width: '80%',
        fontSize: 20,
        marginTop: '5%',
        fontFamily: 'Ubuntu-Medium',
        color: '#404040',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    footer: {
        color: '#c74a44',
        fontSize: 16,
        marginTop: '2%',
        fontFamily: 'Ubuntu-Bold'
    }
})