import React, {useState, useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    BackHandler,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList
} from "react-native";
import DishButton from "../component/DishButton";
import Tag from "../component/Tag";
import BackButton from "../component/BackButton";
import {
    getDishesFromApi,
    getRestaurantFromApi,
    getRestaurantTagsFromApi,
    getReviewsForRestaurant,
} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import Review from "../component/Review";
import {connect} from "react-redux";
import {mapReduxStateToProps} from "../helpers/reduxHelpers";
import { SafeAreaView } from "react-navigation"
import DealButton from '../component/DealButton';
import { useSafeArea } from "react-native-safe-area-context";

function RestaurantBanner(props) {
    const {title, tags, location, operatingHours, contact, cost, halal, no_of_stalls} = props

    return (
        <View style={stylesBanner.container}>
            <Text numberOfLines={1} style={stylesBanner.title}>{title}</Text>
            <View style={stylesBanner.tagRow}>
                <View style={stylesBanner.tags}>
                    { tags.map((tag,index) => <Tag key={index} name={tag.name}/>) }
                    {halal && <Tag name={'halal'}/>}
                </View>
                <View style = {stylesBanner.cost}>
                    {parseFloat(cost) > 0 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                    {parseFloat(cost) > 5 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                    {parseFloat(cost) > 7.5 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                </View>
            </View>
            <View style={{width:'100%', marginTop: Dimensions.get('window').height * 0.02}}>
                <Text style={stylesBanner.description}>Location: {location}</Text>
                <Text style={stylesBanner.description}>Opening Hours:{'\n'}{operatingHours}</Text>
                <Text style={stylesBanner.description}>Contact No: {contact}</Text>
                {no_of_stalls > 0 && <Text style={stylesBanner.description}>No. of Stalls : {no_of_stalls}</Text>}
            </View>
            <View style={{
                width: Dimensions.get('window').width, borderBottomWidth: 0.5, borderColor: '#B3B3B3',
                alignSelf: 'center', marginTop: Dimensions.get('window').height * 0.02
            }}/>
        </View>

    );
}

const stylesBanner = StyleSheet.create({
    tagRow: {
        height: '15%',
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * 0.02
    },
    container: {
        flex: 1,
        width: '96%',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginBottom: '2%'
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 28,
        marginTop: Dimensions.get('window').height * 0.02
    },
    tags: {
        flexDirection:"row",
        width:'70%',
    },
    cost: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    coin: {
        height: Dimensions.get('window').width * 0.06,
        width: Dimensions.get('window').width * 0.06,
        marginRight: '2%'
    },
    description: {
        color: "#7E7E7E",
        fontFamily: 'Ubuntu'
    },
})

function RestaurantPage(props) {
    const { navigation, route, user } = props;
    const [isLoading, setLoading] = useState(true);
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantTags, setRestaurantTags] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [refreshingReviews, setRefreshingReviews] = useState(false);
    const [refreshingDishes, setRefreshingDishes] = useState(false);
    const {restaurant_id} = route.params;
    const {isLoggedIn} = user;
    const insets = useSafeArea();

    useEffect(() => {
        Promise.all([
            getRestaurantFromApi(restaurant_id).then(data => setRestaurantData(data)),
            getRestaurantTagsFromApi(restaurant_id).then(data => setRestaurantTags(data)),
            getDishesFromApi(restaurant_id).then(data => setDishes(data)),
            getReviewsForRestaurant(restaurant_id).then(data => setReviews(data)),
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

    const onReviewRefresh = () => {
        setRefreshingReviews(true);
        getReviewsForRestaurant(restaurant_id)
            .then(data => setReviews(data))
            .then(() => setRefreshingReviews(false));
    }

    const onDishRefresh = () => {
        setRefreshingDishes(true);
        getDishesFromApi(restaurant_id)
            .then(data => setDishes(data))
            .then(() => setRefreshingDishes(false));
    }

    const _updateSections = activeSections => {
        setSections(activeSections);
    }

    return (
        isLoading
            ? <Loading/>
            : <View style = {[styles.container, {paddingTop: insets.top}]}>
                <ScrollView style={{ width: "100%", flex: 1}} >
                    <ImageBackground style={styles.picture}
                        source={{uri: restaurantData.attributes.image_link}}>
                        <BackButton white={true} style = {{margin: '2%'}} onPress = {() => navigation.goBack()} />
                    </ImageBackground>
                    <RestaurantBanner
                        title={restaurantData.attributes.title}
                        tags={restaurantTags.map(x => x.attributes)}
                        location={restaurantData.attributes.location}
                        operatingHours={restaurantData.attributes.operating_hours}
                        contact={restaurantData.attributes.contact}
                        halal={restaurantData.attributes.halal_certified}
                        cost={restaurantData.attributes.price}
                        no_of_stalls={restaurantData.attributes.no_of_stalls}
                    />
                    <View style={{height:"5%"}} />
                    <View style={{flexGrow: 1}}>
                        {/*
                            Reviews Section
                        */}
                        <View styles={styles.section}>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionText}>Reviews</Text>
                                {isLoggedIn && <Tag name="+" onPress={() => navigation.navigate('Add Review', {restaurant_id})}/>}
                                <Tag name="View all" onPress={() => navigation.navigate('Restaurant Reviews', {restaurant_id})} />
                            </View>
                            <Review 
                                user_id={1}
                                date={"27 April 2019"}
                                title={"Best Restaurant to Dine"}
                                rating={5}
                                content={"This is not too good"}
                            />
                        </View>
                        <View style={{height:"7%"}} />
                        {/*
                            DISHES Section
                        */}
                        <View styles={styles.section}>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionText}>Dishes</Text>
                                <Tag name="View all" onPress={() => navigation.navigate('Restaurant Dishes', {restaurant_id})} />
                            </View>
                            <DishButton 
                                title="Chicken Rice de Brulé"
                                description="Souffle Chicken w/ Stuffed Egg"
                                price="4.50"
                            />
                        </View>
                        <View style={{height:"7%"}} />
                        {/*
                            DEALS Section
                        */}
                        <View styles={styles.section}>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionText}>Deals</Text>
                                <Tag name="View all" />
                            </View>
                            <DealButton 
                                title="0% off!!"
                                description="T&Cs apply"
                                duration="22 Jun - 28 Jun"
                            />
                            <DealButton 
                                title="Buy 1 get 0 Free!"
                                description="T&Cs apply"
                                duration="22 Jun - 28 Jun"
                            />
                        </View>
                        <View style={{height:"7%"}} />

                    </View>
                </ScrollView>
            </View>
    );
}

export default connect(mapReduxStateToProps)(RestaurantPage)

const styles = StyleSheet.create({
    picture: {
        height: Dimensions.get('window').height * 0.25,
        width:"100%",
    },
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
    sectionTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: "4%",
        paddingHorizontal: "3%",
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3",
    },
    sectionText: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 'auto'
    },
    desc: {
        fontSize: 14,
        color: 'grey',
        marginLeft: 5
    },
    tags: {
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginBottom: 5
    },
    deals: {
        width: Dimensions.get('window').width * 0.9,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ffaf87',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        marginBottom: '5%',
        alignSelf: 'center'
    },
    addReview: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.06,
        width: '90%',
    },
    addButton: {
        height: 13,
        width: 13,
        marginRight: '2%'
    },
    footer: {
        color: '#ff6961',
        fontSize: 16,
        marginTop: '2%',
        fontFamily: 'Ubuntu-Bold',
        alignSelf: 'center'
    },
})
