import React from 'react';
import {
    StyleSheet, Text, View, TextInput, Image, SafeAreaView, Dimensions, ImageBackground, StatusBar,
    TouchableOpacity, AsyncStorage, Platform, KeyboardAvoidingView, Alert, TouchableWithoutFeedback, Keyboard
} from "react-native";
import {connect} from 'react-redux';
import LoginButton from "../component/LoginButton";
import {postLogin} from "../helpers/apiHelpers" 
import {mapReduxStateToProps, mapReduxDispatchToProps} from "../helpers/reduxHelpers";
import {getProfileData} from "../helpers/apiHelpers";
import Loading from "../component/Loading";
import {SafeAreaConsumer} from "react-native-safe-area-context";

// ignore the LoginButton name

class WelcomePage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            error: false,
            isLoading: false,
            isFetching: false
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
                    .catch(err => {
                        console.error("Authentication Token is invalid, removing from storage...")
                        AsyncStorage.removeItem("token");
                        this.setState({isFetching: false})
                    })
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
                        if ("errors" in data) {
                            console.log(data["errors"])
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
            <SafeAreaConsumer>
                {insets =>
                    <TouchableWithoutFeedback style = {styles.container} onPress={() => Keyboard.dismiss()}>
                        <View style = {[
                            styles.container,
                            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
                        ]}>
                            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
                            <TouchableOpacity style = {styles.logoShadow} onPress = {() => Alert.alert('About','Jay Chua and Jerryl Chong 2020')}>
                                <Image style={styles.logo} source={require('../assets/templogonameless.png')}/>
                            </TouchableOpacity>
                            <Text style = {styles.header}>Sign In</Text>
                            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : 'height'} style = {styles.list}>
                                <TextInput
                                    style={styles.usernameInput}
                                    placeholder="Username"
                                    onChangeText={this.handleName}
                                    value={name}
                                    autoCapitalize='none'
                                    placeholderTextColor='#404040'/>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Password"
                                    onChangeText={this.handlePassword}
                                    value={password}
                                    secureTextEntry={true}
                                    autoCapitalize='none'
                                    placeholderTextColor='#404040'/>
                                {isLoading && <Loading/>}
                            </KeyboardAvoidingView>
                            <Text style = {styles.error}>{error ? 'Incorrect username or password' : null}</Text>
                            <View style = {{position: 'relative', top: '25%', height: '20%', justifyContent: 'space-evenly'}}>
                                <LoginButton text = 'Sign in' onPress = {login}/>
                                <LoginButton text = 'Use as Guest' onPress = {() => {this.props.navigation.navigate('App')}}/>
                                <TouchableOpacity style = {{alignSelf: 'center'}}
                                                  onPress = {() => Alert.alert("Error 404: Brain Not Found", "You dumb")}>
                                    <Text style = {{color:'#c74a44', fontFamily: 'Ubuntu-Medium'}}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.buttons}>
                                <Text style = {{color: '#404040', fontFamily: 'Ubuntu'}}>Don't have an account?</Text>
                                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Registration')}>
                                    <Text style = {{color:'#ff8041', fontFamily: 'Ubuntu-Medium'}}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </SafeAreaConsumer>
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
        minHeight: Math.round(Dimensions.get('window').height)
    },
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: windowWidth * 728/1668
    },
    logoShadow: {
        position: 'relative',
        top: '5%',
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
        position: 'relative',
        top: '15%',
        fontSize: 26,
        alignSelf: 'flex-start',
        marginLeft: windowWidth * 0.15,
        color: '#404040',
        fontFamily: 'Ubuntu-Bold',
    },
    list: {
        position: 'relative',
        top: '25%',
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
        color: '#404040'
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
        color: '#404040'
    },
    buttons: {
        position: 'relative',
        top: '35%',
        height: '6%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    error: {
        position: 'relative',
        top: '27%',
        fontSize: 14,
        color: '#c74a44',
        fontFamily: 'Ubuntu'
    }
})
