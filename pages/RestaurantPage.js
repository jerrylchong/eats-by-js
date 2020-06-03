import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Review from "../component/Review";
import {connect} from 'react-redux';
import {mapReduxStateToProps} from "../helpers/reduxHelpers";

function RestaurantBanner(props) {
    const {title, tags, location, operatingHours, contact, cost, halal, no_of_stalls} = props

    return (
        <View style={stylesBanner.container}>
            <Text style={stylesBanner.title}>{title}</Text>
            <View style={{width:'100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
            <Text style={stylesBanner.description}>Location : {location}</Text>
            <Text style={stylesBanner.description}>Opening Hours : {operatingHours}</Text>
            <Text style={stylesBanner.description}>Contact No : {contact}</Text>
            {no_of_stalls > 0 && <Text style={stylesBanner.description}>No. of Stalls : {no_of_stalls}</Text>}
        </View>

    );
}

const stylesBanner = StyleSheet.create({
    container: {
        width: "95%",
        height: Dimensions.get('window').height * 0.2,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 28,
    },
    tags: {
        paddingVertical: '4%',
        flexDirection:"row",
        width:'70%'
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

const Tab = createMaterialTopTabNavigator();


const reviewStyles = StyleSheet.create({
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
})

const TabsWithoutRedux = (props) => {
    const {navigation, restaurant_id, user} = props;
    const {isLoggedIn} = user;
    const [isLoading, setLoading] = useState(true);
    const [dishes, setDishes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [refreshingReviews, setRefreshingReviews] = useState(false);

    useEffect(() => {
        Promise.all([
            getDishesFromApi(restaurant_id).then(data => setDishes(data)),
            getReviewsForRestaurant(restaurant_id).then(data => setReviews(data)),
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);


    const handleReviewRefresh = () => {
        setRefreshingReviews(true);
        getReviewsForRestaurant(restaurant_id)
            .then(data => setReviews(data))
            .then(() => setRefreshingReviews(false));
    }

    return (
        <View style = {{height: '60%', width: '100%'}}>
            <Tab.Navigator
                tabBarOptions = {{
                    activeTintColor: '#404040',
                    indicatorStyle: { backgroundColor: '#ff6961'},
                    labelStyle: {fontFamily: 'Ubuntu'}
                }}>

                <Tab.Screen name="Dishes" >
                    { () => isLoading ? <Loading/> :
                    <ScrollView style = {styles.scroll} contentContainerStyle = {{ alignItems: 'center', backgroundColor: 'white'}}>
                        { dishes.map((dish) =>
                        <DishButton
                            key={dish.id}
                            title={dish.attributes.title}
                            description={dish.attributes.description}
                            price={dish.attributes.price}
                        />
                        ) }
                    </ ScrollView>
                    }
                </Tab.Screen>

                <Tab.Screen name="Reviews"
                            options={{title: "Reviews (" + reviews.length.toString() + ")"}}
                >
                    { () => isLoading ? <Loading/> :
                        <View style = {{width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                            { isLoggedIn &&
                            <TouchableOpacity style = {reviewStyles.addReview} onPress = {() => navigation.navigate('Add Review', {restaurant_id})}>
                                <Image style = {reviewStyles.addButton} source={require('../assets/plusbutton.png')}/>
                                <Text style = {{color: '#ff6961', fontFamily: 'Ubuntu'}}>Add a review</Text>
                            </TouchableOpacity>
                            }
                            <FlatList
                                style={{height: '85%', width: '100%'}}
                                data={reviews}
                                renderItem={({item}) =>
                                    <Review
                                    user_id={item.relationships.user.data.id}
                                    date={item.attributes.created_at}
                                    title={item.attributes.title}
                                    rating={item.attributes.rating}
                                    content={item.attributes.content}
                                    />}
                                ListEmptyComponent={<Text>No Reviews Yet!</Text>}
                                onRefresh={handleReviewRefresh}
                                refreshing={refreshingReviews}
                            />
                        </View>
                    }
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    );
}
const Tabs = connect(mapReduxStateToProps)(TabsWithoutRedux);

function RestaurantPage({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantTags, setRestaurantTags] = useState([]);

    const {restaurant_id} = route.params;

    useEffect(() => {
        Promise.all([
            getRestaurantFromApi(restaurant_id).then(data => setRestaurantData(data)),
            getRestaurantTagsFromApi(restaurant_id).then(data => setRestaurantTags(data)),
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        const backAction = () => { navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        isLoading
            ? <Loading/>
            : <SafeAreaView style = {styles.container}>
                <ScrollView
                    style = {{width: '100%', height: 0}}
                    contentContainerStyle = {{justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image style={styles.picture}
                                     source={{uri: restaurantData.attributes.image_link}}
                    />
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
                    <View style = {styles.deals}>
                        <Text style = {{height: 20, fontFamily: 'Ubuntu'}}>Deals</Text>
                    </View>
                    <View style = {styles.deals}>
                        <Text style = {{height: 20, fontFamily: 'Ubuntu'}}>Deals</Text>
                    </View>
                    <View style = {styles.deals}>
                        <Text style = {{height: 20, fontFamily: 'Ubuntu'}}>Deals</Text>
                    </View>
                    <View style = {styles.deals}>
                        <Text style = {{height: 20, fontFamily: 'Ubuntu'}}>Deals</Text>
                    </View>
                    <View style = {styles.deals}>
                        <Text style = {{height: 20, fontFamily: 'Ubuntu'}}>Deals</Text>
                    </View>
                </ScrollView>
                <BackButton style = {{alignSelf: 'flex-start', position: 'absolute', top: '5%', left: '3%'}}
                            onPress = {() => navigation.goBack()} />
                <Tabs
                    navigation={navigation}
                    restaurant_id={restaurantData.id}
                />
            </SafeAreaView>
    );
}

export default RestaurantPage

const styles = StyleSheet.create({
    picture: {
        height: Dimensions.get('window').height * 0.25,
        width:"100%",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        width:'100%',
        alignItems:'flex-start',
        padding: '2%'
    },
    title: {
        fontSize: 22,
        marginLeft: 5
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
    scroll: {
        width: '100%',
    },
    deals: {
        width: '90%',
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
        marginBottom: '5%'
    }
})
