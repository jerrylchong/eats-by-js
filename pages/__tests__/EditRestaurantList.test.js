import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EditRestaurantList from "../EditRestaurantList";
import BackButton from "../../component/BackButton";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Text, FlatList} from "react-native";
import SearchBarForMenu from "../../container/SearchBarForMenu";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <EditRestaurantList
                navigation={{navigate: jest.fn()}}
            />
        </SafeAreaProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <EditRestaurantList
                navigation={{navigate: jest.fn()}} // pass mock function as goBack navigation prop
            />
        </SafeAreaProvider>
    )
    expect(wrapper.find(BackButton)).toBeTruthy(); // checks if backbutton is rendered
    expect(wrapper.find(Text)).toBeTruthy(); // checks if header text is rendered
    expect(wrapper.find(SearchBarForMenu)).toBeTruthy(); // checks if searchbarformenu is rendered
    expect(wrapper.find(FlatList)).toBeTruthy(); // checks if flatlist is rendered
})