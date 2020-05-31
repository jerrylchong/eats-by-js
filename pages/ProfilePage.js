import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text, ImageBackground, Button} from "react-native";
import Loading from "../component/Loading";

function ProfilePage({ navigation, route }) {
    const [isLoading, setLoading] = useState(false);

    return (
        isLoading
            ? <Loading/>
            : <SafeAreaView style = {styles.container}>
                <Text>Profile Page</Text>
                <Text>Lastest Reviews</Text>
                <Text>Pending Requests</Text>
                <Button title = "Back" onPress = {() => navigation.goBack()}/>
            </SafeAreaView>);
}

export default ProfilePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
