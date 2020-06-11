import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from "react-native";

const BackButton = (props) => {
    return (
        <View style = {props.style}>
            <TouchableOpacity style = {styles.container} onPress = {props.onPress}>
                <Image style = {styles.image} source ={require('../assets/whiteback.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    image: {
        height: 13,
        width: 15
    }
})