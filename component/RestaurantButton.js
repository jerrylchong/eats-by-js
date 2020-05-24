import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Tag from './Tag'

const RestaurantButton = (props) => {

    const { name, cost, description, rating, tags, onPress, image_url } = props;

    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <Image style={styles.picture} source={{uri: image_url}} />
                <View style={styles.text}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={{
                        color: parseFloat(rating) < 2.5
                            ? '#d68c6c'
                            : parseFloat(rating) < 4
                                ? '#ffbf00'
                                : '#66b58c',
                        fontSize: 14,
                    }}>
                        {rating}/5
                    </Text>
                    <Text style={styles.cost}>{cost}</Text>
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
        width: '90%',
        height: Dimensions.get('window').height * 0.37,
        backgroundColor: 'white',
        borderRadius: 3,
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
        alignItems: 'center',
    },
    picture: {
        height: '65%',
        width: '94%',
        borderRadius: 2,
        marginTop: '3%'
    },
    text: {
        width: '94%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2%'
    },
    name: {
        color: '#404040',
        fontSize: 20,
        fontWeight: 'bold',
        width: '75%',
        height: 25,
        flexWrap: 'nowrap'
    },
    cost: {
        color: '#404040',
        fontSize: 20,
    },
    description: {
        color: '#a0a0a0',
        fontSize: 11,
        alignSelf: 'flex-start',
        marginLeft: '3%',
        marginTop: '1%'
    },
    tags: {
        flexDirection: 'row',
        marginTop: '2%',
        alignSelf: 'flex-start',
        marginLeft: '3%'
    }
})
