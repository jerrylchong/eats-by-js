import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';

const DishButton = (props) => {

    const { title, description, price, onPress } = props;

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style={styles.text}>
                <View style={styles.nameReview}>
                    <Text style={styles.name}>{title}</Text>
                </View>
                <Text style={styles.name}>${price}</Text>
            </View>
            <Text style = {styles.description}>{description}</Text>
        </TouchableOpacity>
    )
}

export default DishButton

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: Dimensions.get('window').height * 0.12,
        justifyContent: 'space-evenly',
    },
    text: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameReview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: 'black',
        fontSize: 20
    },
    rating: {
        color: '#646464',
        fontSize: 12,
        marginLeft: 5,
        marginTop: 3
    },
    description: {
        color: '#7e7e7e',
        fontSize: 11,
        alignSelf: 'flex-start',
        marginLeft: 5
    },
    tags: {
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: 'flex-start',
        marginLeft: 5
    }
})
