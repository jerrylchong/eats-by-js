import React from 'react';
import {
    StatusBar, StyleSheet, Text, View, TextInput, Image, SafeAreaView, Dimensions,
    ImageBackground, TouchableOpacity, AsyncStorage, Platform, KeyboardAvoidingView
} from "react-native";
import {connect} from 'react-redux';
import LoginButton from "../component/LoginButton";
import {postLogin} from "../helpers/apiHelpers" 

// ignore the LoginButton name

class WelcomePage extends React.Component {
    state = {
        name: '',
        password: '',
        error: false,
        isLoading: false
    }

    handleName = (text) => {
        this.setState({name: text})
    }

    handlePassword = (text) => {
        this.setState({password: text})
    }
    setToken = (token) => {
        this.props.updateToken(token);
        AsyncStorage.setItem("token", token);
    }

    render() {
        const {name, password, error, isLoading} = this.state;
        const login = () => {
            if (name.length && password.length) {
                this.setState({isLoading: true});
                postLogin(name, password)
                    .then(data => {
                        this.setState({ isLoading: false });
                        if ("error" in data) {
                            this.setState({error: true});
                        } else {
                            const auth_token = data["auth_token"]
                            this.setToken(auth_token);
                            // clear states
                            this.setState({
                                name:"",
                                password:"",
                            })
                            this.props.navigation.navigate('App')
                        }
                    })
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
                        autoCapitalize='none'/>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        onChangeText={this.handlePassword}
                        value={password}
                        secureTextEntry={true}
                        autoCapitalize='none'/>
                        {isLoading && <Text>Loading..</Text>}
                </KeyboardAvoidingView>
                <View style = {{marginTop: '10%'}}>
                    <LoginButton text = 'Sign in' onPress = {login}/>
                    <LoginButton text = 'Use as Guest' onPress = {() => {this.props.navigation.navigate('App')}}/>
                </View>
                <Text style = {styles.error}>{error ? 'Incorrect username or password' : null}</Text>
                <View style = {styles.buttons}>
                    <Text style = {{color: '#404040'}}>Don't have an account?</Text>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('Registration')}>
                        <Text style = {{color:'#66b58c', margin: '5%'}}>Create an Account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const mapReduxStateToProps = state => ({token : state.token});
const mapReduxDispatchToProps = dispatch => ({ 
    updateToken: (token) => dispatch({type: "SET_TOKEN", payload:token})
});

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(WelcomePage)

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
    logoShadow: {
        marginTop:'5%',
        marginLeft: '10%',
        alignSelf: 'flex-start',
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderRadius: windowWidth * 0.15 / 2,
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
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
    },
    header: {
        fontSize: 24,
        alignSelf: 'flex-start',
        marginLeft: windowWidth * 0.15,
        marginTop: '20%',
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
        marginTop: '10%'
    },
    error: {
        fontSize: 14,
        color: '#fc8a1d',
        marginTop: '5%',
        marginBottom: '5%'
    }
})
