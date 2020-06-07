import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

function EditRestaurantPage({navigation}) {
    return (
        <SafeAreaView style = {styles.container}>
            <Text>Placeholder Page</Text>
            <TouchableOpacity style = {{marginTop: '3%', height: '5%', width: '10%'}} onPress = {() => navigation.goBack()}>
                <Text style = {{color:'#ffaf87', fontFamily: 'Ubuntu-Medium'}}>Back</Text>
            </TouchableOpacity>
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
})