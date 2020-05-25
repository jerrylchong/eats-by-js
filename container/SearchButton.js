import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MenuButton from "../component/MenuButton";

class SearchButton extends React.Component {
    state = {
        animatedWidth: new Animated.Value(50),
        animatedHeight: new Animated.Value(50),
        pressed: false,
        searchTerm: '',
        imageStyle : { height: 20, width: 24 }
    }
    handleSearchTerm = searchTerm => this.setState({searchTerm})

    pressSearch = () => {
        this.setState({searchTerm: ''})
        Animated.timing(this.state.animatedWidth, {
            toValue: Dimensions.get('window').width * 0.8,
            duration: 300
        }).start()
        Animated.timing(this.state.animatedHeight, {
            toValue: 40,
            duration: 100
        }).start()
        this.setState(
            {pressed: true,
                imageStyle: {position: 'absolute', right: '5%', height: 13, width: 15}})
    }

    render() {
        const {animatedWidth, animatedHeight, pressed, searchTerm, imageStyle} = this.state;
        const animatedStyle = { width: animatedWidth, height: animatedHeight }
        const animatedSearch = {}
        return (
            <View style = {styles.container}>
                <MenuButton style = {styles.menu} onPress = {this.props.onPress}/>
                <Animated.View style = {[styles.box, animatedStyle]}>
                    {pressed
                        ? <TextInput
                            style = {styles.input}
                            placeholder = "Search"
                            placeholderTextColor = '#646464'
                            onChangeText = {this.handleSearchTerm}
                            value = {searchTerm} />
                        : null}
                </Animated.View>
                <TouchableOpacity style = {imageStyle} onPress = {this.pressSearch}>
                    <Image style = {imageStyle} source ={require('../assets/magnifying_glass.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default SearchButton

const windowWidth = Dimensions.get('window').width
const boxWidth = windowWidth * 0.95 - 30 - 24

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
    },
    boxContainer: {
        width: boxWidth,
    },
    box: {
        backgroundColor: '#d9d9d9',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center'
    },
    input: {
        color: '#646464',
        fontSize: 16,
        marginLeft: '5%'
    },
})