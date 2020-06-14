import React from 'react';
import renderer from 'react-test-renderer';
import LoginButton from "../LoginButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TouchableOpacity} from "react-native";

test('renders correctly', () => {
    const tree = renderer.create(<LoginButton/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });
test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked');
    const wrapper = shallow(<LoginButton onPress={onPressEvent}/>);
    wrapper.find(TouchableOpacity).props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(1);
})