import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

const RequestedRestaurantButton = (props) => {

    const { name, onPress, location, opening_hours, lat, lng } = props;

    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <View style = {styles.container}>
                    <Text numberOfLines={1} style={styles.name}>{name}</Text>
                    <Text numberOfLines={1} style = {styles.description}>
                        Location: {location}
                    </Text>
                    <Text numberOfLines={1} style = {styles.description}>
                        Latitude: {lat}, Longitude {lng}
                    </Text>
                    <Text numberOfLines={1} style = {styles.description}>
                        Hours: {opening_hours}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RequestedRestaurantButton

const styles = StyleSheet.create({
    shadow: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.17,
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
    name: {
        color: '#404040',
        fontSize: 20,
        height: Dimensions.get('window').width * 0.06,
        flexWrap: 'nowrap',
        fontFamily: 'Ubuntu-Bold',
        alignSelf:'flex-start'
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
    }
})
