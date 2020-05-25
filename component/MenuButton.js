import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';


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

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 24,
        justifyContent: 'center'
    },
    image: {
        height: 13,
        width: 13
    }
})