import React from 'react';
import renderer from 'react-test-renderer';
import DealButton from "../DealButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Text, TouchableOpacity, View} from "react-native";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(<DealButton title={'Title'}
                                             description={'Desc'}
                                             start={'12345678901'}
                                             end={'09876543210'}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(
        <DealButton
            title={'Title'}
            description={'Desc'}
            start={'12345678901'}
            end={'09876543210'}
        />);
    expect(wrapper.find(View)).toBeTruthy(); // checks if view is rendered
    expect(wrapper.find(TouchableOpacity)).toBeTruthy(); // checks if touchable opacity is rendered
    expect(wrapper.childAt(0).find(Text).at(0).dive().text()).toEqual('Title'); // checks if title text is rendered
    expect(wrapper.childAt(0).find(Text).at(1).dive().text()).toEqual('1234567890 - 0987654321'); // checks if cost text is rendered
    expect(wrapper.childAt(1).dive().text()).toEqual('Desc'); // checks if description text is rendered
})

test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked'); // create mock function
    const wrapper = shallow(<DealButton onPress={onPressEvent}
                                        title={'Title'}
                                        description={'Desc'}
                                        start={'12345678901'}
                                        end={'09876543210'}/>);
    wrapper.find(TouchableOpacity).props().onPress(); // press TouchableOpacity
    expect(onPressEvent.mock.calls.length).toBe(1); // expect 1 mock function call
})