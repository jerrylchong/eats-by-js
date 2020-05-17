import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native';

class SearchButton extends React.Component {
    state = {
        searchTerm: ''
    }

    handleSearchTerm = searchTerm => this.setState({searchTerm})

    pressSearch = () => {
        this.setState({searchTerm: ''})
    }

    render() {
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                           placeholder = "Search"
                           placeholderTextColor = '#646464'
                           onChangeText = {this.handleSearchTerm}
                           value = {this.state.searchTerm} />
                <TouchableOpacity onPress = {this.pressSearch}>
                    <Image style = {styles.image} source ={require('../assets/magnifying_glass.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default SearchButton

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#DBDBDB',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        width: 375,
        height: 40,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        color: '#646464',
        fontSize: 16
    },
    image: {
        height: 13,
        width: 15
    }
})