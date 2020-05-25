import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import Tag from './Tag'

const RestaurantButton = (props) => {

    const { name, cost, description, rating, tags, onPress, image_url } = props;

    const ratingContainerStyle = {
        backgroundColor: parseFloat(rating) < 2.5
            ? '#d68c6c'
            : parseFloat(rating) < 4
                ? '#ffbf00'
                : '#66b58c',
        flexDirection: 'row',
        width: '28%',
        height: '20%',
        alignSelf: 'flex-end',
        borderRadius: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }

    return (
        <View style = {styles.shadow}>
            <ImageBackground style = {styles.background} imageStyle = {{borderRadius: 5}} source={require('../assets/cardbackground.png')}/>
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <View style={styles.text}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.cost}>{cost}</Text>
                </View>
                <View style = {styles.info}>
                    <Image style={styles.picture} source={{uri: image_url}} />
                    <View style = {styles.rightInfo}>
                        <View style = {styles.tags}>
                            { tags.map((elem, index) =>
                                <Tag
                                    key={`tag-${index}`}
                                    name={elem.name}
                                />
                            ) }
                        </View>
                        <Text style = {styles.description}>{description}</Text>
                        <View style = {ratingContainerStyle}>
                            {parseFloat(rating) < 2.5
                                ? <Image style = {styles.face} source={require('../assets/facebad.png')}/>
                                : parseFloat(rating) < 4
                                    ? <Image style = {styles.face} source={require('../assets/facemeh.png')}/>
                                    : <Image style = {styles.face} source={require('../assets/facegood.png')}/>}
                            <Text style = {styles.rating}>{parseFloat(rating)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RestaurantButton

const styles = StyleSheet.create({
    shadow: {
        width: '90%',
        height: Dimensions.get('window').height * 0.23,
        backgroundColor: 'white',
        borderRadius: 5,
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
    background: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 0.9 * 533.5/1668,
        borderRadius: 10
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
    info: {
        width: '94%',
        height: '65%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '4%'
    },
    picture: {
        height: '90%',
        width: '36%',
        borderRadius: 4,
    },
    rightInfo: {
        width: '61%',
        height: '96%',
        alignItems: 'center',
        marginLeft: '2%',
        justifyContent: 'space-between'
    },
    tags: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    description: {
        color: '#a0a0a0',
        fontSize: 11,
        alignSelf: 'flex-start',
        marginBottom: '10%'
    },
    face: {
        height: 16,
        width: 16,
    },
    rating: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '2%'
    }
})
