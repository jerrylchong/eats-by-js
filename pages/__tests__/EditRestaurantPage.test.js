import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EditRestaurantPage, {EditRestaurantBanner} from "../EditRestaurantPage";
import BackButton from "../../component/BackButton";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Text, ScrollView, ImageBackground, TextInput, Image} from "react-native";
import SearchBarForMenu from "../../container/SearchBarForMenu";
import Tag from "../../component/Tag";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <EditRestaurantPage
                navigation={{navigate: jest.fn()}}
                route={{params: {}}}
            />
        </SafeAreaProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });

test('test component rendering', () => {
    const wrapper = shallow(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <EditRestaurantPage
                navigation={{navigate: jest.fn()}} // pass mock function as goBack navigation prop
            />
        </SafeAreaProvider>
    )
    expect(wrapper.find(ScrollView)).toBeTruthy(); // checks if scrollview is rendered
    expect(wrapper.childAt(0).find(ImageBackground)).toBeTruthy(); // checks if imagebackground is rendered
    expect(wrapper.childAt(0).childAt(0).find(BackButton)).toBeTruthy(); // checks if backbutton is rendered
    expect(wrapper.childAt(0).childAt(1).find(Text)).toBeTruthy(); // checks if image link text is rendered
    expect(wrapper.childAt(0).childAt(1).find(TextInput)).toBeTruthy(); // checks if image link textinput is rendered
    expect(wrapper.childAt(0).find(EditRestaurantBanner)).toBeTruthy(); // checks if banner is rendered
})

test('test component rendering (banner)', () => {
    const wrapper = shallow(
        <EditRestaurantBanner
            title={'title'}
            tags={[]}
            location={'location'}
            operatingHours={'time'}
            contact={'contact'}
            halal={false}
            cost={'1'}
            no_of_stalls={1}
        />
    )
    expect(wrapper.find(TextInput)).toBeTruthy(); // checks if textinput is rendered
    expect(wrapper.childAt(1).childAt(0).find(Tag)).toBeTruthy(); // checks if add tag is rendered
    expect(wrapper.childAt(1).childAt(1).find(Image)).toBeTruthy(); // checks if add tag is rendered
})