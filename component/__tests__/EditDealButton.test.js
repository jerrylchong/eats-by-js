import React from 'react';
import renderer from 'react-test-renderer';
import EditDealButton from "../EditDealButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(<EditDealButton title={'Title'}
                                             description={'Desc'}
                                             start={'12345678901'}
                                             end={'09876543210'}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });