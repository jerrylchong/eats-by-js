import React from 'react';
import { TouchableOpacity } from "react-native";
import renderer from 'react-test-renderer';
import SearchBarForMenu from "../SearchBarForMenu";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <SearchBarForMenu
            searchTerm={''}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });
test('test clearSearch functionality', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked'); // create mock function
    const wrapper = shallow(<SearchBarForMenu
        searchTerm={''} clearSearch={onPressEvent} // pass mock function as clearSearch prop
    />);
    wrapper.find(TouchableOpacity).props().onPress(); // press clear search button
    expect(onPressEvent.mock.calls.length).toBe(1); // expect 1 mock function call
})