import React, { useState } from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Text, View, Platform} from "react-native";
import {postSignUp} from '../helpers/apiHelpers'

function RegistrationPage({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setLoading] = useState(false);

    const [errors, setErrors] = useState({})

    const hasErrors = (errors) => {
        return Object.keys(errors).length !== 0;
    }

    const backHandler = () => {
        return (
            navigation.goBack()
        )
    }
    const submitHandler = () => {
        setLoading(true);
        postSignUp(username,password)
            .then(res => {
                console.log(res);
                if ("errors" in res) { setErrors(res["errors"]); }
                setLoading(false);
            });

    }

    /*
     * Sample error data from server
    {
      "errors": {
        "password": [ "can't be blank", ],
        "username": [ "can't be blank", ],
      },
    }
    */
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.header}>Sign Up</Text>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => {setUsername(text)}}
                    value={username}/>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => {setPassword(text)}}
                    value={password}/>
                { isLoading && <Text>checking with db...</Text>}
                {
                    !isLoading && hasErrors(errors) && Object.entries(errors).map(x => x.join(' ')).map((error,index) => 
                        <Text
                            key={`${index}-error`}
                            >{error}</Text>) 
                }
            </KeyboardAvoidingView>


                <View style={styles.buttonShadow}>
                    <TouchableOpacity style={styles.button} onPress={submitHandler}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonShadow}>
                    <TouchableOpacity style={styles.button} onPress={backHandler}>
                        <Text style={styles.buttonText}>Back</Text>
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
        justifyContent: 'flex-start',
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
