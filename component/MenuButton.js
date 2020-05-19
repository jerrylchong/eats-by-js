import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';


const MenuButton = (props) => {
    return (
        <TouchableOpacity style = {styles.container} onPress = {props.onPress}>
            <Image style = {styles.image} source ={require('../assets/menubutton.png')} />
        </TouchableOpacity>
    )
}

export default MenuButton

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 30,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    image: {
        height: 13,
        width: 13
    }
})