import React from 'react';
import renderer from 'react-test-renderer';
import EditDishButton from "../EditDishButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(<EditDishButton title={'Title'}
                                                 description={'Desc'}
                                                 price={'5'}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });