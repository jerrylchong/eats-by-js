import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Text,
    View,
    Platform,
    ImageBackground,
    Dimensions,
    BackHandler,
    Image, Alert,
    AsyncStorage
} from "react-native";
import BackButton from "../component/BackButton";
import {useSafeArea} from "react-native-safe-area-context";
import Tag from "../component/Tag";
import * as Location from "expo-location";
import {connect} from "react-redux";
import {mapReduxDispatchToProps, mapReduxStateToProps} from "../helpers/reduxHelpers";
import {
    createRestaurant,
    getTagsFromApi
} from '../helpers/apiHelpers'
import SearchableDropdown from "react-native-searchable-dropdown";
import Loading from "../component/Loading";
import {Overlay} from "react-native-elements";

function AddRestaurantPage(props) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [address, setAddress] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
    const [contact, setContact] = useState('');
    const [noOfStalls, setNoOfStalls] = useState('');
    const [newTags, setTags] = useState([]);
    const [autoTags, setAutoTags] = useState([]);
    const [locationInput, setLocationInput] = useState(0);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [error, setError] = useState(false);
    const [locationOff, setLocationOff] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const { location, updateLocation, removeLocation, navigation, tags } = props;

    useEffect(() => {
        setAutoTags(tags.tagData.map(x => ({ id: x.id, name: x.attributes.name })));

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

    const submit = () => {
        const res_data = {
            title: title,
            price: price,
            image_link: imgLink,
            location: address,
            operating_hours: operatingHours,
            contact: contact,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            no_of_stalls: parseInt(noOfStalls)
        }
        AsyncStorage.getItem("token")
            .then(token => createRestaurant(res_data, token))
            .then(() => Alert.alert("Success",
                "Store " + title + " Added."))
            .catch(err =>{
                // need display this error somehow
                setError(true);
                alert("Errors");
                console.log(err);
            })
    }

    async function getLocation() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            // permission for user location not enabled
            setError(true);
        } else {
            setError(false);
            let locStatus = false;
            await Location.hasServicesEnabledAsync()
                .then(bool => locStatus = bool);
            if (locStatus) {
                setError(false);
                setLocationOff(false);
                let loc = await Location.getCurrentPositionAsync({});
                updateLocation(loc);
            } else {
                setLocationOff(true);
            }
        }
    }

    const useCurrLoc = () => {
        getLocation()
            .then(() => {
                if (error) {
                    Alert.alert("Location Permission", "Please enable permissions for Location.\n" +
                        "For Android Users: Please go into App Settings to enable Location permissions if not prompted after pressing " +
                        "'Enable'.",
                        [
                            { text: "Cancel",
                                onPress: () => null,
                                style: "cancel" },
                            { text: "Enable", onPress: () => {
                                    getLocation() // prompts for location permission and stores location in Redux
                                }
                            }
                        ])
                } else if (locationOff) {
                    Alert.alert("Location Services Turned Off", "Please turn on Location Services.")
                } else {
                    let lat = location.coords.lat.toString();
                    setLat(lat)
                    let lng = location.coords.lng.toString();
                    setLng(lng)
                    setLocationInput(2);
                }
            })
    }

    const resetLoc = () => {
        setLat('');
        setLng('');
        setLocationInput(0);
    }

    const insets = useSafeArea();

    return (
        loading ? <Loading/> :
        <View style = {[
            styles.container,
            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
        ]}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <BackButton white={false} style={styles.back} onPress={navigation.goBack}/>
            <Text style = {styles.header}>Add a Restaurant</Text>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(text) => {setTitle(text)}}
                    value={title}
                    placeholderTextColor='#404040'/>
                <TextInput
                    style={styles.input}
                    placeholder="Average Price"
                    onChangeText={(text) => {setPrice(text)}}
                    value={price}
                    placeholderTextColor='#404040'/>
                <TextInput
                    style={styles.input}
                    placeholder="Image Link"
                    onChangeText={(text) => {setImgLink(text)}}
                    value={imgLink}
                    placeholderTextColor='#404040'/>
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    onChangeText={(text) => {setAddress(text)}}
                    value={address}
                    placeholderTextColor='#404040'/>
                {
                    locationInput == 0 ?
                        <View style={[styles.locationView, {justifyContent: 'space-between'}]}>
                            <Text style={styles.locationFont}>Location:</Text>
                            <Tag disabled={false} name={'Manual Input'} onPress={() => setLocationInput(1)}/>
                            <Tag disabled={false} name={'Use Current Location'} onPress={useCurrLoc}/>
                        </View>
                        :
                        locationInput == 1 ?
                            <View style={[styles.locationView, {justifyContent: 'flex-start'}]}>
                                <TextInput
                                    style={styles.locInput}
                                    placeholder="Latitude"
                                    onChangeText={(text) => {setLat(text)}}
                                    value={lat}
                                    placeholderTextColor='#404040'/>
                                <TextInput
                                    style={styles.locInput}
                                    placeholder="Longitude:"
                                    onChangeText={(text) => {setLng(text)}}
                                    value={lng}
                                    placeholderTextColor='#404040'/>
                                    <TouchableOpacity style={styles.locBack} onPress={resetLoc}>
                                        <Image style={styles.icon} source={require('../assets/backbutton.png')}/>
                                    </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.locationView}>
                                <Text style={styles.locationFont}>Using Current Location: {lat}, {lng}</Text>
                                <TouchableOpacity style={styles.locBack} onPress={resetLoc}>
                                    <Image style={styles.icon} source={require('../assets/backbutton.png')}/>
                                </TouchableOpacity>
                            </View>
                }
                <TextInput
                    style={styles.input}
                    placeholder="Operating Hours"
                    onChangeText={(text) => {setOperatingHours(text)}}
                    value={operatingHours}
                    placeholderTextColor='#404040'/>
                <TextInput
                    style={styles.input}
                    placeholder="Contact No."
                    onChangeText={(text) => {setContact(text)}}
                    value={contact}
                    placeholderTextColor='#404040'/>
                <TextInput
                    style={styles.input}
                    placeholder="No. of Stalls (put 0 if not food court)"
                    onChangeText={(text) => {setNoOfStalls(text)}}
                    value={noOfStalls}
                    placeholderTextColor='#404040'/>
                {/**
                    <View style={[styles.locationView, {justifyContent: 'flex-start'}]}>
                        <Text style={[styles.locationFont, {marginRight: '2%'}]}>Tags:</Text>
                        {newTags.map(x => <Tag name={x.name} onPress={() => {
                            setTags(newTags.filter(y => y.id != x.id));
                            autoTags.push(x);
                        }}/>)}
                        <Tag disabled={false} name={'+'} onPress={() => setVisible(true)}/>
                    </View>
                }
                    <Overlay isVisible={isVisible}>
                    <Text style={styles.overlayHeader}>Add Tags</Text>
                    <Text style={styles.overlayText}>Choose tags from dropdown to add:</Text>
                    <SearchableDropdown
                    onItemSelect={(item) => {
                    const items = newTags.filter(x => x.id != item.id);
                    items.push(item);
                    setTags(items);
                    setAutoTags(autoTags.filter(x => x.id != item.id));
                }}
                    containerStyle={{marginBottom: '5%'}}
                    itemStyle={{
                    paddingLeft: '8%',
                    paddingVertical: '3%',
                    marginTop: '1%',
                    backgroundColor: '#ececec',
                    borderRadius: 100,
                    width: windowWidth * 0.3,
                }}
                    itemTextStyle={{color: '#404040', fontFamily: 'Ubuntu', fontSize: 10}}
                    itemsContainerStyle={{maxHeight: windowHeight * 0.1}}
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
                    <Text style={styles.overlayText}>Tags to be added:</Text>
                    <View style={styles.overlayTags}>
                    {newTags.map((tag, index) => <Tag onPress={() => {
                        setTags(newTags.filter(x => x.id != tag.id));
                        autoTags.push(tag);
                    }} key={index} name={tag.name}/>)}
                    </View>
                    <View style={{alignItems: 'center'}}>
                    <Tag disabled={false} name={'Done'} onPress={() => {
                    setVisible(false);
                }}/>
                    </View>
                    </Overlay>
                **/}
            </KeyboardAvoidingView>
            <View style = {styles.buttonShadow}>
                <TouchableOpacity style = {styles.button} onPress = {submit}>
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(AddRestaurantPage)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        minHeight: Math.round(Dimensions.get('window').height) * 0.55
    },
    back: {
        position: 'absolute',
        top: Platform.OS == "ios" ? '5%' :'2%',
        left: '2%'
    },
    header: {
        position: 'relative',
        top: '5%',
        fontSize: 20,
        marginTop: '5%',
        fontFamily: 'Ubuntu-Medium'
    },
    list: {
        position: 'relative',
        top: '6%',
        width: '80%',
        height: '60%',
        alignItems: 'center',
        marginTop: '5%',
        justifyContent: 'space-between'
    },
    inputHeader: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    input: {
        borderRadius: windowWidth * 0.35,
        backgroundColor: '#d9d9d9',
        fontSize: 12,
        width: windowWidth * 0.8,
        height: windowWidth * 0.11,
        paddingHorizontal: '5%',
        fontFamily: 'Ubuntu',
        color: '#404040',
    },
    locationView: {
        flexDirection: 'row',
        backgroundColor: '#d9d9d9',
        borderRadius: windowWidth * 0.35,
        width: windowWidth * 0.8,
        height: windowWidth * 0.11,
        paddingHorizontal: '5%',
        alignItems: 'center',
    },
    locationFont: {
        fontFamily: 'Ubuntu',
        color: '#404040',
        fontSize: 12,
    },
    locBack: {
        position: 'absolute',
        right: windowWidth * 0.04,
        top: windowWidth * 0.03,
        width: windowWidth * 0.05,
        height: windowWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: windowWidth * 0.025,
        height: windowWidth * 0.025
    },
    buttonShadow: {
        position: 'relative',
        top: '10%',
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').width * 0.08,
        backgroundColor: '#ff6961',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 3,
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Ubuntu'
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
    },
    locInput: {
        fontSize: 12,
        width: windowWidth * 0.3,
        height: windowWidth * 0.11,
        fontFamily: 'Ubuntu',
        color: '#404040',
        marginRight: '2%'
    },
    halalBack: {
        width: windowWidth * 0.05,
        height: windowWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
