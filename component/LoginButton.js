import React from "react";
import {Text, TouchableOpacity, StyleSheet, View, Dimensions} from "react-native";

const LoginButton = (prop) => {
    return (
        <View style = {[styles.shadow, prop.style]}>
            <TouchableOpacity style = {styles.button} onPress = {prop.onPress}>
                <Text style = {{color: 'white', fontFamily: 'Ubuntu'}}>{prop.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginButton

const styles = StyleSheet.create({
    shadow: {
        width: Dimensions.get('window').height * 0.25,
        height: Dimensions.get('window').height * 0.05,
        backgroundColor: '#ff6961',
        borderRadius: 25,
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
    }
})