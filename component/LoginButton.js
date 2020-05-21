import React from "react";
import {Text, TouchableOpacity, StyleSheet, View} from "react-native";

const LoginButton = (prop) => {
    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.button} onPress = {prop.onPress}>
                <Text>{prop.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginButton

const styles = StyleSheet.create({
    shadow: {
        width: 200,
        height: 40,
        backgroundColor: 'white',
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
    }
})