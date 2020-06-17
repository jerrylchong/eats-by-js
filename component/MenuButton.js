import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Dimensions } from 'react-native';


const MenuButton = (props) => {
    return (
        <View style = {props.style}>
            <TouchableOpacity style = {styles.container} onPress = {props.onPress}>
                <Image style = {styles.image} source ={require('../assets/menubutton.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default MenuButton

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        height: windowWidth * 0.1,
        width: windowWidth * 0.1,
        justifyContent: 'center'
    },
    image: {
        height: 13,
        width: 13
    }
})