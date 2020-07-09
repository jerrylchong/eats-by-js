import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AddReviewPage} from "../AddReviewPage";
import {ImageBackground, TouchableWithoutFeedback, Text, TextInput, TouchableOpacity} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import BackButton from "../../component/BackButton";
import { AirbnbRating } from 'react-native-ratings';

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <AddReviewPage
                navigation={{navigate: jest.fn()}}
            />
        </SafeAreaProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });