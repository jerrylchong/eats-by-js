import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const RestaurantButton = (props) => {

    const { name, cost, description } = props;

    return (
        <TouchableOpacity style = {styles.container}>
            <Image style={styles.picture} source={require('../assets/testrestaurant.png')}/>
            <View style={styles.text}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.name}>{cost}</Text>
            </View>
            <Text style = {styles.description}>{description}</Text>
        </TouchableOpacity>
    )
}

export default RestaurantButton

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: 368,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    picture: {
        height: 187,
        width: 358,
        padding: 5
    },
    text: {
        width: 358,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    name: {
        color: 'black',
        fontSize: 20
    },
    description: {
        color: '#7e7e7e',
        fontSize: 11,
        alignSelf: 'flex-start'
    }
})
