import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Dimensions,
    BackHandler,
    Platform,
    TextInput, TouchableOpacity
} from "react-native";
import BackButton from "../component/BackButton";
import {useSafeArea} from "react-native-safe-area-context";

function FeedbackPage({ navigation }) {

    const [content, setContent] = useState('');

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

    const submit = () => {
        navigation.goBack();
    }

    const insets = useSafeArea();

    return (
        <View style = {[
            styles.container,
            {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
        ]}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <Text style = {styles.header}>Leave your Feedback</Text>
            <BackButton white={false} style={styles.back} onPress={navigation.goBack}/>
            <TextInput
                multiline={true}
                style={styles.input}
                placeholder="Enter feedback here"
                onChangeText={(text) => {setContent(text)}}
                value={content}
                placeholderTextColor='#404040'
                textAlignVertical={'top'}
                placeholderStyle={{margin: '2%'}}
            />
            <View style = {styles.buttonShadow}>
                <TouchableOpacity style = {styles.button} onPress = {submit}>
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FeedbackPage

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
        top: '22%',
    },
    input: {
        position: 'relative',
        top: '15%',
        borderRadius: 10,
        fontSize: 12,
        width: '80%',
        height: '45%',
        padding: '3%',
        marginBottom: '8%',
        fontFamily: 'Ubuntu',
        backgroundColor: '#d9d9d9',
        color: '#404040',
    },
    buttonShadow: {
        position: 'relative',
        top: '20%',
        width: '25%',
        height: '5%',
        backgroundColor: '#ff6961',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 3,
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Ubuntu'
    },
})
