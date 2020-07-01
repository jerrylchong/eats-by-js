import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, ImageBackground, Button} from "react-native";
import Loading from "../component/Loading";
import {useSafeArea} from "react-native-safe-area-context";

function ProfilePage({ navigation, route }) {
    const [isLoading, setLoading] = useState(false);
    const insets = useSafeArea();

    return (
        isLoading
            ? <Loading/>
            : <View style = {[
                styles.container,
                {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
            ]}>
                <Text>Profile Page</Text>
                <Text>Latest Reviews</Text>
                <Text>Pending Requests</Text>
                <Button title = "Back" onPress = {() => navigation.goBack()}/>
            </View>);
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
