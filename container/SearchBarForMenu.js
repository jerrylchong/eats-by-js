import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Dimensions } from 'react-native';

class SearchBarForMenu extends React.Component {
    render() {
        const {searchTerm, clearSearch, navigation} = this.props
        return (
            <View style = {styles.container}>
                <View style = {styles.searchBar}>
                    <TextInput
                        style = {styles.input}
                        placeholder = "Search"
                        placeholderTextColor = '#404040'
                        onChangeText = {this.handleSearchTerm}
                        value = {searchTerm} />
                    <TouchableOpacity
                        style = {{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}
                        onPress = {clearSearch}>
                        <Image style = {styles.image} source ={require('../assets/X.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default SearchBarForMenu

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: '3%'
    },
    searchBar: {
        flexDirection: 'row',
        width: windowWidth * 0.9,
        height: windowWidth * 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ececec',
        borderRadius: 25,
    },
    back: {
        height: 50,
        width: 30,
        justifyContent: 'center'
    },
    backImage: {
        height: 13,
        width: 13
    },
    input: {
        color: '#404040',
        fontSize: 16,
        marginLeft: '5%',
        fontFamily: 'Ubuntu-Light',
        width: '80%'
    },
    image: {
        marginRight: '5%',
        height: 13,
        width: 13
    },
    bigImage: {
        height: 20,
        width: 24
    }
})