import React from 'react';
import renderer from 'react-test-renderer';
import RestaurantButton from "../RestaurantButton";

test('renders correctly', () => {
    const tree = renderer.create(<RestaurantButton tags={[]}/>).toJSON();
    expect(tree).toMatchSnapshot();
})