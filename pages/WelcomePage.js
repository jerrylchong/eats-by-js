import React from 'react';
import {Button, StatusBar, StyleSheet, Text, View, TextInput, Image, SafeAreaView, AsyncStorage} from "react-native";
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
                <View style = {{alignItems: 'center'}}>
                    <Image style={styles.logo} source={require('../assets/templogonameless.png')}/>
                    <Image style={styles.name} source={require('../assets/templogoname.png')}/>
                </View>
                <View>
                    <TextInput
                        style={styles.inputTop}
                        placeholder="Username"
                        onChangeText={this.handleName}
                        value={name}/>
                    <TextInput
                        style={styles.inputBottom}
                        placeholder="Password"
                        onChangeText={this.handlePassword}
                        value={password}/>
                    {isLoading && <Text>Loading..</Text>}
                </View>
                <View>
                    <LoginButton text = 'Sign in' onPress = {login}/>
                    <LoginButton text = 'Registration' onPress = {() => this.props.navigation.navigate('Registration')}/>
                    <LoginButton text = 'Use as Guest' onPress = {() => {this.props.navigation.navigate('App')}}/>
                </View>
                <Text style = {styles.error}>{error ? 'Incorrect username or password' : null}</Text>
            </SafeAreaView>
        )
    }
}

const mapReduxStateToProps = state => ({token : state.token});
const mapReduxDispatchToProps = dispatch => ({ 
    updateToken: (token) => dispatch({type: "SET_TOKEN", payload:token})
});

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(WelcomePage)

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
        width: 200,
        height: 200
    },
    name: {
        width: 180,
        height: 58
    },
    inputTop: {
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        width: 200,
        height: 30,
        paddingHorizontal: 5,
    },
    inputBottom: {
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        width: 200,
        height: 30,
        paddingHorizontal: 5,
        marginTop: 20
    },
    error: {
        fontSize: 14,
        color: '#646464'
    }
})
