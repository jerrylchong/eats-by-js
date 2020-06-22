import React, {useEffect} from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Dimensions,
    BackHandler,
    Platform
} from "react-native";
import PageButton from "../component/PageButton";
import BackButton from "../component/BackButton";
import {useSafeArea} from "react-native-safe-area-context";

function AdminToolsPage({ navigation, route }) {

    useEffect(() => {
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

    const insets = useSafeArea();

    return (
        <View style = {[
            styles.container,
            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
        ]}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <Text style = {styles.header}>Admin Tools</Text>
            <BackButton white={false} style={styles.back} onPress={navigation.goBack}/>
            <View style = {styles.buttons}>
                <PageButton text = "Add a Restaurant" onPress = {() => navigation.navigate('Add')}/>
                <PageButton text = "Edit a Restaurant" onPress = {() => navigation.navigate('Edit')}/>
                <PageButton text = "Delete a Restaurant" onPress = {() => navigation.navigate('Delete')}/>
            </View>
        </View>
    );
}

export default AdminToolsPage

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
        left: '2%'
    },
    header: {
        position: 'relative',
        top: '5%',
        fontSize: 20,
        marginTop: '5%',
        fontFamily: 'Ubuntu-Medium',
        color: '#404040'
    },
    buttons: {
        position: 'relative',
        top: '27%',
    }
})
