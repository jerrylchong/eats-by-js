import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    SafeAreaView,
    Dimensions,
    Platform, KeyboardAvoidingView
} from "react-native";
import LoginButton from "../component/LoginButton";

// ignore the LoginButton name

class WelcomePage extends React.Component {
    state = {
        name: '',
        password: '',
        error: false
    }

    handleName = (text) => {
        this.setState({name: text})
    }

    handlePassword = (text) => {
        this.setState({password: text})
    }

    render() {
        const {name, password, error} = this.state;
        const login = () => {
            if (name.length && password.length) {
                this.setState({name: "", password: ""})
                this.props.navigation.navigate('App')
            } else {
                this.setState({error: true})
            }
        }
        return (
            <SafeAreaView style = {styles.container}>
                <View style = {{alignItems: 'center'}}>
                    <Image style={styles.logo} source={require('../assets/templogonameless.png')}/>
                    <Image style={styles.name} source={require('../assets/templogoname.png')}/>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>
                    <TextInput
                        style={styles.usernameInput}
                        placeholder="Username"
                        onChangeText={this.handleName}
                        value={name}
                        textContentType='username'
                        autoCapitalize='none'/>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        onChangeText={this.handlePassword}
                        value={password}
                        secureTextEntry={true}
                        textContentType='password'
                        autoCapitalize='none'/>
                </KeyboardAvoidingView>
                <View style = {styles.buttons}>
                    <LoginButton text = 'Sign in' onPress = {login}/>
                    <Text style = {{marginTop: '10%', color: 'navy'}}>Don't have an account?</Text>
                    <LoginButton text = 'Create an Account' onPress = {() => this.props.navigation.navigate('Registration')}/>
                    <LoginButton text = 'Use as Guest' onPress = {() => {this.props.navigation.navigate('App')}}/>
                </View>
                <Text style = {styles.error}>{error ? 'Incorrect username or password' : null}</Text>
            </SafeAreaView>
        )
    }
}

export default WelcomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    logo: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        marginTop: '10%'
    },
    list: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    name: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4 * (58/180)
    },
    usernameInput: {
        borderBottomWidth: 1,
        borderColor: 'black',
        fontSize: 12,
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.08,
        paddingHorizontal: 5,
    },
    passwordInput: {
        borderBottomWidth: 1,
        borderColor: 'black',
        fontSize: 12,
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.08,
        paddingHorizontal: 5,
    },
    buttons: {
        height: '40%',
        width: '100%',
        alignItems: 'center'
    },
    error: {
        fontSize: 14,
        color: '#646464'
    }
})