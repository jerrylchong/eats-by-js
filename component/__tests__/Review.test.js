import React from 'react';
import renderer from 'react-test-renderer';
import Review from "../Review";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Text, TouchableOpacity, View} from "react-native";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(<Review/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(
        <Review
            title={'title'}
            rating={'5'}
            date={'date'}
            content={'content'}
        />);
    expect(wrapper.find(View).first()).toBeTruthy(); // checks if view(container) is rendered
    expect(wrapper.find(View).at(1)).toBeTruthy(); // checks if view(titlerating) is rendered
    expect(wrapper.find(Text).at(0).dive().text()).toEqual('title'); // checks if title text is rendered
    expect(wrapper.find(Text).at(1).dive().text()).toEqual('5/5'); // checks if rating text is rendered
    expect(wrapper.find(Text).at(2)).toBeTruthy(); // checks if userdate text is rendered
    expect(wrapper.find(Text).at(3).dive().text()).toEqual('content'); // checks if content text is rendered
})