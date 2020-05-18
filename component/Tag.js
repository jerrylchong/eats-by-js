import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Tag = (props) => {
    return (
        <TouchableOpacity>
            <Text style = {styles.text}>
                {props.name}
            </Text>
        </TouchableOpacity>
    )
}

export default Tag

const styles = StyleSheet.create({
    text: {
        backgroundColor: '#4a4444',
        borderRadius: 10,
        fontSize: 9,
        color: 'white',
        paddingHorizontal: 9,
        paddingVertical: 3,
        marginRight: 5
    }
})