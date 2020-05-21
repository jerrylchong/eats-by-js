import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const DishButton = (props) => {

    const { title, description, price, onPress } = props;

    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <View style={styles.text}>
                    <View style={styles.nameReview}>
                        <Text style={styles.name}>{title}</Text>
                    </View>
                    <Text style={styles.name}>${price}</Text>
                </View>
                <Text style = {styles.description}>{description}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DishButton

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '78%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
        marginLeft: '4%'
    },
    text: {
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
