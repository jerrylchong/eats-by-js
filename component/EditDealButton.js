import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, AsyncStorage} from 'react-native';
import Tag from "./Tag";
import {deleteDeal} from "../helpers/DealAPI";

const EditDealButton = (props) => {

    const { id, title, description, start, end, onPress, navigation, refresh} = props;

    return (
        <TouchableOpacity disabled={true} style = {styles.container} onPress = {onPress}>
            <View style={styles.text}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.duration}>{start.substring(0,10)} - {end.substring(0,10)}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style = {styles.description}>{description}</Text>
                <View style={{flexDirection: 'row', width: '20%', justifyContent: 'space-between'}}>
                    <Tag name={"Edit"} onPress={
                        () => navigation.navigate('Edit Deal',
                            {
                                id: id,
                                title: title,
                                desc: description,
                                start: start,
                                end: end
                            })
                    }/>
                    <Tag name={"Delete"} onPress={
                        () => {
                            Alert.alert("Delete Deal",
                                "Are you sure you want to delete " + title + "?",
                                [
                                    { text: "Cancel",
                                        onPress: () => null,
                                        style: "cancel" },
                                    { text: "Yes", onPress: () => {
                                            AsyncStorage.getItem("token")
                                                .then(token => deleteDeal(id, token))
                                                .then(() => Alert.alert("Success",
                                                    "Deal " + title + " deleted."))
                                                .then(() => refresh())
                                                .catch(console.err)
                                        } }
                                ]
                            )
                        }
                    }/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default EditDealButton;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:"3%",
        width: '100%',
        height: Dimensions.get('window').height * 0.10,
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        borderBottomWidth: 0.5,
        borderColor: '#b3b3b3',
        backgroundColor: 'white'
    },
    text: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameReview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: '#404040',
        fontSize: 20,
        fontFamily: 'Ubuntu-Bold'
    },
    duration: {
        color: '#404040',
        fontSize: 14,
        fontFamily: 'Ubuntu'
    },
    description: {
        width: '75%',
        color: '#7e7e7e',
        fontSize: 11,
        alignSelf: 'flex-start',
        fontFamily: 'Ubuntu'
    },
})
