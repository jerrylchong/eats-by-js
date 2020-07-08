import React from 'react';
import renderer from 'react-test-renderer';
import SearchButton, {SearchPicker} from "../SearchButton";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TouchableOpacity, Image, TextInput, Text} from "react-native";
import Tag, {SuggestTag} from "../../component/Tag";
import MenuButton from "../../component/MenuButton";
import SearchableDropdown from 'react-native-searchable-dropdown';

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <SearchButton
            searchTerm={''}
            navigation={{navigate: jest.fn(), addListener: jest.fn()}}
        />).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test pressSearch', () => {
    const wrapper = shallow(<SearchButton
        navigation={{navigate: jest.fn(), addListener: jest.fn()}}
        searchTerm={''}
    />)
    wrapper.find(TouchableOpacity).props().onPress(); // press magnifying glass button
    expect(wrapper.state().pressed).toEqual(true); // expect pressed state to be true
})

test('test clearSearch', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('onPress invoked'); // create mock function
    const wrapper = shallow(<SearchButton
        navigation={{navigate: jest.fn(), addListener: jest.fn()}}
        searchTerm={'a'}
        clearSearch={onPressEvent} // pass mock function as clearSearch prop
    />)
    wrapper.setState({pressed: true});
    wrapper.childAt(0).childAt(1).find(TouchableOpacity).props().onPress(); // press clear search button
    expect(onPressEvent.mock.calls.length).toBe(1); // expect to have 1 mock function call
})

test('test toggleFilter', () => {
    const wrapper = shallow(
        <SearchButton
            navigation={{navigate: jest.fn(), addListener: jest.fn()}}
            searchTerm={'a'}
            suggestions={[]}
            tagFilters={[]}
            refreshPage={jest.fn()}
        />
    )
    wrapper.setState({pressed: true});
    wrapper.find(Tag).props().onPress(); // toggle to set true
    expect(wrapper.state().filterToggle).toEqual(true);
    wrapper.find(Tag).props().onPress(); // toggle to set false
    expect(wrapper.state().filterToggle).toEqual(false);
})

test('test component rendering (unpressed)', () => {
    const wrapper = shallow(
        <SearchButton
            navigation={{navigate: jest.fn(), addListener: jest.fn()}}
            searchTerm={'a'}
            suggestions={[]}
            tagFilters={[]}
            refreshPage={jest.fn()}
        />
    )
    expect(wrapper.find(MenuButton)).toBeTruthy(); // check if menubutton is rendered
    expect(wrapper.childAt(0).childAt(1).find(Image)).toBeTruthy(); // check if logo is rendered
    expect(wrapper.childAt(0).find(TouchableOpacity)).toBeTruthy(); // check if touchableopacity is rendered
    expect(wrapper.childAt(0).childAt(2).find(Image)).toBeTruthy(); // check if searchimage is rendered
})

test('test component rendering (pressed)', () => {
    const wrapper = shallow(
        <SearchButton
            navigation={{navigate: jest.fn(), addListener: jest.fn()}}
            searchTerm={'a'}
            suggestions={[{id: 1, name: 'chinese'}]}
            tagFilters={[{id: 2, name: 'korean'}]}
            refreshPage={jest.fn()}
        />
    )
    wrapper.setState({pressed: true});
    expect(wrapper.find(MenuButton)).toBeTruthy(); // check if menubutton is rendered
    expect(wrapper.childAt(0).childAt(1).childAt(0).find(TextInput))
        .toBeTruthy(); // check if search textinput is rendered
    expect(wrapper.childAt(0).childAt(1).childAt(0).find(TouchableOpacity))
        .toBeTruthy(); // check if clearsearch touchableopacity is rendered
    expect(wrapper.childAt(1).find(Tag)).toBeTruthy(); // check if filter button tag is rendered

    wrapper.setState({filterToggle: true});
    expect(wrapper.childAt(2).find(SearchPicker).at(0)).toBeTruthy(); // check if sort by searchpicker is rendered
    expect(wrapper.childAt(2).find(SearchPicker).at(1)).toBeTruthy(); // check if second searchpicker is rendered
    expect(wrapper.childAt(2).find(SearchPicker).at(2)).toBeTruthy(); // check if third searchpicker is rendered
    expect(wrapper.childAt(2).find(Tag)).toBeTruthy(); // check if done button tag is rendered
    expect(wrapper.childAt(4).find(Text)).toBeTruthy(); // check if suggested text is rendered
    expect(wrapper.childAt(4).find(SuggestTag)).toBeTruthy(); // check if suggesttag is rendered
    expect(wrapper.childAt(5).find(Tag)).toBeTruthy(); // check if tag filter tag is rendered
    expect(wrapper.childAt(5).find(SearchableDropdown)).toBeTruthy(); // check if searchabledropdown is rendered
})