import React from 'react';
import renderer from 'react-test-renderer';
import SearchButton from "../SearchButton";

/**
 * @jest-environment jsdom
 */
test('renders correctly', () => {
    const tree = renderer.create(
        <SearchButton
            searchTerm={''}
            navigation={{navigate: jest.fn(), addListener: jest.fn()}}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})