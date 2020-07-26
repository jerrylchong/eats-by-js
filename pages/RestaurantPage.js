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
    Alert,
    TextInput
} from "react-native";
import DishButton from "../component/DishButton";
import Tag from "../component/Tag";
import BackButton from "../component/BackButton";
import {
    getPaginatedDishesFromApi,
    getRestaurantFromApi,
    getRestaurantTagsFromApi,
    getPaginatedReviewsForRestaurant, getNumberOfReviewsFromApi,
} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import Review from "../component/Review";
import {connect} from "react-redux";
import {mapReduxStateToProps} from "../helpers/reduxHelpers";
import DealButton from '../component/DealButton';
import { useSafeArea } from "react-native-safe-area-context";
import {Overlay} from "react-native-elements";
import {SearchPicker} from "../container/SearchButton";

function RestaurantBanner(props) {
    const {title, tags, location, operatingHours, contact, cost, halal, no_of_stalls} = props
    const [isVisible, setVisible] = useState(false);
    const [content, setContent] = useState("");
    const submitFeedback = () => {
        setVisible(false);
    }

    return (
        <View style={stylesBanner.container}>
            <Text numberOfLines={1} style={stylesBanner.title}>{title}</Text>
            <View style={stylesBanner.tagRow}>
                <View style={stylesBanner.tags}>
                    { tags.map((tag,index) => <Tag disabled key={index} name={tag.name}/>) }
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
                <View style={{height: Dimensions.get('window').height * 0.02}}/>
                <View style={{alignItems: 'flex-start'}}>
                    <Tag disabled={false} name={'Leave Feedback'} onPress={() => setVisible(true)}/>
                </View>
            </View>
            <Overlay isVisible={isVisible}>
                <Text style={stylesBanner.overlayHeader}>Submit Feedback</Text>
                <View style={{paddingHorizontal: '2%', marginBottom: '4%'}}>
                    <SearchPicker
                        placeholderText="Select a Subject"
                        items={[
                            { label: 'Store information is incorrect', value: '0' },
                            { label: 'Deal is fake', value: '1' },
                            { label: 'Deal is missing', value: '2' },
                            { label: 'Dish is fake/dish information is wrong', value: '3' },
                            { label: 'Dish is missing', value: '4' },
                        ]}
                        onValueChange={(value) => console.log(value)}
                    />
                </View>
                <TextInput
                    multiline={true}
                    style={stylesBanner.input}
                    placeholder={"Type here"}
                    onChangeText={(text) => {setContent(text)}}
                    value={content}
                    placeholderTextColor='#404040'
                    textAlignVertical={'top'}
                    placeholderStyle={{margin: '2%'}}
                />
                <View style={{alignItems: 'center', marginBottom: '4%'}}>
                    <Tag disabled={false} name={'Submit'} onPress={submitFeedback}/>
                </View>
                <View style={{alignItems: 'center', marginBottom: '2%'}}>
                    <Tag disabled={false} name={'Cancel'} onPress={() => setVisible(false)}/>
                </View>
            </Overlay>
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
        color: "#808080",
        fontFamily: 'Ubuntu'
    },
    descriptionLabel: {
        color: '#808080',
        fontFamily: 'Ubuntu-Medium'
    },
    input: {
        borderRadius: 10,
        fontSize: 12,
        width: windowWidth * 0.5,
        height: windowHeight * 0.2,
        padding: '3%',
        marginBottom: '5%',
        marginHorizontal: '2%',
        fontFamily: 'Ubuntu',
        backgroundColor: '#d9d9d9',
        color: '#404040',
    },
    overlayHeader: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 18,
        color: '#404040',
        marginBottom: '5%',
        marginTop: '2%',
        alignSelf: 'center'
    },
})

function RestaurantPage(props) {
    const { navigation, route, user } = props;
    const [isLoading, setLoading] = useState(true);
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantTags, setRestaurantTags] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewNum, setReviewNum] = useState(0);
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
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        const reloadReviews = navigation.addListener('focus', () => {
            onReviewRefresh();
        })

        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            backHandler.remove();
            reloadReviews;
        }
    }, []);

    const onReviewRefresh = () => {
        getNumberOfReviewsFromApi(restaurant_id).then(num => {
            setReviewNum(num);
            setRefreshingReviews(true);
            getPaginatedReviewsForRestaurant(restaurant_id, 1, 2)
                .then(data => setReviews(data))
                .then(() => setRefreshingReviews(false));
        })
    }

    return (
        isLoading
            ? <Loading/>
            : <View style = {[
                styles.container,
                {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
                ]}>
                <ScrollView style={{ width: "100%"}}>
                    {
                        restaurantData.attributes.image_link
                            ? <ImageBackground style={styles.picture} source={{uri: restaurantData.attributes.image_link}}>
                                <BackButton white={true} style = {{margin: '2%'}} onPress = {() => navigation.goBack()} />
                            </ImageBackground>
                            : <ImageBackground style={styles.picture} source={require('../assets/grey.png')}>
                                <BackButton white={true} style = {{margin: '2%'}} onPress = {() => navigation.goBack()} />
                                <Text style={styles.noImageText}>No Store Image</Text>
                            </ImageBackground>
                    }

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
                                <Text style={styles.sectionText}>
                                    Reviews ({reviewNum})
                                </Text>
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
                                <Text style={styles.sectionText}>
                                    Dishes ({restaurantData.relationships.dishes.data.length.toString()})
                                </Text>
                                {
                                    // isLoggedIn && <Tag name='+' onPress={()=> Alert.alert("Suggest Dish", "Suggest Dish Form")}/>
                                }
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
                            </View>
                        </View>
                        <View style={{height: windowHeight * 0.07}} />
                    </View>
                    <View style={{height: windowHeight * 0.07}} />
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
        marginRight: 'auto',
        color: '#404040'
    },
    desc: {
        fontSize: 14,
        color: '#b3b3b3',
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
    noImageText: {
        color: 'white',
        fontFamily: 'Ubuntu-Medium',
        fontSize: 18,
        alignSelf: 'center',
        top: '15%'
    }
})
