import React from 'react';
import {
    StyleSheet, Text, View, TextInput, Image, SafeAreaView, Dimensions, ImageBackground,
    TouchableOpacity, AsyncStorage, Platform, KeyboardAvoidingView, Alert, TouchableWithoutFeedback, Keyboard
} from "react-native";
import {connect} from 'react-redux';
import LoginButton from "../component/LoginButton";
import {postLogin} from "../helpers/apiHelpers" 
import {mapReduxStateToProps, mapReduxDispatchToProps} from "../helpers/reduxHelpers";
import {getProfileData} from "../helpers/apiHelpers";
import Loading from "../component/Loading";

// ignore the LoginButton name

class WelcomePage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            error: false,
            isLoading: false,
            isFetching: false,
        };
        this.props = props;
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

    componentDidMount() {
        this.setState({isFetching : true});
        AsyncStorage.getItem("token").then(token => {
            if (token != null) {
                getProfileData(token)
                    .then( user_data => this.props.updateUser(user_data))
                    .then(_ => this.setState({isFetching : false}))
                    .then(_ => this.props.navigation.navigate('App'))
            } else {
                this.setState({isFetching : false});
            }
        })
    }

    render() {
        const {name, password, error, isLoading, isFetching} = this.state;
        const login = () => {
            Keyboard.dismiss();
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
                            // get user information
                            getProfileData(auth_token)
                                .then( user_data => this.props.updateUser(user_data))
                                .then(_ => {
                                    // clear states
                                    this.setState({
                                        name:"",
                                        password:"",
                                    })
                                    this.props.navigation.navigate('App')})
                        }
                    })
            } else {
                this.setState({error: true})
            }
        }
        return (
        isFetching
            ? <Loading />
            :
            <TouchableWithoutFeedback style = {styles.container} onPress={() => Keyboard.dismiss()}>
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
                <Text style = {styles.error}>{error ? 'Incorrect username or password' : null}</Text>
                <View style = {{marginTop: '5%'}}>
                    <LoginButton text = 'Sign in' onPress = {login}/>
                    <LoginButton text = 'Use as Guest' onPress = {() => {this.props.navigation.navigate('App')}}/>
                    <TouchableOpacity style = {{alignSelf: 'center'}}
                        onPress = {() => Alert.alert("Error 404: Brain Not Found", "You dumb")}>
                        <Text style = {{color:'#c74a44', marginTop: '5%', fontWeight: 'bold'}}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.buttons}>
                    <Text style = {{color: '#404040', marginRight: '2%'}}>Don't have an account?</Text>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('Registration')}>
                        <Text style = {{color:'#ffaf87', fontWeight: 'bold'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(WelcomePage)

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
        color: '#404040',
        fontWeight: 'bold'
    },
    list: {
        width: '100%',
        height: '12%',
        alignItems: 'center',
        marginTop: '20%'
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
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    error: {
        fontSize: 14,
        color: '#fc8a1d',
        marginTop: '5%'
    }
})
