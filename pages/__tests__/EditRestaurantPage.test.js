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

Enzyme.configure({ adapter: new Adapter() }); // enzyme for shallow testing