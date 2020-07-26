import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    Dimensions,
    FlatList
} from "react-native";
import EditDishButton from "../component/EditDishButton";
import BackButton from "../component/BackButton";
import {
    getDishesFromApi,
} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import {connect} from "react-redux";
import {mapReduxStateToProps} from "../helpers/reduxHelpers";
import {useSafeArea} from "react-native-safe-area-context";
import Tag from "../component/Tag";

function EditDishPage(props) {
    const { navigation, route } = props;
    const [isLoading, setLoading] = useState(true);
    const [data, setDishes] = useState([]);
    const [refreshingDishes, setRefreshingDishes] = useState(false);
    const {restaurant_id} = route.params;

    useEffect(() => {
        Promise.all([
            getDishesFromApi(restaurant_id).then(data => setDishes(data)),
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        const reloadDishes = navigation.addListener('focus', () => {
            onDishRefresh();
        })

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

    const onDishRefresh = () => {
        setRefreshingDishes(true);
        getDishesFromApi(restaurant_id)
            .then(data => setDishes(data))
            .then(() => setRefreshingDishes(false));
    }

    const renderFooter = () => {
        return (
            data.length > 0 &&
            //(isLastPage
            //   ?
            <Text style={styles.footer}>No More Dishes</Text>
            //: isFetching && <Text style={styles.footer}>Loading...</Text>)
        )
    }

    const insets = useSafeArea();

    return (
        isLoading
            ? <Loading/>
            : <View style = {[
                styles.container,
                {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, paddingBottom: insets.bottom}
            ]}>
                <View style={{ width: "100%", flex: 1}} >
                    <View style={styles.header}>
                        <BackButton white={false} style = {{margin: '2%'}} onPress = {() => navigation.goBack()} />
                        <Text style={styles.headerText}>Dishes ({data.length})</Text>
                        <Tag
                            style={{marginRight: '4%'}}
                            name='+' onPress={() => navigation.navigate("Dish", {restaurant_id: restaurant_id})}
                        />
                    </View>

                    <FlatList
                        style = {styles.scroll}
                        data={data}
                        extraData={data}
                        renderItem={({ item }) =>
                            <EditDishButton
                                id={item.id}
                                title={item.attributes.title}
                                description={item.attributes.description}
                                price={item.attributes.price}
                                navigation={navigation}
                                refresh={onDishRefresh}
                            />}
                        keyExtractor={dish => dish.id}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={() => <Text style={styles.footer}>No Dishes Found</Text>}
                        onRefresh={onDishRefresh}
                        refreshing={refreshingDishes}
                    />
                </View>
            </View>
    );
}

export default connect(mapReduxStateToProps)(EditDishPage)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: "100%",
        height: Dimensions.get('window').height * 0.08,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 'auto',
    },
    title: {
        fontSize: 22,
        marginLeft: '2%',
        fontFamily: 'Ubuntu-Bold',
        marginBottom: '2%',
        color: '#404040'
    },
    section: {
        flex: 1,
    },
    scroll: {
        width: '100%',
    },
    footer: {
        color: '#ff6961',
        fontSize: 16,
        marginTop: '2%',
        fontFamily: 'Ubuntu-Bold',
        alignSelf: 'center'
    },
})
