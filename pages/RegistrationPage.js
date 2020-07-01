import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Text,
    View,
    Platform,
    Dimensions, ImageBackground, Image, Keyboard, TouchableWithoutFeedback
} from "react-native";
import {postSignUp} from '../helpers/apiHelpers'
import {useSafeArea} from "react-native-safe-area-context";

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
                setLoading(false);
                if (res.ok) {
                    navigation.goBack();
                    alert("Account Created");
                } else {
                    throw res;
                }
            }).catch(async err => {
                res = await err.json()
                if ("errors" in res) { 
                    // format error
                    const error = Object.entries(res["errors"]).map(entry => {
                        const label = entry[0]
                        return entry[1].map(err => label + " " + err).join("\n");
                    })
                    alert(error);
                    setErrors(res["errors"]); 
                } 
            })
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

    const insets = useSafeArea();

    return (
        <TouchableWithoutFeedback style = {styles.container} onPress={() => Keyboard.dismiss()}>
        <View style = {[
            styles.container,
            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
        ]}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <Text style = {styles.header}>Create an Account</Text>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>
                <TextInput
                    style={styles.usernameInput}
                    placeholder="Username"
                    onChangeText={(text) => {setUsername(text)}}
                    value={username}
                    textContentType='username'
                    autoCapitalize='none'
                    placeholderTextColor='#404040'/>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    onChangeText={(text) => {setPassword(text)}}
                    value={password}
                    secureTextEntry={true}
                    textContentType='newPassword'
                    autoCapitalize='none'
                    placeholderTextColor='#404040'/>
                { isLoading && <Text style = {{position: 'relative', top: '30%', color: '#ff8041', fontFamily: 'Ubuntu'}}>checking with db...</Text>}
                {
                    !isLoading && hasErrors(errors) && Object.entries(errors).map(x => x.join(' ')).map((error,index) => 
                        <Text
                            style = {{position: 'relative', top: '30%', color: '#c74a44', fontFamily: 'Ubuntu'}}
                            key={`${index}-error`}
                        >{error}</Text>) 
                }
            </KeyboardAvoidingView>
            <View style={styles.buttonShadow}>
                <TouchableOpacity style={styles.button} onPress={submitHandler}>
                    <Text style={{color: 'white', fontFamily: 'Ubuntu'}}>Create Account</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.buttons}>
                <Text style = {{color: '#404040', fontFamily: 'Ubuntu'}}>Already have an account?</Text>
                <TouchableOpacity onPress = {() => navigation.goBack()}>
                    <Text style = {{color:'#ff8041', margin: '5%', fontFamily: 'Ubuntu-Medium'}}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
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
    },
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: windowWidth * 728/1668
    },
    header: {
        position: 'relative',
        top: '20%',
        fontSize: 26,
        alignSelf: 'flex-start',
        marginLeft: windowWidth * 0.15,
        color: '#404040',
        fontFamily: 'Ubuntu-Bold',
    },
    list: {
        position: 'relative',
        top: '30%',
        width: '100%',
        height: '15%',
        alignItems: 'center',
    },
    usernameInput: {
        position: 'relative',
        borderRadius: windowWidth * 0.35,
        backgroundColor: '#d9d9d9',
        fontSize: 12,
        width: windowWidth * 0.75,
        height: windowWidth * 0.11,
        paddingHorizontal: '5%',
        fontFamily: 'Ubuntu',
        color: '#404040',
        fontWeight:'normal'
    },
    passwordInput: {
        position: 'relative',
        top: '15%',
        borderRadius: windowWidth * 0.35,
        backgroundColor: '#d9d9d9',
        fontSize: 12,
        width: windowWidth * 0.75,
        height: windowWidth * 0.11,
        paddingHorizontal: '5%',
        fontFamily: 'Ubuntu',
        color: '#404040',
        fontWeight:'normal'
    },
    buttons: {
        position: 'relative',
        top: '50%',
        height: '20%',
        width: '100%',
        alignItems: 'center',
    },
    buttonShadow: {
        position: 'relative',
        top: '40%',
        width: Dimensions.get('window').height * 0.25,
        height: Dimensions.get('window').height * 0.05,
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
        marginBottom: '5%',
        fontFamily: 'Ubuntu'
    }
})
