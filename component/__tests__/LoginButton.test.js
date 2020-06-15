import React from 'react';
import renderer from 'react-test-renderer';
import LoginButton from "../LoginButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Text, TouchableOpacity, View} from "react-native";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(<LoginButton/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(<LoginButton
        text={'text'}
    />);
    expect(wrapper.find(View)).toBeTruthy(); // checks if view is rendered
    expect(wrapper.find(TouchableOpacity)).toBeTruthy(); // checks if touchable opacity is rendered
    expect(wrapper.find(Text).dive().text()).toEqual('text'); // checks if text is rendered
})

test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked'); // create mock function
    const wrapper = shallow(<LoginButton onPress={onPressEvent}/>);
    wrapper.find(TouchableOpacity).props().onPress(); // press TouchableOpacity
    expect(onPressEvent.mock.calls.length).toBe(1); // expect 1 mock function call
})