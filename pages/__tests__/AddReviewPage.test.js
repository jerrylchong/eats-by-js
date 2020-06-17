import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AddReviewPage} from "../AddReviewPage";
import {TouchableOpacity} from "react-native";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <AddReviewPage
            navigation={{navigate: jest.fn()}}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test back functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked'); // create mock function
    const wrapper = shallow(<AddReviewPage
        navigation={{navigate: jest.fn(), goBack: onPressEvent}} // pass mock function as goBack navigation prop
    />)
    wrapper.childAt(3).find(TouchableOpacity).at(1).props().onPress(); // press back button
    expect(onPressEvent.mock.calls.length).toBe(1); // expect 1 mock function call
})