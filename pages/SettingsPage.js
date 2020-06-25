import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Loading from "../component/Loading";
import {useSafeArea} from "react-native-safe-area-context";

function SettingsPage({ navigation }) {

    const insets = useSafeArea();

    return (
        <View style = {[
            styles.container,
            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
        ]}>
            <TouchableOpacity onPress = {() => {navigation.goBack()}}>
                <Loading />
            </TouchableOpacity>
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
    },
})