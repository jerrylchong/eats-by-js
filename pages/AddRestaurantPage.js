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
    Image, Alert
} from "react-native";
import BackButton from "../component/BackButton";
import {useSafeArea} from "react-native-safe-area-context";
import Tag from "../component/Tag";
import * as Location from "expo-location";
import {connect} from "react-redux";
import {mapReduxDispatchToProps, mapReduxStateToProps} from "../helpers/reduxHelpers";

function AddRestaurantPage(props) {
    const [title, setTitle] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [address, setAddress] = useState('');
    const [newLocation, setLocation] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
    const [contact, setContact] = useState('');
    const [tags, setTags] = useState('');
    const [locationInput, setLocationInput] = useState(0);
    const [error, setError] = useState(false);
    const [locationOff, setLocationOff] = useState(true);
    const { location, updateLocation, removeLocation, navigation } = props;

    useEffect(() => {
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
        return (
            navigation.goBack()
        )
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
                    setLocationInput(2);
                }
            })
    }

    const resetLoc = () => {
        setLocation('');
        setLocationInput(0);
    }

    const insets = useSafeArea();

    return (
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
                            <View style={{flexDirection: 'row'}}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Please key in location (latitude, longitude)"
                                    onChangeText={(text) => {setLocation(text)}}
                                    value={newLocation}
                                    placeholderTextColor='#404040'/>
                                    <TouchableOpacity style={styles.locBack} onPress={resetLoc}>
                                        <Image style={styles.icon} source={require('../assets/backbutton.png')}/>
                                    </TouchableOpacity>
                            </View>
                            :
                            <View style={[styles.locationView, {justifyContent: 'center'}]}>
                                <Text style={styles.locationFont}>Using Current Location</Text>
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
                    placeholder="Tags (each tag separated by a space)"
                    onChangeText={(text) => {setTags(text)}}
                    value={tags}
                    placeholderTextColor='#404040'/>
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
        minHeight: Math.round(Dimensions.get('window').height),
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
        height: '50%',
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
        top: '20%',
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
    }
})