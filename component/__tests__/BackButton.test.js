import React from 'react';
import BackButton from "../BackButton";

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<BackButton/>).toJSON();
    expect(tree).toMatchSnapshot();
})