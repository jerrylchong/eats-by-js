import React from "react";
import {Text, TouchableOpacity, StyleSheet, View, Dimensions} from "react-native";

const PageButton = (prop) => {
    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.button} onPress = {prop.onPress}>
                <Text style = {{color: 'white', fontFamily: 'Ubuntu'}}>{prop.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PageButton

const styles = StyleSheet.create({
    shadow: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor: '#ff6961',
        borderRadius: Dimensions.get('window').width * 0.4,
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