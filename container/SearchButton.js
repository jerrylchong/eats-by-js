import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MenuButton from "../component/MenuButton";

class SearchButton extends React.Component {
    state = {
        animatedWidth: new Animated.Value(50),
        animatedHeight: new Animated.Value(50),
        pressed: false,
    }
    handleSearchTerm = this.props.handleSearchTerm;

    resetBar = () => {
        this.setState({
            pressed: false,
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
            duration: 300
        }).start()
        Animated.timing(this.state.animatedHeight, {
            toValue: 40,
            duration: 300
        }).start()
        this.setState({pressed: true})
    }

    pressSmallSearch = () => {
        this.resetBar();
    }

    render() {
        const {searchTerm} = this.props
        const {animatedWidth, animatedHeight, pressed} = this.state;
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
                                placeholderTextColor = '#404040'
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
        backgroundColor: '#ececec',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
    },
    input: {
        color: '#404040',
        fontSize: 16,
        marginLeft: '5%',
        fontFamily: 'Ubuntu-Light'
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