import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MenuButton from "../component/MenuButton";

class SearchButton extends React.Component {
    state = {
        animatedWidth: new Animated.Value(50),
        animatedHeight: new Animated.Value(50),
        pressed: false,
        searchTerm: ''
    }
    handleSearchTerm = searchTerm => this.setState({searchTerm})

    resetBar = () => {
        this.setState({
            pressed: false,
            searchTerm: '',
        })
        Animated.timing(this.state.animatedWidth, {
            toValue: 50,
            duration: 100
        }).start()
        Animated.timing(this.state.animatedHeight, {
            toValue: 50,
            duration: 100
        }).start()
    }

    pressMenu = () => {
        this.props.navigation.toggleDrawer();
        this.resetBar();
    }

    pressBigSearch = () => {
        Animated.timing(this.state.animatedWidth, {
            toValue: Dimensions.get('window').width * 0.8,
            duration: 200
        }).start()
        Animated.timing(this.state.animatedHeight, {
            toValue: 40,
            duration: 200
        }).start()
        this.setState({pressed: true})
    }

    pressSmallSearch = () => {
        this.setState({searchTerm: ''});
        this.resetBar();
    }

    render() {
        const {animatedWidth, animatedHeight, pressed, searchTerm} = this.state;
        const animatedStyle = { width: animatedWidth, height: animatedHeight }
        return (
            <View style = {styles.container}>
                <MenuButton style = {styles.menu} onPress = {this.pressMenu}/>
                <Animated.View style = {[styles.box, animatedStyle]}>
                    {pressed
                        ? <View style = {styles.searchBar}>
                            <TextInput
                                style = {styles.input}
                                placeholder = "Search"
                                placeholderTextColor = '#646464'
                                onChangeText = {this.handleSearchTerm}
                                value = {searchTerm} />
                            <TouchableOpacity
                                style = {{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}
                                onPress = {this.pressSmallSearch}>
                                <Image style = {styles.image} source ={require('../assets/magnifying_glass.png')} />
                            </TouchableOpacity>
                        </View>
                        : <Image style={{width: 50, height: 50}} source={require('../assets/templogonameless.png')}/>}
                </Animated.View>
                <TouchableOpacity style = {styles.bigImage} onPress = {this.pressBigSearch}>
                    {!pressed && <Image style = {styles.bigImage} source ={require('../assets/magnifying_glass.png')} />}
                </TouchableOpacity>
            </View>
        )
    }
}

export default SearchButton

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
    },
    searchBar: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'space-between',
        alignItems: 'center'
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
    image: {
        marginRight: '5%',
        height: 13,
        width: 15
    },
    bigImage: {
        height: 20,
        width: 24
    }
})