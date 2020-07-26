import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EditDealPage from "../EditDealPage";
import {createStore} from 'redux';
import {SafeAreaProvider} from "react-native-safe-area-context";
import reducer from "../../reducer";
import {Provider} from "react-redux";
import DealButton from "../../component/DealButton";

// snapshot test
test('renders correctly', () => {
    const store = createStore(reducer);
    const tree = renderer.create(
        <Provider store={store}>
            <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                <EditDealPage
                    navigation={{navigate: jest.fn()}}
                    route={{params: {title: 'Title', desc: 'Desc', start: '12345678901', end: '09876543210'}}}
                />
            </SafeAreaProvider>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });