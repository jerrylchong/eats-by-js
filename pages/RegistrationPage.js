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
    Dimensions, ImageBackground, Image
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
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <Text style = {styles.header}>Create an Account</Text>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>
                <TextInput
                    style={styles.usernameInput}
                    placeholder="Username"
                    onChangeText={(text) => {setUsername(text)}}
                    value={username}
                    textContentType='username'
                    autoCapitalize='none'/>
                <TextInput
                    style={styles.passwordInput}
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
            <View style = {{width: '100%', height: '15%', alignItems: 'center', marginTop: '10%'}}>
                <View style={styles.buttonShadow}>
                    <TouchableOpacity style={styles.button} onPress={submitHandler}>
                        <Text style={{color: 'white'}}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.buttons}>
                <Text style = {{color: '#404040'}}>Already have an account?</Text>
                <TouchableOpacity onPress = {() => navigation.goBack()}>
                    <Text style = {{color:'#66b58c', margin: '5%'}}>Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RegistrationPage;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: windowWidth * 728/1668
    },
    header: {
        fontSize: 24,
        alignSelf: 'flex-start',
        marginLeft: windowWidth * 0.15,
        marginTop: '30%',
        color: '#404040'
    },
    list: {
        width: '100%',
        height: '12%',
        alignItems: 'center',
        marginTop: '10%'
    },
    usernameInput: {
        borderBottomWidth: 1,
        borderColor: '#404040',
        fontSize: 12,
        width: windowWidth * 0.7,
        height: windowWidth * 0.08,
        paddingHorizontal: 5,
    },
    passwordInput: {
        borderBottomWidth: 1,
        borderColor: '#404040',
        fontSize: 12,
        width: windowWidth * 0.7,
        height: windowWidth * 0.08,
        paddingHorizontal: 5,
        marginTop: '5%'
    },
    buttons: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        marginTop: '25%'
    },
    buttonShadow: {
        width: '40%',
        height: '50%',
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
        margin: 10
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        fontSize: 14,
        color: '#646464',
        marginTop: '5%',
        marginBottom: '5%'
    }
})
