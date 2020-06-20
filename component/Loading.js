import React from 'react';
import {Animated, View, StyleSheet, Easing} from "react-native";

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinValue: new Animated.Value(0)
        }
        this.style = props.style
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.spinValue, {
                toValue: 1,
                duration: 700,
                easing: Easing.linear
            })
        ).start();
    }

    render() {
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style = {[styles.container, this.style]}>
                <Animated.Image
                    style={{transform: [{rotate: spin}], height: 50, width: 50}}
                    source={require('../assets/loading.png')} />
            </View>
        )
    }
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
