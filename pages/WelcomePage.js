import React from 'react';
import {Button, StatusBar, StyleSheet, Text, View, TextInput, Image, SafeAreaView} from "react-native";
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