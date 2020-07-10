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
    TextInput,
    Alert, AsyncStorage
} from "react-native";
import DishButton from "../component/DishButton";
import Tag from "../component/Tag";
import BackButton from "../component/BackButton";
import {
    getDishesFromApi,
    getRestaurantFromApi,
    getRestaurantTagsFromApi,
    getTagsFromApi
} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import DealButton from '../component/DealButton';
import { useSafeArea } from "react-native-safe-area-context";
import LoginButton from "../component/LoginButton";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Overlay } from "react-native-elements";

export function EditRestaurantBanner(props) {
    const {
        title, location, operatingHours, contact, cost, halal, no_of_stalls, newTitle, setTitle, newLocation,
        setLocation, newHours, setHours, newContact, setContact, newStallNum, setStallNum, tags, setTags, allTags
    } = props

    const [newTags, setNewTags] = useState([]);
    const [autoTags, setAutoTags] = useState(allTags.map(x => ({ id: x.id, name: x.attributes.name })));
    const [isVisible, setVisible] = useState(false);

    const removeTag = (id) => {
        setTags(tags.filter(x => x.id != id))
    }

    const toggleVisible = () => {
        const bool = isVisible;
        setVisible(!bool);
    }

    const union = (arr1, arr2) => {
        let result = arr1;
        for (let i = 0; i < arr2.length; i++) {
            result = result.filter(x => x.id != arr2[i].id);
            result.push(arr2[i]);
        }
        return result;
    }

    return (
        <View style={stylesBanner.container}>
            <TextInput
                numberOfLines={1}
                style={stylesBanner.title}
                placeholder={title}
                onChangeText={(text) => {setTitle(text)}}
                value={newTitle}
                placeholderTextColor='#b3b3b3'
            />
            <View style={stylesBanner.tagRow}>
                <View style={stylesBanner.tags}>
                    { tags.map((tag,index) => <Tag onPress={() => removeTag(tag.id)} key={index} name={tag.name}/>) }
                    {halal && <Tag onPress={() => removeTag(0)} name={'halal'}/>}
                    <Tag name='+' onPress={toggleVisible}/>
                    <Overlay isVisible={isVisible}>
                        <Text style={stylesBanner.overlayHeader}>Add Tags</Text>
                        <Text style={stylesBanner.overlayText}>Choose tags from dropdown to add:</Text>
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                const items = newTags.filter(x => x.id != item.id);
                                items.push(item);
                                setNewTags(items);
                                setAutoTags(autoTags.filter(x => x.id != item.id));
                            }}
                            containerStyle={{ marginBottom: '5%' }}
                            itemStyle={{
                                paddingLeft: '8%',
                                paddingVertical: '3%',
                                marginTop: '1%',
                                backgroundColor: '#ececec',
                                borderRadius: 100,
                                width: windowWidth * 0.3,
                            }}
                            itemTextStyle={{ color: '#404040', fontFamily: 'Ubuntu', fontSize: 10 }}
                            itemsContainerStyle={{ maxHeight: windowHeight * 0.1 }}
                            items={autoTags}
                            defaultIndex={0}
                            resetValue={true}
                            textInputProps={
                                {
                                    placeholder: "Add tag",
                                    placeholderTextColor: '#404040',
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        paddingLeft: '4%',
                                        backgroundColor: '#ececec',
                                        borderRadius: windowWidth * 0.15,
                                        width: windowWidth * 0.3,
                                        height: windowWidth * 0.06,
                                        fontSize: 10,
                                        color: '#404040',
                                        fontFamily: 'Ubuntu'
                                    }
                                }
                            }
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                        <Text style={stylesBanner.overlayText}>Tags to be added:</Text>
                        <View style={stylesBanner.overlayTags}>
                            { newTags.map((tag,index) => <Tag onPress={() => setNewTags(newTags.filter(x => x.id != tag.id))} key={index} name={tag.name}/>) }
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Tag disabled={false} name={'Done'} onPress={() => {
                                setVisible(false);
                                setTags(union(tags, newTags));
                                setNewTags([]);
                                setAutoTags(allTags.map(x => ({ id: x.id, name: x.attributes.name })));
                            }}/>
                        </View>
                    </Overlay>
                </View>
                <View style = {stylesBanner.cost}>
                    {parseFloat(cost) > 0 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                    {parseFloat(cost) > 5 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                    {parseFloat(cost) > 7.5 && <Image style = {stylesBanner.coin} source={require('../assets/coin.png')}/>}
                </View>
            </View>
            <View style={{width:'100%', marginTop: Dimensions.get('window').height * 0.02}}>
                <View>
                    <Text style={stylesBanner.inputHeader}>Location: </Text>
                    <TextInput
                        style={stylesBanner.description}
                        placeholder={location}
                        onChangeText={(text) => {setLocation(text)}}
                        value={newLocation}
                        placeholderTextColor='#b3b3b3'
                    />
                </View>
                <View>
                    <Text style={stylesBanner.inputHeader}>Opening Hours:</Text>
                    <TextInput
                        style={stylesBanner.description}
                        placeholder={operatingHours}
                        onChangeText={(text) => {setHours(text)}}
                        value={newHours}
                        placeholderTextColor='#b3b3b3'
                        multiline={true}
                        textAlignVertical={'top'}
                    />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={stylesBanner.inputHeader}>Contact No: </Text>
                    <TextInput
                        style={stylesBanner.description}
                        placeholder={contact == null ? "N/A" : contact}
                        onChangeText={(text) => {setContact(text)}}
                        value={newContact}
                        placeholderTextColor='#b3b3b3'
                    />
                </View>
                {no_of_stalls > 0 &&
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={stylesBanner.inputHeader}>No. of Stalls: </Text>
                    <TextInput
                        style={stylesBanner.description}
                        placeholder={no_of_stalls.toString()}
                        onChangeText={(text) => {setStallNum(text)}}
                        value={newStallNum}
                        placeholderTextColor='#b3b3b3'
                    />
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
        color: "#404040",
        fontFamily: 'Ubuntu-Bold',
        fontSize: 28,
        marginTop: windowHeight * 0.02,
        fontWeight:'normal'
    },
    tags: {
        flexDirection:"row",
        width:'70%',
        alignItems: 'center'
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
        color: "#404040",
        fontFamily: 'Ubuntu',
        flex: 1,
        fontWeight:'normal'
    },
    inputHeader: {
        color: "#404040",
        fontFamily: 'Ubuntu',
        marginRight: '1%'
    },
    overlayHeader: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 18,
        color: '#404040',
        marginBottom: '5%',
        alignSelf: 'center'
    },
    overlayText: {
        fontFamily: 'Ubuntu',
        fontSize: 14,
        color: '#404040',
        marginBottom: '2%'
    },
    overlayTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: '5%'
    }
})

