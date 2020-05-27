import React, { useState } from 'react';
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
    Dimensions
} from "react-native";

function AddRestaurantPage({ navigation }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
    const [contact, setContact] = useState('');
    const [rating, setRating] = useState('');
    const [tags, setTags] = useState('');
    const submit = () => {
        return (
            navigation.goBack()
        )
    }
    return (
        <SafeAreaView style = {styles.container}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <Text style = {styles.header}>Add a Restaurant</Text>
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
                    placeholder="Rating (out of 5)"
                    onChangeText={(text) => {setRating(text)}}
                    value={rating}/>
                <TextInput
                    style={styles.input}
                    placeholder="Tags (each tag separated by a space)"
                    onChangeText={(text) => {setTags(text)}}
                    value={tags}/>
            </KeyboardAvoidingView>
            <View style = {styles.buttons}>
                <View style = {styles.buttonShadow}>
                    <TouchableOpacity style = {styles.button} onPress = {submit}>
                        <Text style = {styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.buttonShadow}>
                    <TouchableOpacity style = {styles.button} onPress = {submit}>
                        <Text style = {styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddRestaurantPage

const styles = StyleSheet.create({
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        marginTop: '5%'
    },
    list: {
        width: '80%',
        height: '60%',
        alignItems: 'center',
        marginTop: '5%'
    },
    inputHeader: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#404040',
        fontSize: 12,
        width: '100%',
        height: '8%',
        paddingHorizontal: 5,
        marginBottom: '8%'
    },
    buttons: {
        width: '100%',
        height: '20%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10%'
    },
    buttonShadow: {
        width: '25%',
        height: '30%',
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
    }
})