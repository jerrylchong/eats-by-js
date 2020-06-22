import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Text,
    View,
    Platform,
    ImageBackground,
    Dimensions
} from "react-native";
import {postReview} from '../helpers/apiHelpers';
import { connect } from 'react-redux';
import {mapReduxStateToProps, mapReduxDispatchToProps} from "../helpers/reduxHelpers";
import { AirbnbRating } from 'react-native-ratings';

export function AddReviewPage(props) {
    const {route, navigation, token, user} = props;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('3');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const submit = () => {
        const review = { title,content,rating }
        const restaurant_id = route.params.restaurant_id;
        postReview(review, restaurant_id, token).then(response =>{
            if (!("error" in response) && !("errors" in response)){
                navigation.goBack();
            } else {
                "error" in response 
                    ? setErrors({authorized:"Not Authorized"})
                    : setErrors(response.errors);
            }
        });
    }
    const backHandler = () => navigation.goBack();
    return (
        <SafeAreaView style = {styles.container}>
            <ImageBackground style = {styles.background} source={require('../assets/background.png')}/>
            <Text style = {styles.header}>Add a Review</Text>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.list}>

                <TextInput
                    style={styles.input}
                    placeholder="Content"
                    onChangeText={(text) => {setContent(text)}}
                    value={content}/>
                <AirbnbRating
                    count={5}
                    reviews={["Can i SU this meal", "army standard", "im alive", "OK", "michilin ✨"]}
                    defaultRating={3}
                    onFinishRating={(rating) => {setRating(rating)}}
                />
                { Object.entries(errors).map(x => x[0] + " " + x[1][0]).map((x,i) => 
                <Text 
                    key={`${i}-error`}
                    style={styles.error}>{x}</Text>
                )}
            </KeyboardAvoidingView>
            <View style = {{width: '100%', height: '15%', flexDirection:"row", justifyContent: 'space-evenly', alignItems: 'center'}}>
                <View style = {styles.buttonShadow}>
                    <TouchableOpacity style = {styles.button} onPress = {backHandler}>
                        <Text style = {styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.buttonShadow}>
                    <TouchableOpacity style = {styles.button} onPress = {submit}>
                        <Text style = {styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default connect(mapReduxStateToProps,mapReduxDispatchToProps)(AddReviewPage)

const styles = StyleSheet.create({
    background: {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('window').width * 728/1668
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        marginTop: '10%',
        fontFamily: 'Ubuntu-Medium'
    },
    list: {
        width: '80%',
        height: '60%',
        alignItems: 'center',
        marginTop: '10%'
    },
    inputHeader: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    input: {
        borderWidth: 0.25,
        borderColor: '#B3B3B3',
        fontSize: 12,
        width: '100%',
        height: '70%',
        paddingHorizontal: 5,
        marginBottom: '8%',
        fontFamily: 'Ubuntu'
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
    }
})
