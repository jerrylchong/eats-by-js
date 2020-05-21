import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Tag from './Tag'

const RestaurantButton = (props) => {

    const { name, cost, description, rating, tags, onPress } = props;

    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <Image style={styles.picture} source={require('../assets/testrestaurant.png')}/>
                <View style={styles.text}>
                    <View style={styles.nameReview}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.rating}>{rating}/5</Text>
                    </View>
                    <Text style={styles.name}>{cost}</Text>
                </View>
                <Text style = {styles.description}>{description}</Text>
                <View style = {styles.tags}>
                    { tags.map((elem) =>
                        <Tag
                            key={`${elem.name}-tag`}
                            name={elem.name}
                        />) }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RestaurantButton

const styles = StyleSheet.create({
    shadow: {
        width: 355,
        height: 270,
        backgroundColor: 'white',
        borderRadius: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 5
    },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
    },
    picture: {
        height: 187,
        width: 335,
        padding: 5
    },
    text: {
        width: 335,
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
