import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Tag = (props) => {
    return (
        <TouchableOpacity>
            <View style = {styles.container}>
                <Text style = {styles.text}>
                    {props.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Tag

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4a4444',
        borderRadius: 10,
        marginRight: 5
    },
    text: {
        fontSize: 9,
        color: 'white',
        paddingHorizontal: 9,
        paddingVertical: 3,
    }
})