import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


const MenuButton = (props) => {
    return (
        <TouchableOpacity onPress = {props.onPress}>
            <Image style = {styles.image} source ={require('../assets/menubutton.png')} />
        </TouchableOpacity>
    )
}

export default MenuButton

const styles = StyleSheet.create({
    image: {
        height: 13,
        width: 13
    }
})