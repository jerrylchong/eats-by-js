import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AdminToolsPage from "../AdminToolsPage";
import BackButton from "../../component/BackButton";
import PageButton from "../../component/PageButton";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ImageBackground, Text, View} from "react-native";

// snapshot test
test('renders correctly', () => {
    const tree = renderer.create(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <AdminToolsPage
                navigation={{navigate: jest.fn()}}
            />
        </SafeAreaProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });