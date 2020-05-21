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
    /*
    shadow: {
        width: 375,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 15
    },
    */
    container: {
        height: 60,
        width: 375,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
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
