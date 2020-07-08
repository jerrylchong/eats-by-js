import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddRestaurantPage from "../AddRestaurantPage";
import BackButton from "../../component/BackButton";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ImageBackground, Text, TextInput, TouchableOpacity} from "react-native";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <AddRestaurantPage
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
            <AddRestaurantPage
                navigation={{navigate: jest.fn()}} // pass mock function as goBack navigation prop
            />
        </SafeAreaProvider>
    )
    expect(wrapper.find(ImageBackground)).toBeTruthy(); // checks if imagebackground is rendered
    expect(wrapper.find(BackButton)).toBeTruthy(); // checks if backbutton is rendered
    expect(wrapper.find(Text)).toBeTruthy(); // checks if header text is rendered
    expect(wrapper.childAt(0).childAt(3).find(TextInput).at(0)).toBeTruthy(); // checks if name textinput is rendered
    expect(wrapper.childAt(0).childAt(3).find(TextInput).at(1)).toBeTruthy(); // checks if location textinput is rendered
    expect(wrapper.childAt(0).childAt(3).find(TextInput).at(2)).toBeTruthy(); // checks if hours textinput is rendered
    expect(wrapper.childAt(0).childAt(3).find(TextInput).at(3)).toBeTruthy(); // checks if contact textinput is rendered
    expect(wrapper.childAt(0).childAt(3).find(TextInput).at(4)).toBeTruthy(); // checks if tags textinput is rendered
    expect(wrapper.childAt(0).childAt(4).find(TouchableOpacity)).toBeTruthy(); // checks if submit button is rendered
    expect(wrapper.childAt(0).childAt(4).find(Text)).toBeTruthy(); // checks if submit button text is rendered
})