import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import {getUsername} from '../helpers/apiHelpers'

const Review = (props) => {
    const {user_id, date, title, rating, content} = props
    const [user, setUser] = useState("");
    useEffect(() => {
        getUsername(user_id).then(data => setUser(data.username))
    },[]);
    return (
        <View style = {styles.container}>
            <View style = {styles.titleRating}>
                <Text style = {styles.title}>{title}</Text>
                <Text style = {styles.rating}>{rating}/5</Text>
            </View>
            <Text style = {styles.user}>{user} . {date}</Text>
            <Text style = {styles.content}>{content}</Text>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: Dimensions.get('window').height * 0.1,
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
        borderColor: '#b3b3b3',
        marginBottom: '3%',
        paddingHorizontal: '3%',
        alignSelf: 'center'

    },
    titleRating: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#404040',
        fontSize: 16,
        fontFamily: 'Ubuntu-Bold'
    },
    rating: {
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
    }
})
