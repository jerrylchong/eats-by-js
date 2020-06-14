import React from 'react';
import { TouchableOpacity } from 'react-native';
import BackButton from "../BackButton";

import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

test('renders correctly', () => {
    const tree = renderer.create(<BackButton/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });
test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked');
    const wrapper = shallow(<BackButton onPress={onPressEvent}/>);
    wrapper.find(TouchableOpacity).props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(1);
})