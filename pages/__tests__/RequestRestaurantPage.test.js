import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RequestRestaurantPage from "../RequestRestaurantPage";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../../reducer';

// snapshot test
test('renders correctly', () => {
    const store = createStore(reducer);
    const tree = renderer.create(
        <Provider store={store}>
            <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                <RequestRestaurantPage
                    navigation={{navigate: jest.fn()}}
                />
            </SafeAreaProvider>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

Enzyme.configure({ adapter: new Adapter() });