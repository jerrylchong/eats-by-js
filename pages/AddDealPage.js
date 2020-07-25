import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Text,
    View,
    Platform,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { connect } from 'react-redux';
import {mapReduxStateToProps, mapReduxDispatchToProps} from "../helpers/reduxHelpers";
import BackButton from "../component/BackButton";
import {useSafeArea} from "react-native-safe-area-context";

export function AddDealPage(props) {
    const {route, navigation} = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [errors, setErrors] = useState({});

    const submit = () => {
        navigation.goBack();
    }

    const backHandler = () => navigation.goBack();

    const insets = useSafeArea();

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <View
                style = {[
                    styles.container,
                    {paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}
                ]}>
                <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
                <BackButton white={false} style = {{alignSelf: 'flex-start', margin: '2%'}} onPress = {() => navigation.goBack()} />
                <Text style = {styles.header}>Add a Dish</Text>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        onChangeText={(text) => {setTitle(text)}}
                        value={title}
                        placeholderTextColor='#404040'/>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        onChangeText={(text) => {setDescription(text)}}
                        value={description}
                        placeholderTextColor='#404040'/>
                    <TextInput
                        style={styles.input}
                        placeholder="Start Date"
                        onChangeText={(text) => {setStart(text)}}
                        value={start}
                        placeholderTextColor='#404040'/>
                    <TextInput
                        style={styles.input}
                        placeholder="End Date"
                        onChangeText={(text) => {setEnd(text)}}
                        value={end}
                        placeholderTextColor='#404040'/>
                    { Object.entries(errors).map(x => x[0] + " " + x[1][0]).map((x,i) =>
                        <Text
                            key={`${i}-error`}
                            style={styles.error}>{x}</Text>
                    )}
                </KeyboardAvoidingView>
                <View style = {{position: 'relative', top: '60%', width: '100%', height: '15%', flexDirection:"row", justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View style = {styles.buttonShadow}>
                        <TouchableOpacity style = {styles.button} onPress = {submit}>
                            <Text style = {styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ TouchableWithoutFeedback>
    )
}

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(AddDealPage)

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        minHeight: Math.round(Dimensions.get('window').height)
    },
    header: {
        fontSize: 20,
        fontFamily: 'Ubuntu-Medium',
        alignSelf: 'center'
    },
    list: {
        position: 'relative',
        top: '20%',
        width: '80%',
        height: '28%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputHeader: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    input: {
        borderRadius: windowWidth * 0.35,
        backgroundColor: '#d9d9d9',
        fontSize: 12,
        width: windowWidth * 0.8,
        height: windowWidth * 0.11,
        paddingHorizontal: '5%',
        fontFamily: 'Ubuntu',
        color: '#404040',
        fontWeight:'normal'
    },
    buttonShadow: {
        width: '25%',
        height: '30%',
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
    error: {
        fontSize: 14,
        color: '#fc8a1d',
        marginTop: '5%',
        fontFamily: 'Ubuntu'
    },
    top: {
        flexDirection: 'row',
        width: '100%',
    }
})
