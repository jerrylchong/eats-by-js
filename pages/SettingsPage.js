import React from 'react';
import {Button, StatusBar, Text, View, StyleSheet} from "react-native";

function SettingsPage({ navigation }) {
    return (
        <View style = {styles.container}>
            <Text>Placeholder Settings Page</Text>
            <Button onPress = {() => navigation.goBack()} title = 'Back' />
        </View>
    )
}

export default SettingsPage

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