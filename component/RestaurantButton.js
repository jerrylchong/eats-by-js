import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import Tag from './Tag'

const RestaurantButton = (props) => {

    const { name, cost, description, rating, tags, onPress, image_url, halal, location, opening_hours } = props;

    const ratingContainerStyle = {
        position:'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: parseFloat(rating) < 0
            ? '#b3b3b3'
            : parseFloat(rating) < 2.5
                ? '#d68c6c'
                : parseFloat(rating) < 4
                    ? '#ffbf00'
                    : '#66b58c',
        flexDirection: 'row',
        height: Dimensions.get('window').width * 0.06,
        width: Dimensions.get('window').width * 0.14,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }


    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <View style = {styles.info}>
                    <Image style={styles.picture} source={{uri: image_url}} />
                    <View style = {styles.rightInfo}>
                        <Text numberOfLines={1} style={styles.name}>{name}</Text>
                        <View style = {styles.tags}>
                            { tags.map((elem, index) =>
                                <Tag
                                    key={`tag-${index}`}
                                    name={elem.name}
                                />
                            ) }
                            {halal && <Tag name = {'halal'}/>}
                            <View style = {styles.cost}>
                                {parseFloat(cost) > 0 && <Image style = {styles.coin} source={require('../assets/coin.png')}/>}
                                {parseFloat(cost) > 5 && <Image style = {styles.coin} source={require('../assets/coin.png')}/>}
                                {parseFloat(cost) > 7.5 && <Image style = {styles.coin} source={require('../assets/coin.png')}/>}
                            </View>
                        </View>
                        <Text numberOfLines={1} style = {styles.description}>
                            Location: {location}
                        </Text>
                        <Text numberOfLines={1} style = {styles.description}>
                            {opening_hours}
                        </Text>
                    </View>
                </View>
                <View style = {ratingContainerStyle}>
                    {parseFloat(rating) < 0
                        ? <Text style = {styles.rating}>NA</Text>
                        : parseFloat(rating) < 2.5
                            ? <Image style = {styles.face} source={require('../assets/facebad.png')}/>
                            : parseFloat(rating) < 4
                                ? <Image style = {styles.face} source={require('../assets/facemeh.png')}/>
                                : <Image style = {styles.face} source={require('../assets/facegood.png')}/>}
                    {parseFloat(rating) > 0 && <Text style = {styles.rating}>{parseFloat(rating).toFixed(1)}</Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RestaurantButton

const styles = StyleSheet.create({
    shadow: {
        width: '100%',
        height: Dimensions.get('window').height * 0.22,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
    container: {
        height: '100%',
        width: '100%',
        paddingHorizontal: '2%',
        justifyContent:'center',
        borderBottomWidth: 0.05,
        borderBottomColor: '#B3B3B3',
        borderTopWidth: 0.25,
        borderTopColor: '#B3B3B3'
        
    },
    background: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width * 0.898,
        height: Dimensions.get('window').width * 0.9 * 533.5/1668,
        borderRadius: 10
    },
    text: {
        width: '94%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2%',
        marginLeft: '1.2%',
        paddingHorizontal: '1%'
    },
    name: {
        color: '#404040',
        fontSize: 20,
        height: Dimensions.get('window').width * 0.06,
        flexWrap: 'nowrap',
        fontFamily: 'Ubuntu-Bold',
        alignSelf:'flex-start'
    },
    cost: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf:'flex-end'
    },
    info: {
        width: '100%',
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center'
    },
    picture: {
        height: Dimensions.get('window').height * 0.15,
        width: Dimensions.get('window').height * 0.15,
        borderRadius: 4,
    },
    rightInfo: {
        width: '61%',
        height: '96%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    tags: {
        paddingVertical:7,
        flexDirection: 'row',
        alignItems:'center'
    },
    description: {
        color: '#a0a0a0',
        fontSize: 10,
        alignSelf: 'flex-start',
        fontFamily: 'Ubuntu',
        paddingVertical: '2%'
    },
    face: {
        height: 16,
        width: 16,
    },
    rating: {
        fontSize: 14,
        color: 'white',
        marginTop: '2%',
        fontFamily: 'Ubuntu-Bold'
    },
    coin: {
        height: Dimensions.get('window').width * 0.06,
        width: Dimensions.get('window').width * 0.06,
    },
})
