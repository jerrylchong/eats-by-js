import React, { useState } from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Text, View, Platform} from "react-native";

function RegistrationPage({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const backHandler = () => {
        return (
            navigation.goBack()
        )
    }
    const submitHandler = () => {
        return (
            navigation.goBack()
        )
    }
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.header}>Sign Up</Text>
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
            </KeyboardAvoidingView>
            <View style = {styles.buttonShadow}>
                <TouchableOpacity style = {styles.button} onPress = {submitHandler}>
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.buttonShadow}>
                <TouchableOpacity style = {styles.button} onPress = {backHandler}>
                    <Text style = {styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RegistrationPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight,
    },
    header: {
        fontSize: 20,
        marginTop: '10%'
    },
    list: {
        width: '80%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    inputHeader: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'black',
        fontSize: 12,
        width: '100%',
        height: '5%',
        paddingHorizontal: 5,
    },
    buttonShadow: {
        width: '25%',
        height: '5%',
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
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
        color: 'black',
    }
})