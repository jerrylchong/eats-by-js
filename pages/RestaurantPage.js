import React, {useState, useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    BackHandler,
    Image,
    Dimensions,
    Alert
} from "react-native";
import DishButton from "../component/DishButton";
import Tag from "../component/Tag";
import BackButton from "../component/BackButton";
import {
    getPaginatedDishesFromApi,
    getRestaurantFromApi,
    getRestaurantTagsFromApi,
    getPaginatedReviewsForRestaurant,
} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import Review from "../component/Review";
import {connect} from "react-redux";
import {mapReduxStateToProps} from "../helpers/reduxHelpers";
import DealButton from '../component/DealButton';
import { useSafeArea } from "react-native-safe-area-context";

function RestaurantBanner(props) {
    const {title, tags, location, operatingHours, contact, cost, halal, no_of_stalls} = props

    return (
        <View style={stylesBanner.container}>
            <Text numberOfLines={1} style={stylesBanner.title}>{title}</Text>
            <View style={stylesBanner.tagRow}>
                <View style={stylesBanner.tags}>
                    { tags.map((tag,index) => <Tag disabled key={index} name={tag.name}/>) }
                    {halal && <Tag disabled name={'halal'}/>}
                    <Tag name='+' onPress={()=> Alert.alert("Suggest Tag", "Suggest Tag Form")}/>
                </View>
                <View style = {stylesBanner.cost}>
                    {parseFloat(cost) > 0 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                    {parseFloat(cost) > 5 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                    {parseFloat(cost) > 7.5 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                </View>
            </View>
            <View style={{width:'100%', marginTop: Dimensions.get('window').height * 0.02}}>
                <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Text style={stylesBanner.descriptionLabel}>Location: </Text>
                    <Text style={stylesBanner.description}>{location}</Text>
                </View>
                <View style={{height: Dimensions.get('window').height * 0.005}}/>
                <View>
                    <Text style={stylesBanner.descriptionLabel}>Opening Hours: </Text>
                    <Text style={stylesBanner.description}>{operatingHours}</Text>
                </View>
                <View style={{height: Dimensions.get('window').height * 0.005}}/>
                <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Text style={stylesBanner.descriptionLabel}>Contact: </Text>
                    <Text style={stylesBanner.description}>{contact == null ? "N/A" : contact}</Text>
                </View>
                {no_of_stalls > 0 && <View style={{height: Dimensions.get('window').height * 0.005}}/>}
                {no_of_stalls > 0 &&
                <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Text style={stylesBanner.descriptionLabel}>No. of Stalls: </Text>
                    <Text style={stylesBanner.description}>{no_of_stalls}</Text>
                </View>
                }
            </View>
            <View style={{
                width: Dimensions.get('window').width, borderBottomWidth: 0.5, borderColor: '#B3B3B3',
                alignSelf: 'center', marginTop: Dimensions.get('window').height * 0.02
            }}/>
        </View>

    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        marginTop: windowHeight * 0.02
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
        height: windowWidth * 0.06,
        width: windowWidth * 0.06,
        marginRight: '2%'
    },
    description: {
        color: "#b3b3b3",
        fontFamily: 'Ubuntu'
    },
    descriptionLabel: {
        color: '#b3b3b3',
        fontFamily: 'Ubuntu'
    }
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
            getPaginatedDishesFromApi(restaurant_id, 1, 2).then(data => setDishes(data)),
            getPaginatedReviewsForRestaurant(restaurant_id, 1, 2).then(data => setReviews(data)),
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
        getPaginatedReviewsForRestaurant(restaurant_id, 1, 2)
            .then(data => setReviews(data))
            .then(() => setRefreshingReviews(false));
    }

    const onDishRefresh = () => {
        setRefreshingDishes(true);
        getPaginatedDishesFromApi(restaurant_id, 1, 2)
            .then(data => setDishes(data))
            .then(() => setRefreshingDishes(false));
    }
    return (
        isLoading
            ? <Loading/>
            : <View style = {[
                styles.container,
                {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
                ]}>
                <ScrollView style={{ width: "100%"}}>
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
                    <View style={{height: windowHeight  * 0.05}} />
                    <View style={{flexGrow: 1}}>
                        {/*
                            Reviews Section
                            */}
                        <View styles={styles.section}>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionText}>Reviews</Text>
                                {isLoggedIn && <Tag name="refresh" onPress={onReviewRefresh}/>}
                                {isLoggedIn && <Tag name="+" onPress={() => navigation.navigate('Add Review', {restaurant_id})}/>}
                                <Tag name="View all" onPress={() => navigation.navigate('Restaurant Reviews', {restaurant_id})} />
                            </View>
                            { refreshingReviews ?  <Loading style={{paddingTop:30}}/> :
                                    reviews.map(item => 
                                    <Review 
                                        key={item.id}
                                        user_id={item.relationships.user.data.id}
                                        date={new Date(item.attributes.created_at).toLocaleDateString()}
                                        title={item.attributes.title}
                                        rating={item.attributes.rating}
                                        content={item.attributes.content}
                                    />)
                            }
                            { refreshingReviews || reviews.length != 0 || <Text style={styles.footer}>No Reviews yet</Text>}
                        </View>
                        <View style={{height: windowHeight * 0.07}} />
                        {/*
                            DISHES Section
                            */}
                        <View styles={styles.section}>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionText}>Dishes</Text>
                                <Tag name="refresh" onPress={onDishRefresh}/>
                                {isLoggedIn && <Tag name='+' onPress={()=> Alert.alert("Suggest Dish", "Suggest Dish Form")}/>}
                                <Tag name="View all" onPress={() => navigation.navigate('Restaurant Dishes', {restaurant_id})} />
                            </View>
                            { refreshingDishes ?  <Loading style={{paddingTop:30}}/> :
                                    dishes.map(item => 
                                    <DishButton 
                                        key={item.id}
                                        title={item.attributes.title}
                                        description={item.attributes.description}
                                        price={item.attributes.price}
                                    />)
                            }
                            { refreshingDishes || dishes.length != 0 || <Text style={styles.footer}>No Dishes yet</Text>}
                        </View>
                        <View style={{height: windowHeight * 0.07}} />
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
                        <View style={{height: windowHeight * 0.07}} />
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
        flex: 1,
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
        justifyContent: 'flex-start'
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
        fontFamily: 'Ubuntu-Bold',
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
