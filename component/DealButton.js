import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

const DealButton = (props) => {

    const { title, description, start, end, onPress } = props;

    return (
        <TouchableOpacity disabled={true} style = {styles.container} onPress = {onPress}>
            <View style={styles.text}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.duration}>{start.substring(0,10)} - {end.substring(0,10)}</Text>
            </View>
            <Text style = {styles.description}>{description}</Text>
        </TouchableOpacity>
    )
}

export default DealButton;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:"3%",
        width: '100%',
        height: Dimensions.get('window').height * 0.10,
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        borderBottomWidth: 0.5,
        borderColor: '#b3b3b3',
        backgroundColor: 'white'
    },
    text: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameReview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: '#404040',
        fontSize: 20,
        fontFamily: 'Ubuntu-Bold'
    },
    duration: {
        color: '#404040',
        fontSize: 14,
        fontFamily: 'Ubuntu'
    },
    description: {
        color: '#7e7e7e',
        fontSize: 11,
        alignSelf: 'flex-start',
        fontFamily: 'Ubuntu'
    },
})
