import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import MenuButton from "../component/MenuButton";
import SearchButton from "../container/SearchButton";
import RestaurantButton from "../component/RestaurantButton";

const fakeRestaurantData = [
    { title : "Jerryl's topoki paradise" , cost: '$$' ,descr: "best tomyum", tags: [{name:'jerryl'}, {name:'tomyum'}]},
    { title : "Jays's topoki paradise" , cost: '$', descr: "best tomyum", tags: [{name:'jay'}, {name:'tomyum'}]} ,
    { title : "Aerin's topoki paradise" , cost: '$$$', descr: "subpar tomyum", tags: [{name:'aerin'}, {name:'tomyum'}]},
    { title : "Oli's topoki paradise" , cost: '$$$', descr: "worst tomyum", tags: [{name:'oli'}, {name:'tomyum'}]},
]

function RestaurantList({ navigation }) {
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.navBar}>
                <MenuButton onPress = {() => navigation.toggleDrawer()}/>
                <SearchButton />
            </View>
            <ScrollView>
                { fakeRestaurantData.map((elem) =>
                    <RestaurantButton
                        name={elem.title}
                        cost={elem.cost}
                        description={elem.descr}
                        tags={elem.tags}
                        onPress={() => navigation.navigate('Restaurant')}
                    />) }
            </ ScrollView>
        </SafeAreaView>
    )
}

export default RestaurantList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    navBar: {
        flexDirection: 'row',
        height: 95,
        width: 375,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    }
});