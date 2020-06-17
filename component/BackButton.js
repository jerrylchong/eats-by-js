import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Dimensions} from "react-native";

const BackButton = (props) => {
    return (
        <View style = {props.style}>
            <TouchableOpacity style = {styles.container} onPress = {props.onPress}>
                {props.white
                    ? <Image style = {styles.image} source ={require('../assets/whiteback.png')} />
                    : <Image style = {styles.image} source ={require('../assets/backbutton.png')} />
                }
            </TouchableOpacity>
        </View>
    )
}

export default BackButton

const windowWidth= Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        height: windowWidth * 0.1,
        width: windowWidth * 0.1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    image: {
        height: 13,
        width: 15
    }
})