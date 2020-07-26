import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Dimensions,
    BackHandler,
    Platform, Alert, AsyncStorage
} from "react-native";
import PageButton from "../component/PageButton";
import BackButton from "../component/BackButton";
import {useSafeArea} from "react-native-safe-area-context";
import {deleteRestaurant, getRestaurantFromApi,} from "../helpers/apiHelpers";
import Loading from "../component/Loading";

function StoreAdminPage({ navigation, route }) {
    const {restaurant_id} = route.params;
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getRestaurantFromApi(restaurant_id).then(data => setName(data.attributes.title)),
        ])
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const deleteStore = () => {
        return (
            Alert.alert("Delete Store",
                "Are you sure you want to delete " + name + "?",
                [
                    { text: "Cancel",
                        onPress: () => null,
                        style: "cancel" },
                    { text: "Yes", onPress: () => {
                            AsyncStorage.getItem("token")
                                .then(token => deleteRestaurant(restaurant_id, token))
                                .then(() => Alert.alert("Success",
                                    "Store " + name + " deleted."))
                        } }
                ]
            )
        )
    }
    const insets = useSafeArea();

    return (
        loading ? <Loading/> :
        <View style = {[
            styles.container,
            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
        ]}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <Text style = {styles.header}>Admin Tools for {name}</Text>
            <BackButton white={false} style={styles.back} onPress={navigation.goBack}/>
            <View style = {styles.buttons}>
                <PageButton text = "Edit Store" onPress = {() => navigation.navigate('Edit')}/>
                <PageButton text = "Delete Store" onPress = {deleteStore}/>
            </View>
        </View>
    );
}

export default StoreAdminPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668
    },
    back: {
        position: 'absolute',
        top: Platform.OS == "ios" ? '5%' :'2%',
        left: '3%'
    },
    header: {
        position: 'relative',
        top: '5%',
        width: '80%',
        fontSize: 20,
        marginTop: '5%',
        fontFamily: 'Ubuntu-Medium',
        color: '#404040',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    buttons: {
        position: 'relative',
        top: '26%',
    }
})
