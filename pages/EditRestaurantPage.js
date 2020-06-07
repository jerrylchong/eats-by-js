import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function EditRestaurantPage({navigation}) {
    return (
        <SafeAreaView style = {styles.container}>
            <Text>Placeholder Page</Text>
            <View style = {styles.buttonShadow}>
                <TouchableOpacity style = {styles.button} onPress = {navigation.goBack}>
                    <Text style = {styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default EditRestaurantPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonShadow: {
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').width * 0.08,
        backgroundColor: '#ff6961',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: Dimensions.get('window').height * 0.05
    },
    button: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Ubuntu',
    }
})