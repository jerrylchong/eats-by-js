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
    Platform,
    KeyboardAvoidingView,
    ImageBackground,
    TouchableOpacity
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
                <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
                <View style = {styles.logoShadow}>
                    <Image style={styles.logo} source={require('../assets/templogonameless.png')}/>
                </View>
                <Text style = {styles.header}>Sign In</Text>
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
                <View>
                    <LoginButton text = 'Sign in' onPress = {login}/>
                    <LoginButton text = 'Use as Guest' onPress = {() => {this.props.navigation.navigate('App')}}/>
                </View>
                <Text style = {styles.error}>{error ? 'Incorrect username or password' : null}</Text>
                <View style = {styles.buttons}>
                    <Text style = {{color: '#404040'}}>Don't have an account?</Text>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('Registration')}>
                        <Text style = {{color:'#fc8a1d', margin: '5%'}}>Create an Account</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668
    },
    logoShadow: {
        top:'5%',
        left: '10%',
        alignSelf: 'flex-start',
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        borderRadius: Dimensions.get('window').width * 0.15 / 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    header: {
        fontSize: 24,
        alignSelf: 'flex-start',
        marginLeft: Dimensions.get('window').width * 0.15,
        marginTop: '20%',
        color: '#404040'
    },
    list: {
        width: '100%',
        height: '12%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    usernameInput: {
        borderBottomWidth: 1,
        borderColor: '#404040',
        fontSize: 12,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.08,
        paddingHorizontal: 5,
    },
    passwordInput: {
        borderBottomWidth: 1,
        borderColor: 'black',
        fontSize: 12,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.08,
        paddingHorizontal: 5,
    },
    buttons: {
        height: '15%',
        width: '100%',
        alignItems: 'center',
        marginTop: '10%'
    },
    error: {
        fontSize: 14,
        color: '#646464'
    }
})