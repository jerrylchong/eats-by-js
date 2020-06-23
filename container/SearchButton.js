import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Animated, Dimensions, Text } from 'react-native';
import MenuButton from "../component/MenuButton";
import Tag, { SuggestTag } from "../component/Tag";
import {Autocomplete} from "react-native-dropdown-autocomplete";

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
        const {
            searchTerm,
            clearSearch,
            tagFilters,
            setTagFilters,
            suggestions,
        } = this.props
        const {animatedWidth, animatedHeight, pressed} = this.state;
        const animatedStyle = { width: animatedWidth, height: animatedHeight }
        return (
            <View style={styles.biggerContainer}>
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
                    <TouchableOpacity style={styles.bigImageButton} onPress={this.pressSearch}>
                        <Image style={styles.bigImage} source={require('../assets/magnifying_glass.png')}/>
                    </TouchableOpacity>
                    }
                </View>
                {pressed &&
                <View style={styles.filterRow}>
                    {
                         tagFilters.map( tag =>
                            <Tag style={{marginTop:5}} name={`x ${tag}`} onPress={() => setTagFilters(tagFilters.filter(x => x != tag))}/>
                        )
                    }
                    {
                        suggestions
                            .filter(x => !tagFilters.includes(x))
                            .map(tag =>
                            <SuggestTag style={{marginTop:5}} name={`+ ${tag}`} onPress={() => setTagFilters([...tagFilters, tag])}/>
                        )
                    }
                </View>
                }
                {pressed &&
                <View style={styles.searchTagRow}>
                    <Autocomplete
                        placeholder={"Add Tag"}
                        minimumCharactersCount={0}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.tagSearch}
                        pickerStyle={styles.dropdown}
                        data={this.props.tagAutoCompleteOptions.filter(x => !tagFilters.includes(x)) || []}
                        renderIcon={() => (
                            <Text style={styles.plus}>+</Text>
                        )}
                        resetOnSelect
                        valueExtractor={v => v}
                        waitInterval={0}
                        handleSelectItem={(value, index) => setTagFilters([...tagFilters, value])}
                    />
                </View>
                }
            </View>
        )
    }
}

export default SearchButton

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    plus: {
        position: "absolute",
        left: 15,
        top: 12,
        zIndex:99,
    },
    autocompleteInput:{
        maxHeight: 40,
    },
    tagSearch:{
        color: '#404040',
        fontFamily: 'Ubuntu-Light',
        borderColor: "transparent",
        backgroundColor: '#ececec',
        borderRadius: 25,
    },
    dropdown: {
        width: "30%",
    },
    inputContainer: {
        flexDirection: "row",
        width: "50%",
    },
    biggerContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: "5%",
        marginTop: "5%",
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
    },
    searchBar: {
        flexDirection: 'row',
        width: windowWidth * 0.8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterRow: {
        width: '85%',
        marginTop:"5%",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    searchTagRow: {
        width: '85%',
        marginTop:"5%",
        justifyContent: "center",
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
    },
    bigImageButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: windowWidth * 0.1,
        width: windowWidth * 0.1
    }
})
