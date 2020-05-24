import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    BackHandler,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import DishButton from "../component/DishButton";
import Tag from "../component/Tag";
import BackButton from "../component/BackButton";
import {
    getDishesFromApi,
    getRestaurantFromApi,
    getRestaurantTagsFromApi,
} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Review from "../component/Review";

function RestaurantBanner(props) {
    const {title, tags, location, operatingHours, contact} = props

    return (
        <View style={stylesBanner.container}>
            <Text style={stylesBanner.title}>{title}</Text>
            <View style={stylesBanner.tags}>
                { tags.map((tag,index) => <Tag key={index} name={tag.name}/>) }
            </View>
            <Text style={stylesBanner.description}>Location : {location}</Text>
            <Text style={stylesBanner.description}>Opening Hours : {operatingHours}</Text>
            <Text style={stylesBanner.description}>Contact No : {contact}</Text>
        </View>

    );
}

const stylesBanner = StyleSheet.create({
    container: {
        width: "95%",
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 20,
        paddingHorizontal: 5,
    },
    title: {
        fontWeight: '600',
        fontSize: 30,
    },
    tags: {
        paddingVertical: '4%',
        flexDirection:"row"
    },
    description: {
        color: "#7E7E7E"
    }
})

const Tab = createMaterialTopTabNavigator();

const Dishes = () => {
    return (
        <ScrollView style = {styles.scroll} contentContainerStyle = {{ alignItems: 'center', backgroundColor: 'white'}}>
            <DishButton
                title={"Title"}
                description={"Description"}
                price={"Price"}
            />
            <DishButton
                title={"Title"}
                description={"Description"}
                price={"Price"}
            />
            <DishButton
                title={"Title"}
                description={"Description"}
                price={"Price"}
            />
        </ ScrollView>
    )
}

const Reviews = () => {
    return (
        <ScrollView style = {styles.scroll} contentContainerStyle = {{alignItems:'center', backgroundColor: 'white'}}>
            <TouchableOpacity style = {reviewStyles.addReview}>
                <Image style = {reviewStyles.addButton} source={require('../assets/plusbutton.png')}/>
                <Text style = {{color: '#ff6961'}}>Add a review</Text>
            </TouchableOpacity>
            <Review
                user={'Bob'}
                date={'24 May 2020'}
                title={'Yumzo'}
                rating={'4'}
                content={"Omnomz aerin's suck Omnomz aerin's suck Omnomz aerin's suck Omnomz aerin's suck"}/>
            <Review
                user={'Bob'}
                date={'24 May 2020'}
                title={'Yumzo'}
                rating={'4'}
                content={"Omnomz"}/>
            <Review
                user={'Bob'}
                date={'24 May 2020'}
                title={'Yumzo'}
                rating={'4'}
                content={"Omnomz"}/>
        </ScrollView>
    )
}

const reviewStyles = StyleSheet.create({
    addReview: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.04,
        width: '90%',
        paddingTop: '2%'
    },
    addButton: {
        height: 13,
        width: 13,
        marginRight: '2%'
    },
})

const Tabs = () => {
    return (
        <View style = {{height: '40%', width: '100%'}}>
            <Tab.Navigator
                tabBarOptions = {{
                    activeTintColor: '#404040',
                    indicatorStyle: { backgroundColor: '#ff6961'}
                }}>
                <Tab.Screen name="Dishes" component={Dishes}/>
                <Tab.Screen name="Reviews" component={Reviews} />
            </Tab.Navigator>
        </View>
    );
}

function RestaurantPage({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [dishes, setDishes] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantTags, setRestaurantTags] = useState([]);

    const {restaurant_id} = route.params;

    useEffect(() => {
        Promise.all([
            getDishesFromApi(restaurant_id).then(data => setDishes(data)),
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
                <ImageBackground style={styles.picture} source={require('../assets/testrestaurant.png')}>
                    <BackButton style = {{margin: '3%'}} onPress = {() => navigation.goBack()} />
                </ImageBackground>

                <RestaurantBanner
                    title={isLoading? "Loading..." : restaurantData.attributes.title}
                    tags={isLoading ? [] : restaurantTags.map(x => x.attributes)}
                    location="UTown Pantry"
                    operatingHours="12am to 12.01am"
                    contact="+65 9123 1234"
                />
                <View style = {styles.deals}>
                    <Text style = {{height: 20}}>Deals</Text>
                </View>
                <Tabs/>
                {/*<Text style={{width:"80%", fontSize: 16}}>Dishes</Text>
                <View style={{width:"90%", height:1, backgroundColor:"black", margin: 15, opacity:0.25}} />

                <ScrollView style = {styles.scroll}>
                    { dishes.map((dish) =>
                        <DishButton
                            key={dish.id}
                            title={dish.attributes.title}
                            description={dish.attributes.description}
                            price={dish.attributes.price}
                        />

                    ) }
                </ ScrollView> */}
            </SafeAreaView>);
}

export default RestaurantPage

const styles = StyleSheet.create({
    picture: {
        flex:1.3,
        height:"100%",
        width:"100%",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
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
