import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, AsyncStorage} from 'react-native';
import Tag from "./Tag";
import {deleteDish} from '../helpers/DishAPI'

const EditDishButton = (props) => {

    const { title, description, price, onPress, navigation, id, refresh } = props;

    return (
        <TouchableOpacity disabled={true} style = {styles.container} onPress = {onPress}>
            <View style={styles.text}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.cost}>${price}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style = {styles.description}>{description}</Text>
                <View style={{flexDirection: 'row', width: '20%', justifyContent: 'space-between'}}>
                    <Tag name={"Edit"} onPress={
                        () => navigation.navigate('Edit Dish',
                            {
                                id: id,
                                title: title,
                                desc: description,
                                price: price,
                            })
                    }/>
                    <Tag name={"Delete"} onPress={
                        () => {
                            Alert.alert("Delete Dish",
                                "Are you sure you want to delete " + title + "?",
                                [
                                    { text: "Cancel",
                                        onPress: () => null,
                                        style: "cancel" },
                                    { text: "Yes", onPress: () => {
                                            AsyncStorage.getItem("token")
                                                .then(token => deleteDish(id, token))
                                                .then(() => Alert.alert("Success",
                                                    "Dish " + title + " deleted."))
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

export default EditDishButton

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
    cost: {
        color: '#404040',
        fontSize: 20,
        fontFamily: 'Ubuntu'
    },
    description: {
        color: '#7e7e7e',
        fontSize: 11,
        alignSelf: 'flex-start',
        fontFamily: 'Ubuntu',
        width: '75%'
    },
})
