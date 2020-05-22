import React from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, SafeAreaView} from "react-native";
import Loading from "../component/Loading";

function SettingsPage({ navigation }) {
    return (
        <SafeAreaView>
            <TouchableOpacity style = {styles.container} onPress = {() => {navigation.goBack()}}>
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
        marginTop: StatusBar.currentHeight
    },
})