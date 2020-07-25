import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Tag = (props) => {
    const tagColor = props.name == "halal" ? "#66b58c" : "#ff6961"
    return (
        <TouchableOpacity disabled={props.disabled} style={props.style} onPress = {props.onPress}>
            <View style = {[styles.container, {backgroundColor: tagColor}]}>
                <Text style = {styles.text}>
                    {props.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const SuggestTag = (props) => {
    return (
        <TouchableOpacity disabled={props.disabled} style={props.style} onPress = {props.onPress}>
            <View style = {SuggestTagStyles.container}>
                <Text style = {SuggestTagStyles.text}>
                    {props.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const SuggestTagStyles = StyleSheet.create({
    container: {
        borderColor: '#ff6961',
        borderWidth: 0.5,
        borderRadius: 10,
        marginRight: 5
    },
    text: {
        fontSize: 10,
        color: '#ff6961',
        paddingHorizontal: 9,
        paddingVertical: 3,
        fontFamily: 'Ubuntu-Bold'
    }
})

export default Tag

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff6961',
        borderRadius: 10,
        marginRight: 5
    },
    text: {
        fontSize: 10,
        color: 'white',
        paddingHorizontal: 9,
        paddingVertical: 3,
        fontFamily: 'Ubuntu-Bold'
    }
})
