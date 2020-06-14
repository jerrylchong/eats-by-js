import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MenuButton from "../component/MenuButton";

class SearchButton extends React.Component {

    state = {
        animatedWidth: new Animated.Value(windowWidth * 0.12),
        animatedHeight: new Animated.Value(windowWidth * 0.12),
        pressed: false
    }

    componentDidMount() {
        this.leave = this.props.navigation.addListener("blur", () => {
                this.resetBar();
            });
    }

    componentWillUnmount() {
        this.leave();
    }

    handleSearchTerm = this.props.handleSearchTerm;

    resetBar = () => {
        this.setState({
            pressed: false,
        })
        Animated.timing(this.state.animatedWidth, {
            toValue: windowWidth * 0.12,
            duration: 100
        }).start()
        Animated.timing(this.state.animatedHeight, {
            toValue: windowWidth * 0.12,
            duration: 100
        }).start()
    }

    pressMenu = () => {
        this.props.navigation.toggleDrawer();
        this.resetBar();
    }

    pressSearch = () => {
        Animated.timing(this.state.animatedWidth, {
            toValue: windowWidth * 0.8,
            duration: 300
        }).start()
        Animated.timing(this.state.animatedHeight, {
            toValue: windowWidth * 0.1,
            duration: 300
        }).start()
        this.setState({pressed: true})
    }

    render() {
        const {searchTerm, clearSearch} = this.props
        const {animatedWidth, animatedHeight, pressed} = this.state;
        const animatedStyle = { width: animatedWidth, height: animatedHeight }
        return (
            <View style = {styles.container}>
                <MenuButton onPress = {this.pressMenu}/>
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
                                onPress = {searchTerm.length == 0 ? this.resetBar : clearSearch}>
                                <Image style = {styles.image} source ={require('../assets/X.png')} />
                            </TouchableOpacity>
                        </View>
                        : <Image style={{width: windowWidth * 0.12, height: windowWidth * 0.12}} source={require('../assets/templogonameless.png')}/>}
                </Animated.View>
                {!pressed &&
                <TouchableOpacity style={styles.bigImage} onPress={this.pressSearch}>
                    <Image style={styles.bigImage} source={require('../assets/magnifying_glass.png')}/>
                </TouchableOpacity>
                }
            </View>
        )
    }
}

export default SearchButton

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
    },
    searchBar: {
        flexDirection: 'row',
        width: windowWidth * 0.8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        backgroundColor: '#ececec',
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: 25,
        justifyContent: 'center',
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