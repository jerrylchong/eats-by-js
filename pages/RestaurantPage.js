import React from 'react';
import {Button, StatusBar, StyleSheet, Text, View} from "react-native";

function RestaurantPage({ navigation }) {
    return (
        <View style = {styles.container}>
            <Text>Placeholder Restaurant Page</Text>
            <Button onPress = {() => navigation.goBack()} title = 'Back' />
        </View>
    )
}

export default RestaurantPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
})