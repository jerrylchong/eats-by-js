import React from 'react';
import renderer from 'react-test-renderer';
import Loading from "../Loading";
import Enzyme, {shallow} from "enzyme";
import {Animated, View} from "react-native";
import Adapter from "enzyme-adapter-react-16";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(<Loading/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(<Loading/>);
    expect(wrapper.find(View)).toBeTruthy(); // checks if view is rendered
    expect(wrapper.find(Animated.Image)).toBeTruthy(); // checks if animated is rendered
})