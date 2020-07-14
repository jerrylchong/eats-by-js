import React from 'react';
import {Text, View, StyleSheet, Platform, Dimensions} from 'react-native';
import { useSafeArea } from "react-native-safe-area-context";
import BackButton from "../component/BackButton";

export default function RequestedList(props) {
    const insets = useSafeArea();
    const {navigation} = props;

    return (
        <View style = {[styles.container, {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}]}>
            <Text>Placeholder List</Text>
            <BackButton white={false} style={styles.back} onPress={navigation.goBack}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Math.round(Dimensions.get('window').height)
    },
    back: {
        position: 'absolute',
        top: Platform.OS == "ios" ? '5%' :'2%',
        left: '2%'
    },
})