import React from 'react';
import { TouchableOpacity } from "react-native";
import renderer from 'react-test-renderer';
import SearchBarForMenu from "../SearchBarForMenu";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

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
    onPressEvent.mockReturnValue('onPress invoked');
    const wrapper = shallow(<SearchBarForMenu searchTerm={''} clearSearch={onPressEvent}/>);
    wrapper.find(TouchableOpacity).props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(1);
})