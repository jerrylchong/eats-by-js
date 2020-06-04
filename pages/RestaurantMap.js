import React, { useState } from "react";

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {SafeAreaView, StyleSheet, View} from "react-native";
import SearchButton from "../container/SearchButton";

const RestaurantMap = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.navBar}>
                <SearchButton
                    navigation = {navigation}
                    searchTerm = {searchTerm}
                    handleSearchTerm = {searchTerm => {
                    }}
                />
            </View>
            <MapView
                style={{ flex: 1, height: '90%', width: '100%' }}
                region={{
                    latitude: 1.296643,
                    longitude: 103.776398,
                    latitudeDelta: 0.002212,
                    longitudeDelta: 0.00395,
                }}
                provider={MapView.PROVIDER_GOOGLE}
                showsUserLocation={true}
            />
        </SafeAreaView>
    );
};

export default RestaurantMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        height: '10%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});