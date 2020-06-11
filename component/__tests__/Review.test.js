import React from 'react';
import renderer from 'react-test-renderer';
import Review from "../Review";

test('renders correctly', () => {
    const tree = renderer.create(<Review/>).toJSON();
    expect(tree).toMatchSnapshot();
})