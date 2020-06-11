import React from 'react';
import renderer from 'react-test-renderer';
import DishButton from "../DishButton";

test('renders correctly', () => {
    const tree = renderer.create(<DishButton/>).toJSON();
    expect(tree).toMatchSnapshot();
})