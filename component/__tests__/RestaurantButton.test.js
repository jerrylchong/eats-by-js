import React from 'react';
import renderer from 'react-test-renderer';
import RestaurantButton from "../RestaurantButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ImageBackground, Text, TouchableOpacity, View, Image} from "react-native";

// snapshot test 1
test('renders correctly (1 coin, 1 rating)', () => {
    const tree = renderer.create(
        <RestaurantButton
            name = {'name'}
            cost = {'1'} // set cost to 1 for 1 coin
            description = {'description'}
            rating = {'1'} // set rating to 1 for poor rating
            tags = {[]}
            location = {'location'}
            opening_hours = {'time'}
        />
        ).toJSON();
    expect(tree).toMatchSnapshot();
})

// snapshot test 2
test('renders correctly 2 (2 coins, 3 rating)', () => {
    const tree = renderer.create(
        <RestaurantButton
            name = {'name'}
            cost = {'6'} // set cost to 6 for 2 coins
            description = {'description'}
            rating = {'3'} // set rating to 3 for meh rating
            tags = {[]}
            location = {'location'}
            opening_hours = {'time'}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

// snapshot test 3
test('renders correctly 3 (3 coins, 5 rating)', () => {
    const tree = renderer.create(
        <RestaurantButton
            name = {'name'}
            cost = {'10'} // set cost to 10 for 3 coins
            description = {'description'}
            rating = {'5'} // set rating to 5 for good rating
            tags = {[]}
            location = {'location'}
            opening_hours = {'time'}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(<RestaurantButton
        name = {'name'}
        cost = {'1'} // set cost to 1 for 1 coin
        description = {'desc'}
        rating = {'1'} // set rating to 1 for poor rating
        tags = {[]}
        location = {'location'}
        opening_hours = {'time'}
    />);
    expect(wrapper.find(ImageBackground)).toBeTruthy(); // checks if image background is rendered
    expect(wrapper.find(TouchableOpacity)).toBeTruthy(); // checks if touchable opacity is rendered
    expect(wrapper.childAt(1).find(View).at(0)).toBeTruthy(); // checks if view(text) is rendered
    expect(wrapper.childAt(1).find(View).at(1)).toBeTruthy(); // checks if view(info) opacity is rendered
    expect(wrapper.childAt(1).childAt(0).find(Text).dive().text()).toEqual('name'); // checks if name text is rendered
    expect(wrapper.childAt(1).childAt(0).find(View)).toBeTruthy(); // checks if view(coin) is rendered
    expect(wrapper.childAt(1).childAt(0).childAt(0).find(Image)).toBeTruthy(); // checks if coin image is rendered
    expect(wrapper.childAt(1).childAt(1).find(Image)).toBeTruthy(); // checks if restaurant image is rendered
    expect(wrapper.childAt(1).childAt(1).find(View)).toBeTruthy(); // checks if view(rightinfo) is rendered
    expect(wrapper.childAt(1).childAt(1).childAt(1).find(View).first())
        .toBeTruthy(); // checks if view(tags) is rendered
    expect(wrapper.childAt(1).childAt(1).childAt(1).find(Text).at(0).dive().text())
        .toEqual('desc'); // checks if description text is rendered
    expect(wrapper.childAt(1).childAt(1).childAt(1).find(Text).at(1).dive().text())
        .toEqual('Location: location'); // checks if location text is rendered
    expect(wrapper.childAt(1).childAt(1).childAt(1).find(Text).at(2).dive().text())
        .toEqual('time'); // checks if operating hours text is rendered
    expect(wrapper.childAt(1).childAt(1).childAt(1).find(View).at(1)).toBeTruthy(); // checks if view(ratings) is rendered
    expect(wrapper.childAt(1).childAt(1).childAt(1).childAt(4).find(Image))
        .toBeTruthy(); // checks if rating image is rendered
    expect(wrapper.childAt(1).childAt(1).childAt(1).childAt(4).find(Text).dive().text())
        .toEqual('1.0'); // checks if rating text is rendered
    wrapper.setProps({rating: -1});
    expect(wrapper.childAt(1).childAt(1).childAt(1).childAt(4).find(Text).dive().text())
        .toEqual('NA'); // check is NA text is rendered
})

test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked'); // create mock function
    const wrapper = shallow(<RestaurantButton tags={[]} onPress={onPressEvent}/>);
    wrapper.find(TouchableOpacity).props().onPress(); // press TouchableOpacity
    expect(onPressEvent.mock.calls.length).toBe(1); // expect 1 mock function call
})