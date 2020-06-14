import React from 'react';
import renderer from 'react-test-renderer';
import SearchButton from "../SearchButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TouchableOpacity} from "react-native";

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
    const instanceOf = renderer.create(
        <SearchButton
            searchTerm={''}
            navigation={{navigate: jest.fn(), addListener: jest.fn()}}
        />).getInstance();
    instanceOf.pressSearch();
    expect(instanceOf.state.pressed).toBeTruthy();
})