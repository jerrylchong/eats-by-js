import React from 'react';
import {StyleSheet, TouchableOpacity, SafeAreaView} from "react-native";
import Loading from "../component/Loading";

function SettingsPage({ navigation }) {
    return (
        <SafeAreaView style = {styles.container}>
            <TouchableOpacity onPress = {() => {navigation.goBack()}}>
                <Loading />
            </TouchableOpacity>
        </SafeAreaView>
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
    },
})