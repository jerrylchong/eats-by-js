import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {getUsername} from '../helpers/apiHelpers'

const Review = (props) => {
    const {user_id, date, title, rating, content} = props
    const [user, setUser] = useState("");
    const ratingContainerStyle = {
        backgroundColor: parseFloat(rating) < 0
            ? '#b3b3b3'
            : parseFloat(rating) < 2.5
                ? '#d68c6c'
                : parseFloat(rating) < 4
                    ? '#ffbf00'
                    : '#66b58c',
        flexDirection: 'row',
        height: Dimensions.get('window').width * 0.15,
        width: Dimensions.get('window').width * 0.15,
        borderRadius: 36,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
    useEffect(() => {
        getUsername(user_id).then(data => setUser(data.username))
    },[]);
    return (
        <View style = {styles.container}>
            <View style={styles.avatar}>
                <View style = {ratingContainerStyle}>
                    {parseFloat(rating) < 0
                        ? <Text style = {styles.rating}>NA</Text>
                        : parseFloat(rating) < 2.5
                            ? <Image style = {styles.face} source={require('../assets/facebad.png')}/>
                            : parseFloat(rating) < 4
                                ? <Image style = {styles.face} source={require('../assets/facemeh.png')}/>
                                : <Image style = {styles.face} source={require('../assets/facegood.png')}/>}
                </View>
            </View>
            <View style={styles.rightColumn}>
                <View style = {styles.titleRating}>
                    <Text style = {styles.title}>{title}</Text>
                    <Text style = {styles.rating}>{rating}/5</Text>
                </View>
                <Text style = {styles.user}>{date} . {user}</Text>
                <Text style = {styles.content}>{content}</Text>
            </View>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height * 0.1,
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderColor: '#b3b3b3',
        paddingHorizontal: '3%',
        flexDirection: 'row',

    },
    rightColumn: {
        width:"80%",
        marginLeft:"5%",
        flexDirection: 'column',
        justifyContent: 'center',
        height: "100%",
    },
    avatar: {
        height: "100%",
        justifyContent: 'center',
    },
    titleRating: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flex:10,
        color: '#404040',
        fontSize: 16,
        fontFamily: 'Ubuntu-Bold'
    },
    rating: {
        flex:1,
        color: '#404040',
        fontSize: 14,
        fontFamily: 'Ubuntu-Bold'
    },
    user: {
        color: '#b3b3b3',
        fontSize: 12,
        fontFamily: 'Ubuntu-Medium'
    },
    content: {
        color: '#b3b3b3',
        fontSize: 12,
        flexWrap: 'wrap',
        fontFamily: 'Ubuntu'
    },
    face: {
        height: Dimensions.get('window').width * 0.15 - 8,
        width: Dimensions.get('window').width * 0.15 - 8,
    },
})
