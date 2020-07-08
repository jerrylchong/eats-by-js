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

test('test component rendering', () => {
    const wrapper = shallow(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <AddReviewPage
                navigation={{navigate: jest.fn()}} // pass mock function as goBack navigation prop
            />
        </SafeAreaProvider>
    )
    expect(wrapper.find(TouchableWithoutFeedback)).toBeTruthy(); // checks if touchable is rendered
    expect(wrapper.childAt(0).childAt(0).find(ImageBackground)).toBeTruthy(); // checks if imagebackground is rendered
    expect(wrapper.childAt(0).childAt(0).find(BackButton)).toBeTruthy(); // checks if backbutton is rendered
    expect(wrapper.childAt(0).childAt(0).find(Text)).toBeTruthy(); // checks if header text is rendered
    expect(wrapper.childAt(0).childAt(0).childAt(3).find(TextInput)).toBeTruthy(); // checks if textinput is rendered
    expect(wrapper.childAt(0).childAt(0).childAt(3).find(AirbnbRating)).toBeTruthy(); // checks if airbnbrating is rendered
    expect(wrapper.childAt(0).childAt(0).childAt(4).find(TouchableOpacity)).toBeTruthy(); // checks if submit button is rendered
    expect(wrapper.childAt(0).childAt(0).childAt(4).find(Text)).toBeTruthy(); // checks if submit button text is rendered
})