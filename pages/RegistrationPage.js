import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Text,
    View,
    Platform,
    Dimensions
} from "react-native";
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
            <Text style = {styles.header}>Create an Account</Text>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => {setUsername(text)}}
                    value={username}
                    textContentType='username'
                    autoCapitalize='none'/>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => {setPassword(text)}}
                    value={password}
                    secureTextEntry={true}
                    textContentType='newPassword'
                    autoCapitalize='none'/>
                { isLoading && <Text>checking with db...</Text>}
                {
                    !isLoading && hasErrors(errors) && Object.entries(errors).map(x => x.join(' ')).map((error,index) => 
                        <Text
                            key={`${index}-error`}
                            >{error}</Text>) 
                }
            </KeyboardAvoidingView>
            <View style = {{width: '100%', height: '10%', alignItems: 'center'}}>
                <View style={styles.buttonShadow}>
                    <TouchableOpacity style={styles.button} onPress={submitHandler}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{width: '100%', height: '10%', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Text style = {{marginBottom: '5%', color: 'navy'}}>Already have an account?</Text>
                <View style={styles.backButtonShadow}>
                    <TouchableOpacity style={styles.button} onPress={backHandler}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'space-evenly',
        marginTop: StatusBar.currentHeight,
    },
    header: {
        fontSize: 22
    },
    list: {
        width: '80%',
        height: '20%',
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
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.08,
        paddingHorizontal: 5,
    },
    buttonShadow: {
        width: '40%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 3,
    },
    backButtonShadow: {
        width: '20%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 3,
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
        fontSize: 13,
        color: 'black',
    }
})
