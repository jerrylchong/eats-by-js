import React from 'react';
import renderer from 'react-test-renderer';
import RestaurantButton from "../RestaurantButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TouchableOpacity} from "react-native";

test('renders correctly (1 coin, 1 rating)', () => {
    const tree = renderer.create(
        <RestaurantButton
            name = {'name'}
            cost = {'1'}
            description = {'description'}
            rating = {'1'}
            tags = {[]}
            location = {'location'}
            opening_hours = {'time'}
        />
        ).toJSON();
    expect(tree).toMatchSnapshot();
})

test('renders correctly 2 (2 coins, 3 rating)', () => {
    const tree = renderer.create(
        <RestaurantButton
            name = {'name'}
            cost = {'6'}
            description = {'description'}
            rating = {'3'}
            tags = {[]}
            location = {'location'}
            opening_hours = {'time'}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

test('renders correctly 3 (3 coins, 5 rating)', () => {
    const tree = renderer.create(
        <RestaurantButton
            name = {'name'}
            cost = {'10'}
            description = {'description'}
            rating = {'5'}
            tags = {[]}
            location = {'location'}
            opening_hours = {'time'}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });
test('test onPress functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked');
    const wrapper = shallow(<RestaurantButton tags={[]} onPress={onPressEvent}/>);
    wrapper.find(TouchableOpacity).props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(1);
})