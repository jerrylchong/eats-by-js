import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Animated, Dimensions, Text } from 'react-native';
import MenuButton from "../component/MenuButton";
import RNPickerSelect from 'react-native-picker-select';
import Tag, { SuggestTag } from "../component/Tag";
import SearchableDropdown from 'react-native-searchable-dropdown';

class SearchButton extends React.Component {

    state = {
        animatedWidth: new Animated.Value(windowWidth * 0.12),
        animatedHeight: new Animated.Value(windowWidth * 0.12),
        pressed: false,
        selectedItems: [],
        filterToggle: false,
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
            filterToggle: false
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

    toggleFilter = () => {
        const bool = this.state.filterToggle;
        this.setState({filterToggle: !bool});
    }

    render() {
        const {searchTerm, clearSearch, sortByLocation, sortByDefault, tagFilters, setTagFilters, suggestions} = this.props
        const {animatedWidth, animatedHeight, pressed, filterToggle} = this.state;
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
                {(pressed && !filterToggle) &&
                    <View style={styles.toggleButton}>
                        <Tag disabled={false} name={'Filters'} onPress={this.toggleFilter}/>
                    </View>
                }
                {filterToggle &&
                <View style={styles.filterRow}>
                    <SearchPicker
                        placeholderText="Sort By"
                        items={[
                            { label: 'Price', value: '0' },
                            { label: 'Ratings', value: '1' },
                            { label: 'Location', value: '2' },
                            { label: 'None', value: '3'}
                        ]}
                        onValueChange={(value) => {
                            if (value == 2) {
                                sortByLocation();
                            } else if (value == 3) {
                                sortByDefault();
                            }
                        }}
                    />
                    <SearchPicker
                        placeholderText="Select a Price"
                        items={[
                            { label: '1-5', value: '0' },
                            { label: '5-10', value: '1' },
                            { label: '10+', value: '2' },
                        ]}
                        onValueChange={(value) => console.log(value)}
                    />
                    <SearchPicker
                        placeholderText="Select a Price"
                        items={[
                            { label: '1-5', value: '0' },
                            { label: '5-10', value: '1' },
                            { label: '10+', value: '2' },
                        ]}
                        onValueChange={(value) => console.log(value)}
                    />
                    <Tag disabled={false} name={'Done'} onPress={this.toggleFilter}/>
                </View>
                }
                {filterToggle &&
                    <View style={{borderWidth: 0.2, width: '90%', borderColor: '#b3b3b3', marginTop: '2%'}}/>
                }
                {filterToggle &&
                <View style={styles.tagRow}>
                    {suggestions.length > tagFilters.length &&
                        <Text style={{fontFamily: 'Ubuntu', fontSize: 12, color: "#404040", marginRight: '2%'}}>Suggested:</Text>
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
                {filterToggle &&
                <View style={styles.tagRow}>
                    {
                         tagFilters.map( tag =>
                            <Tag style={{marginTop:5}} name={`x ${tag}`} onPress={() => setTagFilters(tagFilters.filter(x => x != tag))}/>
                        )
                    }
                    <SearchableDropdown
                        onItemSelect={(item) => {
                            const items = tagFilters.filter(x => x != item.name)
                            items.push(item.name)
                            setTagFilters(items)
                        }}
                        containerStyle={{ padding: 5}}
                        itemStyle={{
                            paddingLeft: '8%',
                            paddingVertical: '3%',
                            marginTop: '1%',
                            backgroundColor: '#ececec',
                            borderRadius: 100,
                            width: windowWidth * 0.3
                        }}
                        itemTextStyle={{ color: '#404040', fontFamily: 'Ubuntu', fontSize: 10 }}
                        itemsContainerStyle={{ maxHeight: '40%' }}
                        items={this.props.tagAutoCompleteOptions}
                        defaultIndex={0}
                        resetValue={true}
                        textInputProps={
                            {
                                placeholder: "+ Add tag",
                                placeholderTextColor: '#404040',
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingLeft: '4%',
                                    backgroundColor: '#ececec',
                                    borderRadius: windowWidth * 0.15,
                                    width: windowWidth * 0.3,
                                    height: windowWidth * 0.045,
                                    fontSize: 10,
                                    color: '#404040',
                                    fontFamily: 'Ubuntu'
                                }
                            }
                        }
                        listProps={
                            {
                                nestedScrollEnabled: true,
                            }
                        }
                    />
                </View>
                }

            </View>
        )
    }
}

const SearchPicker = (props) => {
    const { items, onValueChange, placeholderText } = props;

    return (
        <RNPickerSelect
            placeholder={
                {
                    label: placeholderText,
                    value: null,
                    color: '#9EA0A4',
                }
            }
            onValueChange={onValueChange}
            useNativeAndroidPickerStyle={false}
            items={items}
            style={{
                ...pickerSelectStyles,
                iconContainer: {
                    top: 10,
                    right: 12,
                },
            }}
            Icon={() => {
                return <Text style={{color:"#B3B3B3", fontSize: 11}}>▼</Text>;
            }}
        />
    )
}

export default SearchButton

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    biggerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%'
    },
    plus: {
        position: "absolute",
        left: 15,
        top: windowWidth * 0.015,
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
        width: windowWidth * 0.3,
    },
    dropdown: {
        width: "30%",
    },
    inputContainer: {
        flexDirection: "row",
        width: "50%",
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '3%',
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        marginTop: '2%',
        marginHorizontal: '5%',
        marginBottom: '2%'
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
        width: '80%',
        fontWeight:'normal'
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
    },
    tagRow: {
        width: '85%',
        marginTop:"2%",
        justifyContent: "flex-start",
        alignItems: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: '#404040',
        borderRadius: 100,
        color: '#404040',
        paddingRight: 25, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 0.5,
        borderColor: '#404040',
        borderRadius: 100,
        color: '#404040',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
