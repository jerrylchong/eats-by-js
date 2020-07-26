import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, AsyncStorage, Alert} from 'react-native';
import Tag from "./Tag";
import {createRestaurant, deleteRestaurant, deleteRestaurantRequest} from "../helpers/apiHelpers";

const RequestedRestaurantButton = (props) => {

    const { request_id, name, location, opening_hours, contact, lat, lng, no_of_stalls, refresh } = props;
    const [error, setError] = useState(false);

    const addStore = () => {
        const res_data = {
            title: name,
            price: 1,
            image_link: "",
            location: location,
            operating_hours: opening_hours,
            contact: contact,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            no_of_stalls: no_of_stalls == null ? 0 : no_of_stalls
        }
        AsyncStorage.getItem("token")
            .then(token => createRestaurant(res_data, token))
            .then(() => Alert.alert("Success",
                "Store " + name + " Added."))
            .catch(err =>{
                // need display this error somehow
                setError(true);
                alert("Errors");
                console.log(err);
            })
    }

    const deleteStore = () => {
        Alert.alert("Delete Requested Store",
            "Are you sure you want to delete " + name + "?",
            [
                { text: "Cancel",
                    onPress: () => null,
                    style: "cancel" },
                { text: "Yes", onPress: () => {
                        AsyncStorage.getItem("token")
                            .then(token => deleteRestaurantRequest(request_id, token))
                            .then(() => Alert.alert("Success",
                                "Requested Store " + name + " deleted."))
                            .then(() => refresh())
                            .catch(console.err)
                    } }
            ]
        )
    }

    return (
        <View style = {styles.shadow}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
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
                    <Text numberOfLines={1} style = {styles.description}>
                        Contact: {contact}, No of Stalls: {no_of_stalls}
                    </Text>
                </View>
                <View style={{height: '50%', justifyContent: 'space-between'}}>
                    <Tag disabled={false} name={"Add"} onPress={addStore}/>
                    <Tag disabled={false} name={"Delete"} onPress={deleteStore}/>
                </View>
            </View>
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
        borderBottomWidth: 0.05,
        borderBottomColor: '#B3B3B3',
        borderTopWidth: 0.25,
        borderTopColor: '#B3B3B3'
    },
    container: {
        height: '100%',
        width: '80%',
        paddingHorizontal: '2%',
        justifyContent:'center',
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
