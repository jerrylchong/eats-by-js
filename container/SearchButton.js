import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

class SearchButton extends React.Component {
    state = {
        searchTerm: ''
    }

    handleSearchTerm = searchTerm => this.setState({searchTerm})

    render() {
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                           placeholder = "Search"
                           placeholderTextColor = '#646464'
                           onChangeText = {this.handleSearchTerm}
                           value = {this.state.searchTerm} />
            </View>
        )
    }
}

export default SearchButton

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#DBDBDB',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        width: 375,
        height: 40,
        alignItems: 'flex-start'
    },
    input: {
        color: '#646464',
        fontSize: 16
    }
})