import React from 'react';
import renderer from 'react-test-renderer';
import PageButton from "../PageButton";

test('renders correctly', () => {
    const tree = renderer.create(<PageButton/>).toJSON();
    expect(tree).toMatchSnapshot();
})