import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import BackButton from "../BackButton";

import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(<BackButton/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(<BackButton/>);
    expect(wrapper.find(View)).toBeTruthy(); // checks if view is rendered
    expect(wrapper.find(TouchableOpacity)).toBeTruthy(); // checks if touchable opacity is rendered
    expect(wrapper.find(Image)).toBeTruthy(); // checks if image is rendered
})

test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked'); // create mock function
    const wrapper = shallow(<BackButton onPress={onPressEvent}/>);
    wrapper.find(TouchableOpacity).props().onPress(); // press TouchableOpacity
    expect(onPressEvent.mock.calls.length).toBe(1); // expect 1 mock function call
})