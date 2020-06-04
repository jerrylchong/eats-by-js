import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';

const DishButton = (props) => {

    const { title, description, price, onPress } = props;

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style={styles.text}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.cost}>${price}</Text>
            </View>
            <Text style = {styles.description}>{description}</Text>
        </TouchableOpacity>
    )
}

export default DishButton

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: Dimensions.get('window').height * 0.08,
        alignSelf: 'center',
        borderTopWidth: 1,
        borderColor: '#404040',
    },
    text: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%',
        marginTop: '2%'
    },
    nameReview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Ubuntu-Bold'
    },
    cost: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Ubuntu'
    },
    description: {
        color: '#7e7e7e',
        fontSize: 11,
        alignSelf: 'flex-start',
        fontFamily: 'Ubuntu'
    },
})
