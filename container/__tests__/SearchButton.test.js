import React from 'react';
import renderer from 'react-test-renderer';
import SearchButton from "../SearchButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TouchableOpacity} from "react-native";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <SearchButton
            searchTerm={''}
            navigation={{navigate: jest.fn(), addListener: jest.fn()}}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test pressSearch', () => {
    const wrapper = shallow(<SearchButton
        navigation={{navigate: jest.fn(), addListener: jest.fn()}}
        searchTerm={''}
    />)
    wrapper.find(TouchableOpacity).props().onPress(); // press magnifying glass button
    expect(wrapper.state().pressed).toEqual(true); // expect pressed state to be true
})

test('test clearSearch', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked'); // create mock function
    const wrapper = shallow(<SearchButton
        navigation={{navigate: jest.fn(), addListener: jest.fn()}}
        searchTerm={'a'}
        clearSearch={onPressEvent} // pass mock function as clearSearch prop
    />)
    wrapper.setState({pressed: true});
    wrapper.childAt(1).find(TouchableOpacity).props().onPress(); // press clear search button
    expect(onPressEvent.mock.calls.length).toBe(1); // expect to have 1 mock function call
})