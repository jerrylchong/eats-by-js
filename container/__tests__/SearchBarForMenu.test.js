import React from 'react';
import renderer from 'react-test-renderer';
import SearchBarForMenu from "../SearchBarForMenu";

test('renders correctly', () => {
    const tree = renderer.create(
        <SearchBarForMenu
            searchTerm={''}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})