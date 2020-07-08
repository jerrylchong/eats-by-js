import React from 'react';
import renderer from 'react-test-renderer';
import Review from "../Review";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Text, Image} from "react-native";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(<Review/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(
        <Review
            title={'title'}
            rating={'5'}
            date={'date'}
            content={'content'}
        />);

    expect(wrapper.childAt(0).childAt(0).find(Image)).toBeTruthy(); // checks if title text is rendered
    expect(wrapper.childAt(1).childAt(0).find(Text).at(0).dive().text()).toEqual('content'); // checks if rating text is rendered
    expect(wrapper.childAt(1).childAt(0).find(Text).at(1).dive().text()).toEqual('5/5'); // checks if rating text is rendered
    expect(wrapper.childAt(1).find(Text).at(2)).toBeTruthy(); // checks if rating text is rendered
})