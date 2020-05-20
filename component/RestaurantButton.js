import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Tag from './Tag'

const RestaurantButton = (props) => {

    const { name, cost, description, tags, onPress } = props;

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <Image style={styles.picture} source={require('../assets/testrestaurant.png')}/>
            <View style={styles.text}>
                <Text style={styles.name}>{name}</Text>
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
    )
}

export default RestaurantButton

const styles = StyleSheet.create({
    container: {
        height: 270,
        width: 368,
        justifyContent: 'center',
        alignItems: 'center',
        padding:5,
        borderTopColor: '#b2b2b2',
        borderTopWidth: 1
    },
    picture: {
        height: 187,
        width: 358,
        padding: 5
    },
    text: {
        width: 358,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        color: 'black',
        fontSize: 20
    },
    description: {
        color: '#7e7e7e',
        fontSize: 11,
        alignSelf: 'flex-start'
    },
    tags: {
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: 'flex-start'
    }
})
