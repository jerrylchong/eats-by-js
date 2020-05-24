import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Tag from './Tag'

const RestaurantButton = (props) => {

    const { name, cost, description, rating, tags, onPress, image_url } = props;

    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <Image style={styles.picture} source={{uri: image_url}} />
                <View style={styles.text}>
                    <View style={styles.nameReview}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.rating}>{rating}/5</Text>
                    </View>
                    <Text style={styles.name}>{cost}</Text>
                </View>
                <Text style = {styles.description}>{description}</Text>
                <View style = {styles.tags}>
                    { tags.map((elem, index) =>
                        <Tag
                            key={`tag-${index}`}
                            name={elem.name}
                        />
                    ) }
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
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        margin: 10
    },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        height: 187,
        width: 335,
        borderRadius: 8
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
        color: '#404040',
        fontSize: 20
    },
    rating: {
        color: '#646464',
        fontSize: 12,
        marginLeft: 5,
        marginTop: 3
    },
    description: {
        color: '#b3b3b3',
        fontSize: 11,
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    tags: {
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: 'flex-start',
        marginLeft: 10
    }
})
