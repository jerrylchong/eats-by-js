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
import Review from "../component/Review";
import Accordion from "react-native-collapsible/Accordion";
import {connect} from "react-redux";
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

function RestaurantPage(props) {
    const { navigation, route, user } = props;
    const [isLoading, setLoading] = useState(true);
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantTags, setRestaurantTags] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [refreshingReviews, setRefreshingReviews] = useState(false);
    const [refreshingDishes, setRefreshingDishes] = useState(false);
    const [activeSections, setSections] = useState([]);
    const {restaurant_id} = route.params;
    const {isLoggedIn} = user;

    useEffect(() => {
        Promise.all([
            getRestaurantFromApi(restaurant_id).then(data => setRestaurantData(data)),
            getRestaurantTagsFromApi(restaurant_id).then(data => setRestaurantTags(data)),
            getDishesFromApi(restaurant_id).then(data => setDishes(data)),
            getReviewsForRestaurant(restaurant_id).then(data => setReviews(data)),
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

    const SECTIONS = [
        {
            title: "Reviews (" + reviews.length.toString() + ")",
            id: 1
        },
        {
            title: "Dishes (" + dishes.length.toString() + ")",
            id: 2
        },
        {
            title: "Deals",
            id: 3
        },
    ]

    const _renderHeader = section => {
        return (
            <View style = {styles.header}>
                <Text style = {styles.title}>{section.title}</Text>
            </View>
        )
    }

    const _renderContent = section => {
        return (
            section.id == 1 ?
                <View style = {{height: '90%', width: Dimensions.get('window').width,
                    alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                    { isLoggedIn &&
                    <TouchableOpacity style = {styles.addReview} onPress = {() => navigation.navigate('Add Review', {restaurant_id})}>
                        <Image style = {styles.addButton} source={require('../assets/plusbutton.png')}/>
                        <Text style = {{color: '#ff6961', fontFamily: 'Ubuntu'}}>Add a review</Text>
                    </TouchableOpacity>
                    }
                    <FlatList
                        style={{width: '100%'}}
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
                        onRefresh={onReviewRefresh}
                        refreshing={refreshingReviews}
                    />
                </View>
                : section.id == 2 ?
                <View style = {{height: '100%', width: Dimensions.get('window').width,
                    alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                    <FlatList
                        style={{width: '100%'}}
                        data={dishes}
                        renderItem={({item}) =>
                            <DishButton
                                title={item.attributes.title}
                                description={item.attributes.description}
                                price={item.attributes.price}
                            />}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={<Text>No Dishes Yet!</Text>}
                        onRefresh={onDishRefresh}
                        refreshing={refreshingDishes}
                    />
                </View>
                :
                <ScrollView style = {{height: '50%', width: Dimensions.get('window').width}}>
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
        )
    }

    const _updateSections = activeSections => {
        setSections(activeSections);
    }

    return (
        isLoading
            ? <Loading/>
            : <SafeAreaView style = {styles.container}>
                <ImageBackground style={styles.picture}
                                 source={{uri: restaurantData.attributes.image_link}}>
                    <BackButton style = {{margin: '5%'}} onPress = {() => navigation.goBack()} />
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
                <Accordion
                    sections={SECTIONS}
                    activeSections={activeSections}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    underlayColor={"#f5f5f5"}
                />

            </SafeAreaView>
    );
}

export default connect(mapReduxStateToProps)(RestaurantPage)

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
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.95,
        height: Dimensions.get('window').height * 0.08,
        backgroundColor: '#b3b3b3',
        paddingLeft: '2%',
        marginBottom: '2%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        marginLeft: 5,
        fontFamily: 'Ubuntu-Bold',
        marginTop: '5%'
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
})