function EditRestaurantPage(props) {
    const { navigation, route } = props;
    const [isLoading, setLoading] = useState(true);
    const [restaurantData, setRestaurantData] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [refreshingReviews, setRefreshingReviews] = useState(false);
    const [refreshingDishes, setRefreshingDishes] = useState(false);
    const [newTitle, setTitle] = useState("");
    const [newLocation, setLocation] = useState("");
    const [newHours, setHours] = useState("");
    const [newContact, setContact] = useState("");
    const [newStallNum, setStallNum] = useState("");
    const [newTags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [newDishes, setNewDishes] = useState([]);
    const [newDeals, setNewDeals] = useState([]);
    const [newImageLink, setImageLink] = useState("");
    const {restaurant_id} = route.params;
    const insets = useSafeArea();

    useEffect(() => {
        Promise.all([
            getRestaurantFromApi(restaurant_id).then(data => setRestaurantData(data)),
            getRestaurantTagsFromApi(restaurant_id).then(data => {
                setTags(data.map(x => ({id: x.id, name: x.attributes.name})));
            }),
            getDishesFromApi(restaurant_id).then(data => setDishes(data)),
            getTagsFromApi().then(data => setAllTags(data))
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

    return (
        isLoading
            ? <Loading/>
            : <View style = {[
                styles.container,
                {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
            ]}>
                <ScrollView style={{ width: "100%"}} keyboardShouldPersistTaps="handled">
                    <ImageBackground style={styles.picture}
                                     source={{uri: restaurantData.attributes.image_link}}>
                        <BackButton white={true} style = {{margin: '2%'}} onPress = {() => navigation.goBack()} />
                    </ImageBackground>
                    <View style={styles.imageInput}>
                        <Text style={stylesBanner.inputHeader}>Image Link: </Text>
                        <TextInput
                            style={stylesBanner.description}
                            placeholder={restaurantData.attributes.image_link}
                            onChangeText={(text) => {setImageLink(text)}}
                            value={newImageLink}
                            placeholderTextColor='#b3b3b3'
                        />
                    </View>
                    <EditRestaurantBanner
                        title={restaurantData.attributes.title}
                        location={restaurantData.attributes.location}
                        operatingHours={restaurantData.attributes.operating_hours}
                        contact={restaurantData.attributes.contact}
                        halal={restaurantData.attributes.halal_certified}
                        cost={restaurantData.attributes.price}
                        no_of_stalls={restaurantData.attributes.no_of_stalls}
                        newTitle={newTitle}
                        setTitle={setTitle}
                        newLocation={newLocation}
                        setLocation={setLocation}
                        newHours={newHours}
                        setHours={setHours}
                        newContact={newContact}
                        setContact={setContact}
                        newStallNum={newStallNum}
                        setStallNum={setStallNum}
                        tags={newTags}
                        setTags={setTags}
                        allTags={allTags}
                    />
                    <View style={{height: windowHeight  * 0.05}} />
                    <View style={{flexGrow: 1}}>
                        {/*
                            DISHES Section
                            */}
                        <View styles={styles.section}>
                            <View style={styles.sectionTitle}>
                                <Text style={styles.sectionText}>Dishes</Text>
                                <Tag name='+' onPress={()=> Alert.alert("Add Dish","Add Dish Form")}/>
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
                                <Tag name="+" onPress={() => Alert.alert("Add Deal", "Add Deal Form")}/>
                            </View>
                            <DealButton
                                title="0% off!!"
                                description="T&Cs apply"
                                duration="22 Jun - 28 Jun"
                                onPress={() => Alert.alert("Remove Deal", "Are you sure you want to delete this deal?",
                                    [
                                        { text: "Cancel",
                                        onPress: () => null,
                                        style: "cancel" },
                                        { text: "YES", onPress: () => {
                                            Alert.alert("Placeholder", "Remove Deal Function")
                                        }}
                                    ]
                                )}
                            />
                            <DealButton
                                title="Buy 1 get 0 Free!"
                                description="T&Cs apply"
                                duration="22 Jun - 28 Jun"
                            />
                        </View>
                        <View style={{height: windowHeight * 0.07}} />
                    </View>
                    <LoginButton
                        style={{alignSelf: 'center'}}
                        text={"Submit"}
                        onPress={() => Alert.alert("Placeholder", "Post Request to update")}/>
                    <View style={{height: windowHeight * 0.07}} />
                </ScrollView>
            </View>
    );
}

export default EditRestaurantPage

const styles = StyleSheet.create({
    picture: {
        height: Dimensions.get('window').height * 0.25,
        width:"100%",
        opacity: 0.85
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
    imageInput: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '15%',
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 100,
        flexWrap: 'wrap',
        paddingHorizontal: '2%',
        paddingVertical: 5
    },
})
