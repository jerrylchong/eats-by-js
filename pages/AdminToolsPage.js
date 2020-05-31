import React from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet, Text, ImageBackground, Dimensions} from "react-native";
import PageButton from "../component/PageButton";

function AdminToolsPage({ navigation, route }) {

    return (
        <SafeAreaView style = {styles.container}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <PageButton text = "Add a Restaurant" onPress = {() => navigation.navigate('Add Restaurant')}/>
            <PageButton text = "Edit/Delete a Restaurant"/>
            <TouchableOpacity style = {{marginTop: '10%'}} onPress = {() => navigation.goBack()}>
                <Text style = {{color:'#ffaf87', fontFamily: 'Ubuntu-Medium'}}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default AdminToolsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668
    },
})
