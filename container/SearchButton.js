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
        backgroundColor: '#d9d9d9',
        borderRadius: 20,
        width: '90%',
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