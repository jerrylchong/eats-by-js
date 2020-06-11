import React from 'react';
import renderer from 'react-test-renderer';
import MenuButton from "../MenuButton";

test('renders correctly', () => {
    const tree = renderer.create(<MenuButton/>).toJSON();
    expect(tree).toMatchSnapshot();
})