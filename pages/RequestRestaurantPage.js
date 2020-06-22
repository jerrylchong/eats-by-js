import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Text,
    View,
    Platform,
    ImageBackground,
    Dimensions, BackHandler
} from "react-native";
import BackButton from "../component/BackButton";
import {useSafeArea} from "react-native-safe-area-context";

function RequestRestaurantPage({ navigation }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
    const [contact, setContact] = useState('');
    const [rating, setRating] = useState('');
    const [tags, setTags] = useState('');

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

    const insets = useSafeArea();

    return (
        <View style = {[
            styles.container,
            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
        ]}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <BackButton white={false} style={styles.back} onPress={navigation.goBack}/>
            <Text style = {styles.header}>Request a Restaurant</Text>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(text) => {setTitle(text)}}
                    value={title}/>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    onChangeText={(text) => {setDesc(text)}}
                    value={desc}/>
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    onChangeText={(text) => {setLocation(text)}}
                    value={location}/>
                <TextInput
                    style={styles.input}
                    placeholder="Operating Hours"
                    onChangeText={(text) => {setOperatingHours(text)}}
                    value={operatingHours}/>
                <TextInput
                    style={styles.input}
                    placeholder="Contact No."
                    onChangeText={(text) => {setContact(text)}}
                    value={contact}/>
                <TextInput
                    style={styles.input}
                    placeholder="Tags (each tag separated by a space)"
                    onChangeText={(text) => {setTags(text)}}
                    value={tags}/>
            </KeyboardAvoidingView>
            <View style = {styles.buttonShadow}>
                <TouchableOpacity style = {styles.button} onPress = {submit}>
                    <Text style = {styles.buttonText}>Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RequestRestaurantPage

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
        color: '#404040'
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