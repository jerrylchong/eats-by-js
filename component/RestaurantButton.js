import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const RestaurantButton = () => {
    return (
        <View style = {styles.container}>
            <Image style={styles.picture} source={require('../assets/testrestaurant.png')}/>
            <View style={styles.text}>
                <Text style={styles.name}>Placeholder Name</Text>
                <Text style={styles.name}>$$$</Text>
            </View>
            <Text style = {styles.description}>This is a fake restaurant.</Text>
        </View>
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
        borderWidth: 1
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